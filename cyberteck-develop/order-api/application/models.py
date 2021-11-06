from datetime import datetime
from application import db


class BaseModel:
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


class Order(db.Model, BaseModel):
    __tablename__ = 'Order'
    customer_name = db.Column('CUSTOMER_NAME', db.String(50), nullable=True)
    price = db.Column('PRICE', db.Float, nullable=True)
    date_of_purchase = db.Column('DATE_OF_PURCHASE', db.DateTime())
    date_of_class = db.Column('DATE_OF_CLASS', db.DateTime(), nullable=True)
    refunded = db.Column('REFUNDED', db.Boolean, default=False)
    number_of_payments = db.Column(
        'NUMBER_OF_PAYMENTS', db.Integer, nullable=True)
    purchased_product = db.Column('Purchased_Product', db.String(50), nullable=True)
    email = db.Column('EMAIL', db.String(50), nullable=True)

    def __repr__(self) -> str:
        return f"{self.id} {self.customer_name}"


class Account(db.Model, BaseModel):
    __tablename__ = 'Account'
    parent_name = db.Column('PARENT_NAME', db.String(50), nullable=True)
    email = db.Column('EMAIL', db.String(20), nullable=True)
    phone = db.Column('PHONE', db.String(20), nullable=True)
    student_name = db.Column('STUDENT_NAME', db.String(50), nullable=True)
    grades = db.Column('GRADES', db.String(255), nullable=True)
    school_name = db.Column('SCHOOL_NAME', db.String(50), nullable=True)
    signup_date = db.Column('SIGNUP_DATE', db.DateTime(), nullable=True)


db.create_all()
