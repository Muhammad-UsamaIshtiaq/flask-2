from application import ma
from application.models import Blog

class BlogSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Blog
        exclude = ("created_on", )
