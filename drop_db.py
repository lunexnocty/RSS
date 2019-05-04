# -*- coding: utf-8 -*-
from app import create_app

def drop_db(myapp):
    from app import db
    myapp.app_context().push()
    db.drop_all()

if __name__ == '__main__':
    application = create_app('testing')
    drop_db(application)
