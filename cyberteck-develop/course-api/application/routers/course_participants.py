from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import inputs, reqparse, Resource
from application import api, app
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError, CardError
from application.models import CourseInfo, CourseSchedule, CourseParticipant
from application.schemas import CourseInfoSchema, CourseScheduleSchema, CourseParticipantSchema
import hashlib
import datetime
import stripe
from paypalcheckoutsdk.orders import OrdersCaptureRequest
from application.utils.paypal_config import PayPalClient
from authorizenet import apicontractsv1
from authorizenet.apicontrollers import createTransactionController
from nanoid import generate

from uuid import uuid4
stripe.api_key = app.config['STRIP_ACCESS_KEY']


@api.resource('/course/participant/<int:userId>', endpoint='course-booking-fetch')
class CourseParticipentApi(Resource):
    def __init__(self):
        self.courseInfoSchema = CourseInfoSchema()
        self.courseScheduleSchema = CourseScheduleSchema()
        self.courseParticipantSchema = CourseParticipantSchema(many=True)

    def get(self, userId):
        try:
            course_list_query = CourseInfo.query.outerjoin(
                CourseInfo.schedules, aliased=True).outerjoin(
                CourseSchedule.participants, aliased=True)
            if userId != 0:
                course_list_query = course_list_query.filter(
                    CourseParticipant.createdBy==userId)
            course_list = course_list_query.order_by(CourseInfo.created_on.desc()).all()

            courseData = []
            if course_list:
                for course in course_list:
                    courseInfo = self.courseInfoSchema.dump(course)
                    courseInfo['schedules'] = []
                    for schedule in course.schedules:
                        schedule_data = self.courseScheduleSchema.dump(
                            schedule)
                        schedule_data['participants'] = self.courseParticipantSchema.dump(
                            schedule.participants)
                        if userId !='all':
                            schedule_data['participants']=[item for item in schedule_data['participants'] if userId==0 or item['createdBy']==userId]
                        
                        if schedule_data['participants'] or userId==0:
                            courseInfo['schedules'].append(schedule_data)
                    courseData.append(courseInfo)
            return jsonify(meta={"statusCode": "200", "message": "Course fetched successfuly"}, data=courseData)
        except AppException as err:
            raise err
        except Exception as err:
            print(err)
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


