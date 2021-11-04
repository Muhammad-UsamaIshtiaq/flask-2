from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException
from application.models import User, Profile
from application.schemas import UserSchema, ProfileSchema
import hashlib
import datetime
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)


@api.resource('/profile/<int:userId>', endpoint='profile-fetch')
class ProfileApi(Resource):
    def get(self, userId):
        try:
            userProfile = Profile.query.filter_by(userId=userId).first()
            if userProfile:
                profileSchema = ProfileSchema()
                return jsonify(meta={"statusCode": "200", "message": "Profile data Successful"}, data=profileSchema.dump(userProfile))
            else:
                return jsonify(meta={"statusCode": "200", "message": "No Profile Found"})
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


# data={
#                     'userId': '',
#                     'studentAge': '',
#                     'grade': '',
#                     'addressLine1': '',
#                     'addressLine2': '',
#                     'contactNo': ''
#                 }


@api.resource('/profile', endpoint='profile')
class ProfileApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'userId', help='[userId] needed', required=True, type=int)
        self.parser.add_argument(
            'contactNo', help='[contactNo] password needed', required=True, type=str, default='')
        self.parser.add_argument(
            'studentAge', help='[studentAge] password needed', required=True, type=int)
        self.parser.add_argument(
            'grade', help='[grade] password needed', required=True, type=str)
        self.parser.add_argument(
            'addressLine1', help='[addressLine1] password needed', required=True, type=str)
        self.parser.add_argument(
            'addressLine2', help='[addressLine2] password needed', required=False, type=str, default='')
        self.parser.add_argument(
            'pincode', help='[pincode] password needed', required=True, type=str, default='')
        self.parser.add_argument(
            'parentEmail', help='[parentEmail] password needed', required=True, type=str, default='')
        self.parser.add_argument(
            'firstName', help='[firstName] password needed', required=True, type=str, default='')
        self.parser.add_argument(
            'lastName', help='[lastName] password needed', required=True, type=str, default='')
        

    def post(self):
        inputObj = self.parser.parse_args()
        try:
            userProfile = Profile.query.filter_by(
                userId=inputObj.userId).first()
            if userProfile:
                userProfile.studentAge = inputObj.studentAge
                userProfile.grade = inputObj.grade
                userProfile.addressLine1 = inputObj.addressLine1
                userProfile.addressLine2 = inputObj.addressLine2
                userProfile.pincode = inputObj.pincode
                userProfile.contactNo = inputObj.contactNo
                userProfile.parentEmail = inputObj.parentEmail
                userProfile.firstName = inputObj.firstName
                userProfile.lastName = inputObj.lastName
            else:
                userProfile = Profile(
                    userId=inputObj.userId,
                    studentAge=inputObj.studentAge,
                    grade=inputObj.grade,
                    contactNo=inputObj.contactNo,
                    firstName = inputObj.firstName,
                    parentEmail = inputObj.parentEmail,
                    lastName = inputObj.lastName,
                    addressLine1=inputObj.addressLine1,
                    addressLine2=inputObj.addressLine2,
                    pincode = inputObj.pincode
                )
            Profile.save(userProfile)
            return jsonify(meta={"statusCode": "200", "message": "Profile Data Successful"})
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
