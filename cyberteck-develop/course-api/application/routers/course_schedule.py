from flask_cors import cross_origin
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from flask import jsonify
from flask_restful import reqparse, Resource

from application import api
from application.errors import ItemNotExistsError, InternalServerError, AppException, AccessDeniedError
from application.models import CourseInfo, CourseSchedule
from application.schemas import CourseInfoSchema, CourseScheduleSchema
import hashlib
from datetime import datetime 
from sqlalchemy_filters import apply_filters


@api.resource('/course/<string:courseID>/schedule', endpoint='Course-Schedule')
class CourseScheduleFetchApi(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'startTime', help='[startTime] field needed', required=True, type=str)
        self.parser.add_argument(
            'capacity', help='[capacity] field needed', required=True, type=int)
        self.parser.add_argument('courseScheduleID', required=False, type=int)

    def get(self, courseID):
        try:
            courseScheduleList = CourseSchedule.query.filter_by(
                courseID=courseID).all()
            courseScheduleSchema = CourseScheduleSchema(many=True)
            courseInfoSchema = CourseInfoSchema()
            if courseScheduleList:
                courseInfoData = CourseInfo.query.filter_by(
                    id=courseScheduleList[0].courseID).first()
                courseScheduleData = {**courseInfoSchema.dump(
                    courseInfoData), "scheduleTime": courseScheduleSchema.dump(courseScheduleList)}
            else:
                raise ItemNotExistsError("Course Has no Schedule")
            return jsonify(meta={"statusCode": "200", "message": "Course scheduled successfuly"}, 
            data={
                **courseScheduleData
            })
        except AppException as err:
            raise err
        except Exception as err:
            print(err)
            raise InternalServerError(
                "Internal server error occurred {}".format(err))

    # @jwt_required
    def post(self, courseID):
        inputObj = self.parser.parse_args()
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a course")

            courseInfo = CourseInfo.query.filter_by(id=courseID).first()
            if not courseInfo:
                raise ItemNotExistsError("Course does not exist")

            print(inputObj.startTime)
            startTime = datetime.strptime(inputObj.startTime, '%Y-%m-%dT%H:%M:%S.%fZ')
            if inputObj.courseScheduleID:
                courseSchedule = CourseSchedule.query.filter_by(
                    id=inputObj.courseScheduleID).first()
                if courseSchedule:
                    courseSchedule.startTime = startTime
                    courseSchedule.capacity = inputObj.capacity
                else:
                    raise ItemNotExistsError("Invalid Schedule Id")

            else:
                courseSchedule = CourseSchedule(
                    courseID=courseID,
                    startTime=startTime,
                    capacity=inputObj.capacity,
                    createdBy=1,#current_user["user"]
                )

            CourseSchedule.save(courseSchedule)

            return jsonify(meta={"statusCode": "204", "message": "Course scheduled successfuly"}, data={
                "id": courseSchedule.id
            })

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))


@api.resource('/course/<string:courseId>/schedule/<string:scheduleId>', endpoint='course-schedule-delete')
class CourseScheduleApi(Resource):
    def __init__(self):
        pass

    # @jwt_required
    def delete(self, courseId, scheduleId):
        try:
            # current_user = get_jwt_identity()
            # if current_user["type"] != "instructor":
            #     raise AccessDeniedError(
            #         "Only instructors are allowed to post a course")
            course_schedule = CourseSchedule.query.filter_by(
                id=scheduleId, courseID=courseId).first()
            if not course_schedule:
                raise ItemNotExistsError("Course Schedule does not exist")

            CourseSchedule.delete(course_schedule)

            return jsonify(meta={"statusCode": "204", "message": "Course scheduled successfuly"}, data={
                "id": scheduleId
            })

        except AppException as err:
            raise err
        except Exception as err:
            raise InternalServerError(
                "Internal server error occurred {}".format(err))
