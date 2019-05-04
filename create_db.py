# -*- coding: utf-8 -*-
from app import create_app
from app.model import *

def create_db(app):
    from app import db
    app.app_context().push()
    db.create_all()

if __name__ == '__main__':
    app = create_app('testing')
    create_db(app)
