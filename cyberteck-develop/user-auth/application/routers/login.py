from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException
from application.models import User
from application.schemas import UserSchema
import hashlib
import datetime 
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)


@api.resource('/login', endpoint='login')
class LoginApi(Resource):
	def __init__(self):
		self.parser = reqparse.RequestParser()
		self.parser.add_argument('email', help='email needed', required=True, type=str)
		self.parser.add_argument('password', help='[password] password needed', required=True, type=str)

	def post(self):
		inputObj = self.parser.parse_args()
		hashedPassword = hashlib.md5(inputObj.password.encode()).hexdigest()
		try:
			user = User.query.filter_by(email=inputObj.email, password=hashedPassword).first()
			if user:
				expiryDate = datetime.timedelta(hours=2)

				accessToken = create_access_token(identity={
                    'user':user.email, 'type': user.userType
                }, expires_delta=expiryDate)

				refreshToken = create_refresh_token(identity={
                    'user':user.email, 'type': user.userType
                })
				return jsonify(meta={"statusCode": "200", "message": "Login Successful"}, data={
					"jwt": accessToken,
					"refresh": refreshToken,
					"name": user.name,
					"userId": user.id,
					"userType": user.userType
				})
			else:
				raise ItemNotExistsError("Email/Password Incorrect")
		except AppException as err:
			raise err
		except Exception as err:
			raise InternalServerError(
				"Internal server error occurred {}".format(err))

'''
	DOCUMENTATION: https://pyjwt.readthedocs.io/en/latest/usage.html

'''

@api.resource('/auth/refresh', endpoint='refresh')
class RefreshAPI(Resource):
    def __init__(self):
        pass
    @jwt_refresh_token_required
    def post(self):
        try:
            current_user = get_jwt_identity()
            expires = datetime.timedelta(hours=2)
            jwt = {
                'accessToken': create_access_token(identity=current_user, expires_delta=expires)
            }
            return jsonify(meta={"statusCode": 200, "message": "new jwt successful"}, data={"jwt": jwt})

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

