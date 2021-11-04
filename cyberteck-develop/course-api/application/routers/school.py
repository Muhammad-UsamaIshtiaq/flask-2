from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError
from application.models import SchoolInfo
from application.schemas import SchoolInfoSchema
from datetime import datetime


@api.resource('/schools/<string:schoolId>', endpoint='school_get')
class SchoolInfoApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'name', help='[name] field needed', required=True, type=str)
        self.parser.add_argument(
            'description', help='[description] field needed', required=True, type=str)
        self.parser.add_argument(
            'state', help='[state] field needed', required=True, type=str)
        self.parser.add_argument(
            'address', help='[address] field needed', required=False, type=str, default="")
        self.parser.add_argument(
            'coverImage', help='[coverImage] field needed', required=True, type=str)
        self.parser.add_argument(
            'isActive', help='[isActive] field needed', required=False, type=int, default=0)

    def get(self, schoolId):
        try:
            schoolInfo = SchoolInfo.query.filter_by(id=schoolId).first()
            if schoolInfo:
                schoolInfoSchema = SchoolInfoSchema()
                schoolInfoData = schoolInfoSchema.dump(schoolInfo)
            else:
                raise ItemNotExistsError("School does not exist")
            return jsonify(meta={"statusCode": "200", "message": "School Posted Successfully"}, data={**schoolInfoData})

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

    # @jwt_required
    def put(self, schoolId):
        inputObj = self.parser.parse_args()
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a course")
            schoolInfo = SchoolInfo.query.filter_by(id=schoolId).first()
            if not schoolInfo:
                raise ItemNotExistsError("School Not found")
            schoolInfo.name = inputObj.name
            schoolInfo.description = inputObj.description
            schoolInfo.state = inputObj.state
            schoolInfo.address = inputObj.address
            schoolInfo.coverImage = inputObj.coverImage
            schoolInfo.isActive = inputObj.isActive
            SchoolInfo.save(schoolInfo)
            return jsonify(meta={
                "statusCode": "200", "message": "School Updated Successfully"},
                data={"schoolId": schoolId}
            )

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


@api.resource('/schools', endpoint='school')
class SchoolApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'name', help='[name] field needed', required=True, type=str)
        self.parser.add_argument(
            'description', help='[description] field needed', required=True, type=str)
        self.parser.add_argument(
            'state', help='[state] field needed', required=True, type=str)
        self.parser.add_argument(
            'address', help='[address] field needed', required=False, type=str)
        self.parser.add_argument(
            'coverImage', help='[coverImage] field needed', required=True, type=str)
        self.parser.add_argument(
            'isActive', help='[isActive] field needed', required=False, type=int, default=0)
        self.parser.add_argument(
            'coverImage', help='[coverImage] field needed', required=True, type=str)

        self.getParser = reqparse.RequestParser()
        self.getParser.add_argument('source', type=str, default="ALL")
        self.getParser.add_argument('limit', type=int, default=0)

    def get(self):
        print("hello")
        inputObj = self.getParser.parse_args()
        filters = dict(inputObj)
        try:
            school_query = SchoolInfo.query
            fetch_source = filters.pop('source')
            fetch_limit = filters.pop('limit')

            school_query = school_query.order_by(
                SchoolInfo.updated_on.desc())
            if fetch_limit > 0:
                school_query = school_query.limit(fetch_limit)
            schoolList = school_query.all()
            if schoolList:
                schoolInfoSchema = SchoolInfoSchema(many=True)
                schoolDataList = schoolInfoSchema.dump(schoolList)
            else:
                raise ItemNotExistsError("School does not exist")
            return jsonify(meta={"statusCode": "200", "message": "School Posted Successfully"}, data=schoolDataList)
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

    # @jwt_required
    def post(self):
        inputObj = self.parser.parse_args()
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a course")
            schoolInfo = SchoolInfo(
                name=inputObj.name,
                description=inputObj.description,
                address=inputObj.address,
                state=inputObj.state,
                coverImage=inputObj.coverImage,
                isActive=inputObj.isActive,
            )
            SchoolInfo.save(schoolInfo)
            return jsonify(meta={
                "statusCode": "200", "message": "School Created Successfully"},
                data={"schoolId": schoolInfo.id}
            )
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
