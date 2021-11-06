from datetime import datetime
from flask_seeder import Seeder, Faker, generator

class OrderSeeder(Seeder):
    # run() will be called by Flask-Seeder
    def run(self):
        from application.models import Order
        # Create a new Faker and tell it how to create User objects
        faker = Faker(
            cls=Order,
            init={
                "customer_name": generator.Name(),
                "price": generator.Integer(start=20, end=100),
                "date_of_purchase": datetime.utcnow(),
                "date_of_class": datetime.utcnow(),
                "refunded": False,
                "number_of_payments": generator.Integer(start=20, end=100),
                "purchased_product": generator.Name(),
            }
        )
        for order in faker.create(5):
            print("Adding Order: %s" % order)
            self.db.session.add(order)


class AccountSeeder(Seeder):
    # run() will be called by Flask-Seeder
    
    def run(self):
        from application.models import Account
        # Create a new Faker and tell it how to create User objects
        faker = Faker(
            cls=Account,
            init={
                "parent_name": generator.Name(),
                "student_name": generator.Name(),
                "phone": generator.Integer(start=20, end=100),
                "signup_date": datetime.utcnow(),
            }
        )
        for account in faker.create(5):
            print("Adding Account: %s" % account)
            self.db.session.add(account)