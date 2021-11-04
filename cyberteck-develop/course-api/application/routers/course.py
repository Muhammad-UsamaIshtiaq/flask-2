from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError
from application.models import CourseInfo
from application.schemas import CourseInfoSchema
from datetime import datetime


@api.resource('/course/<string:courseID>', endpoint='course_get')
class CourseApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'title', help='[title] field needed', required=True, type=str)
        self.parser.add_argument(
            'description', help='[description] field needed', required=True, type=str)
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
        self.parser.add_argument(
            'tools', help='[tools] field needed', required=True, type=str)
        self.parser.add_argument(
            'prerequisite', help='[prerequisite] field needed', required=True, type=str)
        self.parser.add_argument('path', type=str, default="")
        self.parser.add_argument(
            'courseType', help='[courseType] field needed', required=True, type=str)
        self.parser.add_argument(
            'courseCategory', help='[courseCategory] field needed', required=True, type=str)
        self.parser.add_argument(
            'duration', help='[duration] field needed', required=True, type=str)
        self.parser.add_argument(
            'isActive', help='[isActive] field needed', required=False, type=int, default=0)
        self.parser.add_argument('highlightPoints', type=str, action='append', default=[])
        self.parser.add_argument('requirements', type=str, action='append', default=[])
        self.parser.add_argument(
            'coverImage', help='[coverImage] field needed', required=True, type=str)
        self.parser.add_argument(
            'courseImage', help='[courseImage] field needed', required=True, type=str)

    def get(self, courseID):
        try:
            courseInfo = CourseInfo.query.filter_by(id=courseID).first()
            if courseInfo:
                courseInfoSchema = CourseInfoSchema()
                courseInfoData = courseInfoSchema.dump(courseInfo)
            else:
                raise ItemNotExistsError("Course does not exist")
            return jsonify(meta={"statusCode": "200", "message": "Course Posted Successfully"}, data={**courseInfoData})

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

    # @jwt_required
    def put(self, courseID):
        inputObj = self.parser.parse_args()
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a course")
            courseInfo = CourseInfo.query.filter_by(id=courseID).first()
            if not courseInfo:
                raise ItemNotExistsError("Course Not found")
            courseInfo.title = inputObj.title
            courseInfo.description = inputObj.description
            courseInfo.subTitle = inputObj.subTitle
            courseInfo.subDescription = inputObj.subDescription
            courseInfo.price = inputObj.price
            courseInfo.mrpPrice = inputObj.mrpPrice
            courseInfo.grade = inputObj.grade
            courseInfo.skillLevel = inputObj.skillLevel
            courseInfo.tools = inputObj.tools
            courseInfo.prerequisite = inputObj.prerequisite
            courseInfo.path = inputObj.path
            courseInfo.courseType = inputObj.courseType
            courseInfo.courseCategory = inputObj.courseCategory
            courseInfo.duration = inputObj.duration
            courseInfo.isActive = inputObj.isActive
            courseInfo.coverImage = inputObj.coverImage
            courseInfo.courseImage = inputObj.courseImage
            courseInfo.requirements = "#".join(inputObj.requirements)
            courseInfo.highlightPoints = "#".join(inputObj.highlightPoints)
            CourseInfo.save(courseInfo)
            return jsonify(meta={
                "statusCode": "200", "message": "Course Updated Successfully"},
                data={"courseId": courseID}
            )

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


