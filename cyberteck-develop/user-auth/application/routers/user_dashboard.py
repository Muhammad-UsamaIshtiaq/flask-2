from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from application.models import User
from application.schemas import UserSchema
import hashlib
import datetime

@api.resource('/profile/<string:email>', endpoint='dashboardAPI')
class DashboardAPI(Resource):
	def __init__(self):
		self.parser = reqparse.RequestParser()
		self.parser.add_argument('firstName', help='[firstName] first name needed', required=True, type=str)
		self.parser.add_argument('lastName', help='[lastName] last name needed', required=True, type=str)
		self.parser.add_argument('contactNumber', help='[contactNumber] contact number needed', required=True, type=str)
		self.parser.add_argument('profilePicture', required=False, type=str, default="")

	@jwt_required
	def get(self, email):
		try:
			current_user = get_jwt_identity()
			# if email and current_user["user"] doesnt match, a log with the user ip can be useful for Future Threat Intelligence
			user = User.query.filter_by(email=current_user["user"]).first()
			userSchema = UserSchema()
			responseData = {}
			if user:
				responseData = userSchema.dump(user)
			else:
				raise ItemNotExistsError("User Not Found")
			return jsonify(meta={"statusCode": "200", "message": "Fetched Successfully"}, data=responseData)
		except AppException as err:
			raise err
		except Exception as err:
			raise InternalServerError(
				"Internal server error occurred {}".format(err))
	@jwt_required
	def post(self, email):
		try:
			inputObj = self.parser.parse_args()
			current_user = get_jwt_identity()
			user = User.query.filter_by(email=current_user["user"]).first()
			if user:
				user.contactNumber=inputObj.contactNumber,
				user.firstName=inputObj.firstName,
				user.lastName=inputObj.lastName,
				user.profilePicture=inputObj.profilePicture,
				User.save(user)
			else:
				raise ItemNotExistsError("User Not Found")
			return jsonify(meta={"statusCode": "200", "message": "Updated Successfully"})
		except AppException as err:
			raise err
		except Exception as err:
			raise InternalServerError(
				"Internal server error occurred {}".format(err))
