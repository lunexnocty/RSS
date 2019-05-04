# -*- coding: utf-8 -*-
from app.config import config
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS

db = SQLAlchemy()
login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'home.index'
csrf = CSRFProtect()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    initialize_extensions(app)
    register_blueprints(app)
    return app

def initialize_extensions(app):
    db.init_app(app)
    login_manager.init_app(app)
    #csrf.init_app(app)

def register_blueprints(app):
    from app.api import api
    app.register_blueprint(api, url_prefix='/api')
    CORS(app)
