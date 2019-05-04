#-*- coding: utf-8 -*-
import os

BASEDIR = os.path.abspath(os.path.dirname(__file__))
HOST = "localhost"
PORT = "5432"
DATABASE = "rsms"
USERNAME = "postgres"
PASSWORD = "radiative.cn"
CHARSET = "utf8"
DB_URI = 'postgresql://%s:%s@%s:%s/%s' % (USERNAME, PASSWORD, HOST, PORT, DATABASE)

SQLITE = 'sqlite:////mnt/c/Users/lunex/project/RSMS/data/RSMS.db'

class BaseConfig:
    SECRET_KEY = 'radiative.cn'

class DevelopmentConfig(BaseConfig):
    # DEBUG = True
    CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = SQLITE
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True

class TestingConfig(BaseConfig):
    TESTING = True
    CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = DB_URI

class ProductionCOnfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = DB_URI
    CSRF_ENABLED = True

config = {
    'develop': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionCOnfig
}
