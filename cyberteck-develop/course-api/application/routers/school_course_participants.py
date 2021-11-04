from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import inputs, reqparse, Resource
from application import api, app
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError, CardError
from application.models import SchoolCourse, SchoolCourseParticipant, SchoolInfo
from application.schemas import SchoolCourseSchema, SchoolCourseParticipantSchema, SchoolInfoSchema
import hashlib
import datetime
import stripe
from paypalcheckoutsdk.orders import OrdersCaptureRequest
from application.utils.paypal_config import PayPalClient
from uuid import uuid4
from authorizenet import apicontractsv1
from authorizenet.apicontrollers import createTransactionController
from nanoid import generate
stripe.api_key = app.config['STRIP_ACCESS_KEY']


@api.resource('/schools/courses/participants/<int:userId>', endpoint='school-course-booking-fetch')
class SchoolCourseParticipentApi(Resource):
    def __init__(self):
        self.schoolInfoSchema = SchoolInfoSchema()
        self.schoolCourseSchema = SchoolCourseSchema()
        self.schoolCourseParticipantSchema = SchoolCourseParticipantSchema(
            many=True)

    def get(self, userId):
        try:
            school_list_query = SchoolInfo.query.outerjoin(
                SchoolInfo.courses, aliased=True).outerjoin(
                SchoolCourse.participants, aliased=True)
            if userId != 0:
                school_list_query = school_list_query.filter(
                    SchoolCourseParticipant.createdBy == userId)
            school_list = school_list_query.order_by(
                SchoolCourseParticipant.created_on.desc()).all()

            school_data_list = []
            if school_list:
                for school_info in school_list:
                    school_data = self.schoolInfoSchema.dump(school_info)
                    school_data['courses'] = []
                    for school_course in school_info.courses:
                        school_course_data = self.schoolCourseSchema.dump(
                            school_course)
                        school_course_data['participants'] = self.schoolCourseParticipantSchema.dump(
                            school_course.participants)
                        if userId != 0:
                            school_course_data['participants'] = [
                                item for item in school_course_data['participants'] if userId == 0 or item['createdBy'] == userId]
                        school_data['courses'].append(school_course_data)
                    school_data_list.append(school_data)
            return jsonify(meta={"statusCode": "200", "message": "Course fetched successfuly"}, data=school_data_list)
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


@api.resource('/schools/<int:schoolId>/courses/<int:courseId>/book-slot', endpoint='school-course-booking')
class SchoolCourseParticipentsApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
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

    def post(self, schoolId, courseId):
        '''
            AUTHORIZE
            tokenData: {
                'cc',
                'cvc',
                'exp',
                'name'
            }
        '''
        try:
            inputObj = self.parser.parse_args()
            print("COURSE API HIT")
            # current_user = get_jwt_identity()
            # if current_user["type"] != "STUDENT":
            #     raise AccessDeniedError(
            #         "Only student are allowed to book a course")

            school_course = SchoolCourse.query.filter_by(
                id=courseId).filter_by(schoolId=schoolId).first()
            if school_course:
                if school_course.bookedSlot < school_course.totalSlot:
                    # create a charge
                    paymentModeDB = ""
                    if inputObj.paymentMethod == "STRIPE":
                        charge = stripe.Charge.create(
                            capture=False,
                            source=inputObj.tokenData["id"],
                            amount=int(school_course.price*100),
                            currency="usd",  # will be changed
                            description="{} purchased for price {}".format(
                                school_course.title, int(school_course.price*100)),
                            idempotency_key=str(uuid4())
                        )
                        paymentModeDB = inputObj.paymentMethod + \
                            "_" + inputObj.tokenData["id"]

                    elif inputObj.paymentMethod == "PAYPAL":
                        # paypal
                        paymentModeDB = inputObj.paymentMethod + \
                            "_" + inputObj.tokenData["orderID"]

                    elif inputObj.paymentMethod == "AUTHORIZE":
                        paymentModeDB = inputObj.paymentMethod + \
                            "_" + inputObj.tokenData["name"] + "_" + inputObj.tokenData["cc"][-4]

                    course_participant = SchoolCourseParticipant(
                        # scheduleId=inputObj.scheduleId,
                        courseId=courseId,
                        firstName=inputObj.firstName,
                        lastName=inputObj.lastName,
                        parentEmail=inputObj.parentEmail,
                        createdBy=inputObj.userId,
                        paymentMode=paymentModeDB,
                        paymentId="",
                        paymentStatus="PENDING"
                    )
                    school_course.bookedSlot = school_course.bookedSlot + 1
                    SchoolCourseParticipant.save(course_participant)

                    chargeSuccessfulFlag = False
                    paymentId = None

                    # ACTUAL CHARGE #
                    if inputObj.paymentMethod == "STRIPE":
                        chargeCustomer = stripe.Charge.capture(charge.id)
                        if chargeCustomer.status == 'succeeded':
                            chargeSuccessfulFlag = True
                            paymentId = charge.id

                    if inputObj.paymentMethod == "PAYPAL":
                        paypalClientObj = PayPalClient()
                        requestCapture = OrdersCaptureRequest(
                            inputObj.tokenData["orderID"])
                        response = paypalClientObj.client.execute(
                            requestCapture)

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
                        order.description = school_course.title

                        customerData = apicontractsv1.customerDataType()
                        customerData.type = "individual"
                        customerData.id = str(generate(size=15))
                        customerData.email = inputObj.parentEmail


                        line_item_1 = apicontractsv1.lineItemType()
                        line_item_1.itemId = str(school_course.id)
                        line_item_1.name = school_course.title
                        line_item_1.description = school_course.description
                        line_item_1.quantity = "1"
                        line_item_1.unitPrice = str(school_course.price)


                        line_items = apicontractsv1.ArrayOfLineItem()
                        line_items.lineItem.append(line_item_1)

                        transactionrequest = apicontractsv1.transactionRequestType()
                        transactionrequest.transactionType = "authCaptureTransaction"
                        transactionrequest.amount = school_course.price
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
                        course_participant.paymentId = paymentId
                        course_participant.paymentStatus = "COMPLETED"
                        SchoolCourseParticipant.save(course_participant)
                        SchoolCourse.save(school_course)
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
            print("ERROR Raised: ", err)
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
