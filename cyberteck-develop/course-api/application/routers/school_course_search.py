from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import inputs, reqparse, Resource
from application import api, app
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError, CardError
from application.models import SchoolCourse, SchoolCourseParticipant, SchoolInfo
from application.schemas import SchoolCourseSchema, SchoolCourseParticipantSchema, SchoolInfoSchema
import hashlib
import datetime
import stripe
from paypalcheckoutsdk.orders import OrdersCaptureRequest
from application.utils.paypal_config import PayPalClient
from uuid import uuid4
stripe.api_key = app.config['STRIP_ACCESS_KEY']


@api.resource('/schools/courses/search', endpoint='school-course-search')
class SchoolCourseSearchApi(Resource):
    def __init__(self):
        self.schoolInfoSchema = SchoolInfoSchema()
        self.schoolCourseSchema = SchoolCourseSchema()
        self.getParser = reqparse.RequestParser()
        self.getParser.add_argument(
            'schoolName',  type=str, required=False, default=None)
        self.getParser.add_argument(
            'courseName',  type=str, required=False, default=None)
        self.getParser.add_argument(
            'grade',  type=str, required=False, default=None)
        self.getParser.add_argument(
            'limit',  type=int, required=False, default=0)

    def get(self):
        try:
            filters = self.getParser.parse_args()
            school_list_query = SchoolInfo.query.outerjoin(
                SchoolInfo.courses, aliased=True)
            if filters.schoolName:
                school_list_query = school_list_query.filter(
                    SchoolInfo.name.like("%"+filters.schoolName+"%")
                )
            # if filters.limit > 0:
            #    school_list_query = school_list_query.limit(filters.limit)
            # if userId != 0:
            #     school_list_query = school_list_query.filter(
            #         SchoolCourseParticipant.createdBy == userId)
            school_list = school_list_query.all()

            school_data_list = []
            course_count = 0
            if school_list:
                for school_info in school_list:
                    school_data = self.schoolInfoSchema.dump(school_info)
                    school_data['courses'] = []
                    for school_course in school_info.courses:
                        if filters.courseName and filters.courseName.upper() not in school_course.title.upper():
                            continue
                        if filters.grade and school_course.grade != filters.grade:
                            continue
                        school_course_data = self.schoolCourseSchema.dump(
                            school_course)
                        school_data['courses'].append(school_course_data)
                        course_count = course_count + 1
                    if (filters.courseName or filters.grade) and not school_data['courses']:
                        continue
                    school_data_list.append(school_data)
                    if filters.limit > 0 and course_count >= filters.limit:
                        break
            return jsonify(meta={"statusCode": "200", "message": "Course fetched successfuly"}, data=school_data_list)
        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
