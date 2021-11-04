from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
import jwt
from application.errors import ItemNotExistsError, InternalServerError, AppException
from application.models import User
from application.schemas import UserSchema
import hashlib
from datetime import datetime, timedelta
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)

from Crypto.Cipher import AES
import base64

@api.resource('/password/reset', endpoint='reset_password')
class ResetPasswordAPI(Resource):
	def __init__(self):
		self.getParser = reqparse.RequestParser()
		self.getParser.add_argument(
            'email', help='Invalid Email', required=True, type=str, default=None)
		self.parser = reqparse.RequestParser()
		self.parser.add_argument('email', help='email needed', required=True, type=str)
		self.parser.add_argument('token', help='[token] token needed', required=True, type=str)
		self.parser.add_argument('newPassword', help='[newPassword] newPassword needed', required=True, type=str)
		self.cipher = AES.new("0000---cyberTeck",AES.MODE_ECB)

	def get(self):
		inputObj = self.getParser.parse_args()
		try:
			user = User.query.filter_by(email=inputObj.email).first()
			if user:
				# send a mail to user as well.
				token = base64.b64encode(self.cipher.encrypt(user.password))
				return jsonify(meta={"statusCode": "200", "message": "Token Generated Successfully"}, data={
					"token": token.decode("utf-8")
				})
			else:
				raise ItemNotExistsError("Email Invalid")
		except AppException as err:
			raise err
		except Exception as err:
			raise InternalServerError(
				"Internal server error occurred {}".format(err))	


	def post(self):
		inputObj = self.parser.parse_args()
		password = self.cipher.decrypt(base64.b64decode(inputObj.token))
		try:
			user = User.query.filter_by(email=inputObj.email, password=password).first()
			if user:
				user.password = hashlib.md5(inputObj.newPassword.encode()).hexdigest()
				User.save(user)
				return jsonify(meta={"statusCode": "200", "message": "Password Update Successfully"})
			else:
				raise ItemNotExistsError("Invalid Password Reset Incorrect")
		except AppException as err:
			raise err
		except Exception as err:
			raise InternalServerError(
				"Internal server error occurred {}".format(err))



# pycrypto , Crypto Module heavily used

@api.resource('/password/change', endpoint='change_password')
class ResetPasswordAPI(Resource):
	def __init__(self):
		self.parser = reqparse.RequestParser()
		self.parser.add_argument('oldPassword', help='[password] first name needed', required=True, type=str)
		self.parser.add_argument('newPassword', help='[password] first name needed', required=True, type=str)

	@jwt_required
	def post(self):
		try:
			inputObj = self.parser.parse_args()
			current_user = get_jwt_identity()
			oldPassword = hashlib.md5(inputObj.oldPassword.encode()).hexdigest()
			user = User.query.filter_by(email=current_user["user"], password=oldPassword ).first()
			if user:
				user.password = hashlib.md5(inputObj.newPassword.encode()).hexdigest()
				User.save(user)
				return jsonify(meta={"statusCode": "200", "message": "Password Update Successfully"})
			else:
				raise ItemNotExistsError("Invalid Password Reset Incorrect")

		except AppException as err:
			raise err
		except Exception as err:
			raise InternalServerError(
				"Internal server error occurred {}".format(err))