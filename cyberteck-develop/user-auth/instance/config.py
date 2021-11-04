import os
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = 'sqlite:///../../cyberteck.db'
DEBUG = True
APP_NAME = 'user-auth-api'
PROPAGATE_EXCEPTIONS = True
JWT_ALGORITHM = 'RS256'
JWT_PRIVATE_KEY = open('key.pem').read()
JWT_PUBLIC_KEY = open('public.pem').read()


SMTP_SERVER = "smtp.gmail.com"
SMTP_USERNAME = "venomdeanace@gmail.com"
SMTP_PORT = 587
SMTP_PASS = ""
CONTACT_RECEIVE_EMAIL= "abc@gmail.com"





# (.env) dot file to read jwt public and private key.
