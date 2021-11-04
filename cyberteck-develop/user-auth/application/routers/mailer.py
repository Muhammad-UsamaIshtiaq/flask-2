from flask import jsonify
from flask_restful import reqparse, Resource

from application import api, app
from application.errors import ItemNotExistsError, InternalServerError, AppException
from application.models import User
from application.schemas import UserSchema
from application.templates.contact_us import _body
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

@api.resource('/contactUs', endpoint='contact-us')
class RefreshAPI(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'name', help='[name] first name needed', required=True, type=str)
        self.parser.add_argument(
            'email', help='[email] first name needed', required=True, type=str)
        self.parser.add_argument(
            'contactNo', help='[contactNo] first name needed', required=False, type=str, default="")
        self.parser.add_argument(
            'subject', help='[subject] first name needed', required=True, type=str)
        self.parser.add_argument(
            'message', help='[message] first name needed', required=True, type=str)

    def post(self):
        try:
            inputObj = self.parser.parse_args()
            html_body_data = _body(inputObj.email, inputObj.name, inputObj.subject, inputObj.message, 1, inputObj.contactNo)
            toEmail = app.config['CONTACT_RECEIVE_EMAIL']
            fromEmail = app.config['SMTP_USERNAME']

            message = f"Subject: {inputObj.subject}\nFrom: {fromEmail}\nTo: {toEmail}\nContent-Type: text/html\n\n{html_body_data}"
            
            server=smtplib.SMTP('localhost')
            server.set_debuglevel(3)
            server.ehlo()
            server.starttls()
            server.login(fromEmail, app.config['SMTP_PASS'])
            server.sendmail(fromEmail, toEmail, message)
            server.close()
            
            return jsonify(meta={"statusCode": 200, "message": "sent mail successfully"})

        except AppException as err:
            raise err
        except Exception as err:
            print(err)
            raise InternalServerError(
                "Internal server error occurred {}".format(err))