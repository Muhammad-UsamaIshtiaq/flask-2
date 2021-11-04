from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError
from application.models import SchoolInfo, SchoolCourse
from application.schemas import SchoolInfoSchema, SchoolCourseSchema
from datetime import datetime


@api.resource('/schools/<string:schoolId>/courses/<string:courseId>', endpoint='SchoolCourseGetApi')
class SchoolCourseGetApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'title', help='[title] field needed', required=True, type=str)
        self.parser.add_argument(
            'description', help='[description] field needed', type=str, default="")
        self.parser.add_argument('subTitle', type=str, default="")
        self.parser.add_argument('subDescription', type=str, default="")
        self.parser.add_argument(
            'price', help='[price] field needed', required=True, type=float)
        self.parser.add_argument(
            'mrpPrice', help='[mrpPrice] field needed', required=True, type=float)
        self.parser.add_argument(
            'grade', help='[grade] field needed', required=True, type=str)
        self.parser.add_argument(
            'skillLevel', help='[skillLevel] field needed', required=True, type=str)
        self.parser.add_argument('path', type=str, default="")
        self.parser.add_argument(
            'courseType', help='[courseType] field needed', required=True, type=str)
        self.parser.add_argument(
            'courseCategory', help='[courseCategory] field needed', required=True, type=str)
        self.parser.add_argument(
            'duration', help='[duration] field needed', required=True, type=str)
        self.parser.add_argument(
            'isActive', help='[isActive] field needed', required=False, type=int, default=0)
        self.parser.add_argument(
            'totalSlot', help='[totalSlot] field needed', required=True, type=int)
        self.parser.add_argument('slotDateTimes',  action='append', default=[])
        self.parser.add_argument(
            'highlightPoints',  action='append', default=[])
        self.parser.add_argument(
            'coverImage', help='[coverImage] field needed', required=True, type=str)

    def get(self, schoolId, courseId):
        try:
            schoolCourseInfo = SchoolCourse.query.filter_by(
                id=courseId).filter_by(
                schoolId=schoolId).first()
            if schoolCourseInfo:
                schoolCourseSchema = SchoolCourseSchema()
                schoolCourseData = schoolCourseSchema.dump(schoolCourseInfo)
            else:
                raise ItemNotExistsError("School Course does not exist")
            return jsonify(meta={"statusCode": "200", "message": "School Course Fetched Successfully"},
                           data={**schoolCourseData})

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

    # @jwt_required
    def put(self, schoolId, courseId):
        inputObj = self.parser.parse_args()
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a course")
            schoolCourseInfo = SchoolCourse.query.filter_by(
                id=courseId).first()
            if not schoolCourseInfo:
                raise ItemNotExistsError("School Course Not found")
            schoolCourseInfo.title = inputObj.title
            schoolCourseInfo.description = inputObj.description
            schoolCourseInfo.subTitle = inputObj.subTitle
            schoolCourseInfo.subDescription = inputObj.subDescription
            schoolCourseInfo.price = inputObj.price
            schoolCourseInfo.mrpPrice = inputObj.mrpPrice
            schoolCourseInfo.grade = inputObj.grade
            schoolCourseInfo.skillLevel = inputObj.skillLevel
            schoolCourseInfo.courseType = inputObj.courseType
            schoolCourseInfo.courseCategory = inputObj.courseCategory
            schoolCourseInfo.duration = inputObj.duration
            schoolCourseInfo.isActive = inputObj.isActive
            schoolCourseInfo.coverImage = inputObj.coverImage
            schoolCourseInfo.totalSlot = inputObj.totalSlot
            #schoolCourseInfo.bookedSlot = inputObj.bookedSlot
            schoolCourseInfo.slotDateTimes = "#".join(inputObj.slotDateTimes)
            schoolCourseInfo.highlightPoints = "#".join(
                inputObj.highlightPoints)
            SchoolCourse.save(schoolCourseInfo)
            return jsonify(meta={
                "statusCode": "200", "message": "School Course Updated Successfully"},
                data={"schoolCourseId": schoolId}
            )

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


@api.resource('/schools/<string:schoolId>/courses', endpoint='SchoolCourseApi')
class SchoolCourseApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'title', help='[title] field needed', required=True, type=str)
        self.parser.add_argument(
            'description', help='[description] field needed', type=str, default="")
        self.parser.add_argument('subTitle', type=str, default="")
        self.parser.add_argument('subDescription', type=str, default="")
        self.parser.add_argument(
            'price', help='[price] field needed', required=True, type=float)
        self.parser.add_argument(
            'mrpPrice', help='[mrpPrice] field needed', required=True, type=float)
        self.parser.add_argument(
            'grade', help='[grade] field needed', required=True, type=str)
        self.parser.add_argument(
            'skillLevel', help='[skillLevel] field needed', required=True, type=str)
        self.parser.add_argument('path', type=str, default="")
        self.parser.add_argument(
            'courseType', help='[courseType] field needed', required=True, type=str)
        self.parser.add_argument(
            'courseCategory', help='[courseCategory] field needed', required=True, type=str)
        self.parser.add_argument(
            'duration', help='[duration] field needed', required=True, type=str)
        self.parser.add_argument(
            'isActive', help='[isActive] field needed', required=False, type=int, default=0)
        self.parser.add_argument(
            'totalSlot', help='[totalSlot] field needed', required=True, type=int)
        self.parser.add_argument('slotDateTimes',  action='append', default=[])
        self.parser.add_argument(
            'highlightPoints',  action='append', default=[])
        self.parser.add_argument(
            'coverImage', help='[coverImage] field needed', required=True, type=str)

    def get(self, schoolId):
        try:
            school_course_query = SchoolCourse.query.filter_by(schoolId=schoolId).order_by(
                SchoolCourse.updated_on.desc())
            schoolCourseList = school_course_query.all()
            if schoolCourseList:
                schoolCourseSchema = SchoolCourseSchema(many=True)
                schoolCourseDataList = schoolCourseSchema.dump(
                    schoolCourseList)
            else:
                schoolCourseDataList = []
            return jsonify(meta={"statusCode": "200", "message": "School Course fetched Successfully"},
                           data=schoolCourseDataList)
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

    # @jwt_required
    def post(self, schoolId):
        inputObj = self.parser.parse_args()
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a course")
            schoolCourse = SchoolCourse(
                title=inputObj.title,
                description=inputObj.description,
                subTitle=inputObj.subTitle,
                subDescription=inputObj.subDescription,
                price=inputObj.price,
                mrpPrice=inputObj.mrpPrice,
                grade=inputObj.grade,
                skillLevel=inputObj.skillLevel,
                courseType=inputObj.courseType,
                courseCategory=inputObj.courseCategory,
                duration=inputObj.duration,
                coverImage=inputObj.coverImage,
                totalSlot=inputObj.totalSlot,
                bookedSlot=0,
                slotDateTimes="#".join(inputObj.slotDateTimes),
                highlightPoints="#".join(inputObj.highlightPoints),
                schoolId=schoolId,
                isActive=inputObj.isActive
            )
            SchoolCourse.save(schoolCourse)
            return jsonify(meta={
                "statusCode": "200", "message": "School Course Created Successfully"},
                data={"courseId": schoolCourse.id}
            )
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
