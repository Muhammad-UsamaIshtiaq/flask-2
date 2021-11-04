from application import ma
from application.models import CourseInfo, CourseSchedule, CourseParticipant, SchoolInfo, SchoolCourse, SchoolCourseParticipant
from marshmallow import fields
from datetime import datetime


class Array(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value:
            return value.split('#')
        return []

    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return "#".join(value)
        except ValueError as error:
            raise ValidationError("Pin codes must contain only digits.") from error

class Timestamp(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        print(value)
        return datetime.strftime(value, '%Y-%m-%dT%H:%M:%S.%fZ')

    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%fZ')
        except ValueError as error:
            raise ValidationError("Pin codes must contain only digits.") from error


class CourseInfoSchema(ma.SQLAlchemyAutoSchema):
    requirements = Array()
    highlightPoints = Array()
    class Meta:
        model = CourseInfo
        exclude = ( "created_on", "updated_on")

class SchoolInfoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SchoolInfo
        exclude = ( "created_on", "updated_on")
    
class SchoolCourseSchema(ma.SQLAlchemyAutoSchema):
    highlightPoints = Array()
    slotDateTimes = Array()
    class Meta:
        model = SchoolCourse
        exclude = ( "created_on", "updated_on")


class CourseScheduleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CourseSchedule
        exclude = ("created_on", "updated_on")
    startTime = Timestamp()


class CourseParticipantSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CourseParticipant
        exclude = ("created_on", "updated_on")



class SchoolCourseParticipantSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SchoolCourseParticipant
        exclude = ("created_on", "updated_on")