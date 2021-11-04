from datetime import datetime
from application import api, db
from sqlalchemy.orm import relationship


class Model:
    id = db.Column('id', db.Integer, primary_key=True, autoincrement=True)
    created_on = db.Column('CREATED_ON', db.DateTime(),
                           default=datetime.utcnow)
    updated_on = db.Column('UPDATED_ON', db.DateTime(),
                           default=datetime.utcnow, onupdate=datetime.utcnow)

    @staticmethod
    def save(GENERIC_DATA):
        db.session.add(GENERIC_DATA)
        db.session.commit()

    @staticmethod
    def delete(GENERIC_DATA):
        db.session.delete(GENERIC_DATA)
        db.session.commit()


class Blog(db.Model, Model):
    __tablename__ = "CYBERTECK_BLOG"
    title = db.Column('TITLE', db.String(255), nullable=False)
    body = db.Column('BODY', db.Text, nullable=False)
    category = db.Column('CATEGORY', db.String(255), nullable=False)
    coverImage = db.Column('COVER_IMAGE', db.String(255), nullable=False)

    createdBy = db.Column(
        'CREATED_BY', db.String(255))

db.create_all()