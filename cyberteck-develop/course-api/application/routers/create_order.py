from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError
from application.models import CourseInfo,SchoolCourse
from application.schemas import CourseInfoSchema
from datetime import datetime
from paypalcheckoutsdk.orders import OrdersCreateRequest
from application.utils.paypal_config import PayPalClient
import uuid


@api.resource('/create-order/paypal', endpoint='create-paypal-order')
class CourseApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('courseType', required=True, type=str)
        self.parser.add_argument('amount', required=True, type=str)
        self.parser.add_argument('product', required=True, type=str)
        self.parser.add_argument('productId', required=True, type=str)


    # product is single now, but for multiple product purchase it will be an array
    def build_request_body(self, amount, product, productId):
        return {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "reference_id": "{}".format(uuid.uuid4()),
                    "description": "course-id: {} course-name: {}".format(product, productId),
                    "amount": {
                        "currency_code": "USD",
                        "value": str(amount),
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": str(amount)
                            }
                        }
                    }
                }
            ]
        }

    # @jwt_required
    def post(self):
        inputObj = self.parser.parse_args()
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a course")


            if inputObj.courseType == 'NORMAL_COURSE':
                courseInfo = CourseInfo.query.filter_by(id=inputObj.productId).first()
            elif inputObj.courseType == 'SCHOOL_COURSE':
                courseInfo = SchoolCourse.query.filter_by(id=inputObj.productId).first()
            
            if courseInfo:
                requestOrder = OrdersCreateRequest()
                requestOrder.prefer('return=representation')
                requestOrder.request_body(self.build_request_body(courseInfo.price, inputObj.product, inputObj.productId))
                paypalClientObj = PayPalClient()
                response = paypalClientObj.client.execute(requestOrder)
                return jsonify(meta={
                    "statusCode": "200", "message": "Course Created Successfully"},
                    data={
                        "orderId": response.result.id,
                        "status": response.result.status,
                        "statusCode": response.status_code,
                        "intent": response.result.intent
                    }
                )
            else: raise ItemNotExistsError("Invalid Course Id")
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
