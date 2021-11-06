from application import ma
from application.models import Order, Account
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

class OrderInfoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        exclude = ( "created_on", "updated_on", "id")
    
class SchoolCourseSchema(ma.SQLAlchemyAutoSchema):
    highlightPoints = Array()
    slotDateTimes = Array()
    class Meta:
        model = Order
        exclude = ( "created_on", "updated_on")
