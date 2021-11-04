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


class User(db.Model, Model):
    __tablename__ = "CYBERTECK_USER"
    email = db.Column('EMAIL', db.String(80), unique=True, nullable=False)
    name = db.Column('NAME', db.String(80), nullable=False)
    profilePicture = db.Column('PROFILE_PICTURE', db.String(80), nullable=False)
    contactNumber = db.Column('CONTACT_NUMBER', db.String(80), nullable=False)
    password = db.Column('PASSWORD', db.String(80), nullable=False)
    userType = db.Column('USER_TYPE', db.String(80), nullable=False)


class Profile(db.Model, Model):
    __tablename__ = "CYBERTECK_PROFILE"
    userId = db.Column('USER_ID', db.String(80), nullable=True)
    addressLine1 = db.Column('ADDRESS_LINE1', db.String(80), nullable=True)
    addressLine2 = db.Column('ADDRESS_LINE2', db.String(80), nullable=True)
    contactNo = db.Column('CONTACT_NUMBER', db.String(80), nullable=True)
    pincode = db.Column('PINCODE', db.String(80), nullable=True)
    parentEmail = db.Column('PARENT_EMAIL', db.String(80), nullable=True)
    firstName = db.Column('FIRST_NAME', db.String(80), nullable=True)
    lastName = db.Column('LAST_NAME', db.String(80), nullable=True)
    studentAge = db.Column('STUDENT_AGE', db.String(80), nullable=True)
    grade = db.Column('STUDENT_GRADE', db.String(80), nullable=True)




db.create_all()