from flask import Flask, jsonify
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
import os
from flask_cors import CORS
from application.errors import AppException
from flask_jwt_extended import JWTManager


app = Flask(__name__, instance_relative_config=True)

app.config.from_pyfile('config.py') # config file loading
app.config['APP_ROOT'] = os.getcwd()
app.config['BASE_URL_PATH'] = os.environ.get("BASE_URL_PATH", default="")
db = SQLAlchemy(app)
ma = Marshmallow()
api = Api(app)

jwt = JWTManager(app)


CORS(app, allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials",
    "Access-Control-Request-Method","Access-Control-Request-Headers"],
    supports_credentials=True, resources={r"/*": {"origins": "*"}})



@app.errorhandler(AppException)
def handle_error(error):
    error_dict = error.__dict__
    error_dict.update({"errorType": type(error).__name__})
    response = jsonify(meta=error_dict)
    return response

import application.routers
