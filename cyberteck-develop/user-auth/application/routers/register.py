from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException, DuplicateItemError
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from application.models import User
from application.schemas import UserSchema
import hashlib
import datetime

@api.resource('/register', endpoint='register')
class RegisterAPI(Resource):
	def __init__(self):
		self.parser = reqparse.RequestParser()
		self.parser.add_argument('email', help='email needed', required=True, type=str)
		self.parser.add_argument('name', help='[name] name needed', required=True, type=str)
		self.parser.add_argument('contactNumber', help='[contactNumber] contact number needed', required=False, type=str, default="")
		self.parser.add_argument('profilePicture', required=False, type=str, default="")
		self.parser.add_argument('password', help='[password] password needed', required=True, type=str)

	def post(self):
		inputObj = self.parser.parse_args()
		try:
			user = User.query.filter_by(email=inputObj.email).first()
			if user:
				raise DuplicateItemError("Email Already Taken")
			else:
				newUser = User(
					email=inputObj.email,
					password=hashlib.md5(inputObj.password.encode()).hexdigest(),
					contactNumber=inputObj.contactNumber,
					name=inputObj.name,
					profilePicture=inputObj.profilePicture,
					userType="STUDENT"
				)
				User.save(newUser)
				expiryDate = datetime.timedelta(hours=2)

				accessToken = create_access_token(identity={
                    'user':newUser.email, 'type': newUser.userType
                }, expires_delta=expiryDate)

				refreshToken = create_refresh_token(identity={
                    'user':newUser.email, 'type': newUser.userType
                })

			return jsonify(meta={"statusCode": "200", "message": "Account Created Successfully"}, data={
					"jwt": accessToken,
					"refresh": refreshToken,
					"name": newUser.name,
					"userId": newUser.id,
					"userType": newUser.userType
				})
		except AppException as err:
			raise err
		except Exception as err:
			print(err)
			raise InternalServerError(
				"Internal server error occurred {}".format(err))






# 