@api.resource('/course/bookSlot', endpoint='course-booking')
class CourseParticipentsApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'scheduleId', help='[scheduleId] field needed', required=True, type=str)
        self.parser.add_argument(
            'parentEmail', help='[parentEmail] field needed', required=True, type=str)
        self.parser.add_argument(
            'firstName', help='[firstName] field needed', required=True, type=str)
        self.parser.add_argument(
            'lastName', help='[lastName] field needed', required=True, type=str)
        self.parser.add_argument(
            'userId', help='[userId] field needed', required=False, type=int, default=1)
        self.parser.add_argument(
            'tokenData', help='[tokenData] field needed', required=True, type=dict)
        self.parser.add_argument(
            'paymentMethod', help='[paymentMethod] field needed', required=True, type=str)

    def post(self):
        try:
            inputObj = self.parser.parse_args()
            # current_user = get_jwt_identity()
            # if current_user["type"] != "STUDENT":
            #     raise AccessDeniedError(
            #         "Only student are allowed to book a course")

           

            courseSchedule = CourseSchedule.query.filter_by(
                id=inputObj.scheduleId).first()
            courseInfo = courseSchedule.courseInfo
            if courseInfo:
                if courseSchedule.participant < courseSchedule.capacity:
                    # create a charge
                    paymentModeDB = ""

                    if inputObj.paymentMethod == "STRIPE":
                        charge = stripe.Charge.create(
                            capture=False,
                            source=inputObj.tokenData["id"],
                            amount=int(courseInfo.price*100),
                            currency="usd", # will be changed
                            description="{} purchased for price {}".format(courseInfo.title, int(courseInfo.price*100)),
                            idempotency_key=str(uuid4())
                        )
                        paymentModeDB = inputObj.paymentMethod + "_" + inputObj.tokenData["id"]
                    elif inputObj.paymentMethod == "PAYPAL":
                        # paypal
                        paymentModeDB = inputObj.paymentMethod + "_" + inputObj.tokenData["orderID"]

                    elif inputObj.paymentMethod == "AUTHORIZE":
                        paymentModeDB = inputObj.paymentMethod + "_" + inputObj.tokenData["name"] + "_" + inputObj.tokenData["cc"][-4]

                    courseParticipent = CourseParticipant(
                        scheduleId=inputObj.scheduleId,
                        firstName=inputObj.firstName,
                        lastName=inputObj.lastName,
                        parentEmail=inputObj.parentEmail,
                        createdBy=inputObj.userId,
                        paymentMode=paymentModeDB, 
                        paymentId="",
                        paymentStatus="PENDING"
                    )
                    courseSchedule.participant = courseSchedule.participant + 1
                    CourseParticipant.save(courseParticipent)


                    chargeSuccessfulFlag = False
                    paymentId = None

                    if inputObj.paymentMethod == "STRIPE":
                        chargeCustomer = stripe.Charge.capture(charge.id)
                        if chargeCustomer.status == 'succeeded':
                            chargeSuccessfulFlag = True
                            paymentId = charge.id

                    if inputObj.paymentMethod == "PAYPAL":
                        paypalClientObj = PayPalClient()
                        requestCapture = OrdersCaptureRequest(inputObj.tokenData["orderID"])
                        response = paypalClientObj.client.execute(requestCapture)

                        if response.result.status == "COMPLETED":
                            chargeSuccessfulFlag = True
                            paymentId = response.result.id
                    
                    if inputObj.paymentMethod == "AUTHORIZE":

                        currentOrderIdempotentId = str(generate(size=15))

                        merchantAuth = apicontractsv1.merchantAuthenticationType()
                        merchantAuth.name = app.config["AUTHORIZE_APILOGINID"]
                        merchantAuth.transactionKey = app.config["AUTHORIZE_TRANSACTIONKEY"]

                        creditCard = apicontractsv1.creditCardType()
                        creditCard.cardNumber = inputObj.tokenData["cc"]
                        creditCard.expirationDate = inputObj.tokenData["exp"]
                        creditCard.cardCode = inputObj.tokenData["cvc"]
                        
                        payment = apicontractsv1.paymentType()
                        payment.creditCard = creditCard

                        # Create order information
                        order = apicontractsv1.orderType()
                        order.invoiceNumber = currentOrderIdempotentId
                        order.description = courseInfo.title

                        customerData = apicontractsv1.customerDataType()
                        customerData.type = "individual"
                        customerData.id = str(generate(size=15))
                        customerData.email = inputObj.parentEmail


                        line_item_1 = apicontractsv1.lineItemType()
                        line_item_1.itemId = str(courseInfo.id)
                        line_item_1.name = courseInfo.title
                        line_item_1.description = courseInfo.description
                        line_item_1.quantity = "1"
                        line_item_1.unitPrice = str(courseInfo.price)


                        line_items = apicontractsv1.ArrayOfLineItem()
                        line_items.lineItem.append(line_item_1)

                        transactionrequest = apicontractsv1.transactionRequestType()
                        transactionrequest.transactionType = "authCaptureTransaction"
                        transactionrequest.amount = courseInfo.price
                        transactionrequest.payment = payment
                        transactionrequest.order = order
                        transactionrequest.customer = customerData
                        transactionrequest.lineItems = line_items


                        createtransactionrequest = apicontractsv1.createTransactionRequest()
                        createtransactionrequest.merchantAuthentication = merchantAuth
                        createtransactionrequest.refId = "REF_" + currentOrderIdempotentId
                        createtransactionrequest.transactionRequest = transactionrequest
                        # Create the controller
                        createtransactioncontroller = createTransactionController(
                            createtransactionrequest)
                        createtransactioncontroller.execute()

                        response = createtransactioncontroller.getresponse()

                        if response is not None:
                            if response.messages.resultCode == "Ok":
                                if hasattr(response.transactionResponse, 'messages') is True:
                                    chargeSuccessfulFlag = True
                                    paymentId = str(response.transactionResponse.transId)
                                    print(
                                        'Successfully created transaction with Transaction ID: %s'
                                        % response.transactionResponse.transId)
                                    print('Transaction Response Code: %s' %
                                        response.transactionResponse.responseCode)
                                    print('Message Code: %s' %
                                        response.transactionResponse.messages.message[0].code)
                                    print('Description: %s' % response.transactionResponse.
                                        messages.message[0].description)
                                else:
                                    print('Failed Transaction.')
                                    if hasattr(response.transactionResponse, 'errors') is True:
                                        print('Error Code:  %s' % str(response.transactionResponse.
                                                                    errors.error[0].errorCode))
                                        print(
                                            'Error message: %s' %
                                            response.transactionResponse.errors.error[0].errorText)
                                        raise CardError("Failed Transaction")
                                    raise CardError("Failed Transaction")
                            else:
                                print('Failed Transaction.')
                                if hasattr(response, 'transactionResponse') is True and hasattr(
                                        response.transactionResponse, 'errors') is True:
                                    print('Error Code: %s' % str(
                                        response.transactionResponse.errors.error[0].errorCode))
                                    print('Error message: %s' %
                                        response.transactionResponse.errors.error[0].errorText)
                                else:
                                    print('Error Code: %s' %
                                        response.messages.message[0]['code'].text)
                                    print('Error message: %s' %
                                        response.messages.message[0]['text'].text)
                                raise CardError("Invalid Card")
                        else:
                            print('Null Response.')
                            raise CardError("Invalid Card")

                    if chargeSuccessfulFlag:
                        courseParticipent.paymentId = paymentId
                        courseParticipent.paymentStatus = "COMPLETED"
                        CourseParticipant.save(courseParticipent)
                        CourseSchedule.save(courseSchedule)
                        return jsonify(meta={"statusCode": "200", "message": "Course Booked successfuly"})
                    else: 
                        return jsonify(meta={"statusCode": "402", "message": "Payment Uncessful"})
                else:
                    raise AccessDeniedError("All seats have been taken")
            else:
                raise ItemNotExistsError("Course Schedule/Info Incorrect")
        except stripe.error.CardError as err:
            raise CardError("Invalid Card")
        except AppException as err:
            raise err
        except Exception as err:
            print(err)
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
