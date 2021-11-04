from application import ma
from application.models import User, Profile


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        exclude = ("id", "created_on", "updated_on", "password")

class ProfileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
        exclude = ("id", "created_on", "updated_on")