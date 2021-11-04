from paypalcheckoutsdk.core import PayPalHttpClient, SandboxEnvironment, LiveEnvironment
from application import app
import sys


class PayPalClient:
    def __init__(self):
        self.client_id = app.config['PAYPAL_CLIENT_KEY']
        self.client_secret = app.config['PAYPAL_SECRET_KEY']
        if app.config['ENVIRONMENT'] == 'PRODUCTION':
            self.environment = LiveEnvironment(
                client_id=self.client_id, client_secret=self.client_secret)
        else:
            self.environment = SandboxEnvironment(
                client_id=self.client_id, client_secret=self.client_secret)
        self.client = PayPalHttpClient(self.environment)
