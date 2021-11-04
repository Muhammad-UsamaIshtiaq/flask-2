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


class CourseInfo(db.Model, Model):
    __tablename__ = "CYBERTECK_COURSE_INFO"
    title = db.Column('TITLE', db.String(255), nullable=False)
    description = db.Column('DESCRIPTION', db.Text, nullable=False)
    subTitle = db.Column('SUB_TITLE', db.String(255))
    subDescription = db.Column('SUB_DESCRIPTION', db.Text)
    price = db.Column('PRICE', db.Float, nullable=False)
    mrpPrice = db.Column('MRP_PRICE', db.Float, nullable=False)
    grade = db.Column('GRADE', db.String(255), nullable=False)
    skillLevel = db.Column('SKILL_LEVEL', db.String(255))
    tools = db.Column('TOOLS', db.String(255))
    prerequisite = db.Column('PREREQUISITE', db.String(255))
    highlightPoints = db.Column('HIGHLIGHT_POINTS', db.Text)
    requirements = db.Column('REQUIREMENTS', db.Text)
    path = db.Column('PATH', db.String(255))
    courseType = db.Column('COURSE_TYPE', db.String(255))
    duration = db.Column('DURATION', db.Integer)
    isActive = db.Column('isActive', db.Integer)
    coverImage = db.Column('COVER_IMAGE', db.String(255), nullable=True)
    courseImage = db.Column('COURSE_IMAGE', db.String(255), nullable=True)
    courseCategory = db.Column('COURSE_CATEGORY', db.String(255))
    schedules = relationship("CourseSchedule", back_populates="courseInfo")


class CourseSchedule(db.Model, Model):
    __tablename__ = "CYBERTECK_COURSE_SCHEDULE"
    courseID = db.Column(
        'COURSE_ID', db.Integer, db.ForeignKey('CYBERTECK_COURSE_INFO.id'))
    startTime = db.Column('START_TIME', db.DateTime())
    capacity = db.Column('CAPACITY', db.Integer)
    participant = db.Column('PARTICIPANT', db.Integer, default=0)
    createdBy = db.Column('CREATED_BY', db.Integer)
    participants = relationship("CourseParticipant", back_populates="courseSchedule")
    courseInfo = relationship("CourseInfo", back_populates="schedules")


class CourseParticipant(db.Model, Model):
    __tablename__ = "CYBERTECK_COURSE_PARTICIPANT"
    scheduleId = db.Column(
        'SCHEDULE_ID', db.Integer, db.ForeignKey('CYBERTECK_COURSE_SCHEDULE.id'), nullable=False)
    parentEmail = db.Column('USER_EMAIL', db.String(255), nullable=False)
    firstName = db.Column('FIRST_NAME', db.String(255), nullable=False)
    lastName = db.Column('LAST_NAME', db.String(255), nullable=False)
    createdBy = db.Column('CREATED_BY', db.Integer)
    paymentMode = db.Column('PAYMENT_MODE', db.String(255))
    paymentStatus = db.Column('PAYMENT_STATUS', db.String(255))
    paymentId = db.Column('PAYMENT_ID', db.String(255))
    courseSchedule = relationship("CourseSchedule", back_populates="participants")


class SchoolInfo(db.Model, Model):
    __tablename__ = "CYBERTECK_SCHOOL_INFO"
    name = db.Column('NAME', db.String(255), nullable=False)
    description = db.Column('DESCRIPTION', db.TEXT, nullable=False)
    address = db.Column('ADDRESS', db.TEXT)
    state = db.Column('STATE', db.String(255), nullable=False)
    coverImage = db.Column('COVER_IMAGE', db.String(255), nullable=False)
    isActive = db.Column('isActive', db.Integer)
    courses = relationship("SchoolCourse", back_populates="schoolInfo")

class SchoolCourse(db.Model, Model):
    __tablename__ = "CYBERTECK_SCHOOL_COURSE"
    title = db.Column('TITLE', db.String(255), nullable=False)
    description = db.Column('DESCRIPTION', db.Text)
    subTitle = db.Column('SUB_TITLE', db.String(255))
    subDescription = db.Column('SUB_DESCRIPTION', db.Text)
    price = db.Column('PRICE', db.Float, nullable=False)
    mrpPrice = db.Column('MRP_PRICE', db.Float, nullable=False)
    grade = db.Column('GRADE', db.String(255), nullable=False)
    skillLevel = db.Column('SKILL_LEVEL', db.String(255))
    highlightPoints = db.Column('HIGHLIGHT_POINTS', db.Text)
    courseCategory = db.Column('COURSE_CATEGORY', db.String(255))
    courseType = db.Column('COURSE_TYPE', db.String(255))
    duration = db.Column('DURATION', db.String(255))
    coverImage = db.Column('COVER_IMAGE', db.String(255), nullable=True)
    isActive = db.Column('IS_ACTIVE', db.Integer)
    totalSlot = db.Column('TOTAL_SLOT', db.Integer)
    bookedSlot = db.Column('BOOKED_SLOT', db.Integer)
    slotDateTimes = db.Column('SLOT_DATETIMES', db.Text)
    schoolId = db.Column(
        'COURSE_ID', db.Integer, db.ForeignKey('CYBERTECK_SCHOOL_INFO.id'))
    schoolInfo = relationship("SchoolInfo", back_populates="courses")
    participants = relationship("SchoolCourseParticipant", back_populates="courseInfo")


class SchoolCourseParticipant(db.Model, Model):
    __tablename__ = "CYBERTECK_SCHOOL_COURSE_PARTICIPANT"
    courseId = db.Column(
        'SCHOOL_COURSE_ID', db.Integer, db.ForeignKey('CYBERTECK_SCHOOL_COURSE.id'), nullable=False)
    parentEmail = db.Column('USER_EMAIL', db.String(255), nullable=False)
    firstName = db.Column('FIRST_NAME', db.String(255), nullable=False)
    lastName = db.Column('LAST_NAME', db.String(255), nullable=False)
    createdBy = db.Column('CREATED_BY', db.Integer)
    paymentMode = db.Column('PAYMENT_MODE', db.String(255))
    paymentStatus = db.Column('PAYMENT_STATUS', db.String(255))
    paymentId = db.Column('PAYMENT_ID', db.String(255))
    courseInfo = relationship("SchoolCourse", back_populates="participants")

db.create_all()