@api.resource('/course', endpoint='course')
class CourseApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'title', help='[title] field needed', required=True, type=str)
        self.parser.add_argument(
            'description', help='[description] field needed', required=True, type=str)
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
        self.parser.add_argument(
            'tools', help='[tools] field needed', required=True, type=str)
        self.parser.add_argument(
            'prerequisite', help='[prerequisite] field needed', required=True, type=str)
        self.parser.add_argument('path', type=str, default="")
        self.parser.add_argument(
            'courseType', help='[courseType] field needed', required=True, type=str)
        self.parser.add_argument(
            'courseCategory', help='[courseCategory] field needed', required=True, type=str)
        self.parser.add_argument(
            'duration', help='[duration] field needed', required=True, type=int)
        self.parser.add_argument(
            'isActive', help='[isActive] field needed', required=False, type=int, default=0)
        self.parser.add_argument(
            'highlightPoints',  action='append', default=[])
        self.parser.add_argument('requirements',  action='append', default=[])
        self.parser.add_argument(
            'coverImage', help='[coverImage] field needed', required=True, type=str)
        self.parser.add_argument(
            'courseImage', help='[courseImage] field needed', required=True, type=str)
        self.getParser = reqparse.RequestParser()
        self.getParser.add_argument(
            'courseType',  action='append', type=str, default=[])
        self.getParser.add_argument(
            'courseCategory',  action='append', type=str, default=[])
        self.getParser.add_argument(
            'priceRange',  action='append', type=int, default=[])
        self.getParser.add_argument(
            'skillLevel', action='append', type=str, default=[])
        self.getParser.add_argument(
            'grade', action='append', type=str, default=[])
        self.getParser.add_argument('source', type=str, default="ALL")
        self.getParser.add_argument('limit', type=int, default=0)

    def __add_filters(self, query, filters):
        for attr, value in filters.items():
            if isinstance(value, (tuple, set, list)) and value:
                query = query.filter(getattr(CourseInfo, attr).in_(value))
            elif value and str(value).find(',') != -1:
                value_list = str(value).split(',')
                query = query.filter(
                    getattr(CourseInfo, attr).in_(value_list))
            elif value and value in ('yes', 'no'):
                valueBool = (value == 'yes')
                query = query.filter(getattr(CourseInfo, attr) == valueBool)
            elif value:
                query = query.filter(getattr(CourseInfo, attr) == value)
        return query

    def get(self):
        inputObj = self.getParser.parse_args()
        filters = dict(inputObj)
        try:
            course_query = CourseInfo.query
            fetch_source = filters.pop('source')
            fetch_limit = filters.pop('limit')
            if 'priceRange' in filters:
                priceRange = filters.pop('priceRange')
                if priceRange:
                    course_query = course_query.filter(CourseInfo.price >= priceRange[0]).filter(
                        CourseInfo.price <= priceRange[1])

            #if fetch_source != 'TEACHER':
            #    course_query = course_query.filter(CourseInfo.schedules.any())
            course_query = self.__add_filters(course_query, filters).order_by(
                CourseInfo.updated_on.desc())
            if fetch_limit > 0:
                course_query = course_query.limit(fetch_limit)
            courseList = course_query.all()
            if courseList:
                courseInfoSchema = CourseInfoSchema(many=True)
                courseInfoData = courseInfoSchema.dump(courseList)
            else:
                raise ItemNotExistsError("Course does not exist")
            return jsonify(meta={"statusCode": "200", "message": "Course Posted Successfully"}, data=courseInfoData)
        except AppException as err:
            raise err
        except Exception as err:
            print(err)
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
            courseInfo = CourseInfo(
                title=inputObj.title,
                description=inputObj.description,
                subTitle=inputObj.subTitle,
                subDescription=inputObj.subDescription,
                price=inputObj.price,
                mrpPrice=inputObj.mrpPrice,
                grade=inputObj.grade,
                skillLevel=inputObj.skillLevel,
                tools=inputObj.tools,
                prerequisite=inputObj.prerequisite,
                path=inputObj.path,
                courseType=inputObj.courseType,
                courseCategory=inputObj.courseCategory,
                duration=inputObj.duration,
                coverImage= inputObj.coverImage,
                courseImage = inputObj.courseImage,
                requirements="#".join(inputObj.requirements),
                highlightPoints="#".join(inputObj.highlightPoints),
                isActive=inputObj.isActive,
            )
            CourseInfo.save(courseInfo)
            return jsonify(meta={
                "statusCode": "200", "message": "Course Created Successfully"},
                data={"courseId": courseInfo.id}
            )
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
