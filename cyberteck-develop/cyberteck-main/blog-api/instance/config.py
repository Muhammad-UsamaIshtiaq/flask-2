import os
SQLALCHEMY_TRACK_MODIFICATIONS = False
#SQLALCHEMY_ENGINE_OPTIONS = {'pool_size' : 5, 'pool_recycle' : 25 }
SQLALCHEMY_DATABASE_URI = 'sqlite:///../../cyberteck.db'
DEBUG = True
APP_NAME = 'blog-api'
PROPAGATE_EXCEPTIONS = True
JWT_ALGORITHM = 'RS256'
JWT_PUBLIC_KEY = open('public.pem').read()





# (.env) dot file to read jwt public and private key.
