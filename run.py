# -*- coding: utf-8 -*-
from app import create_app

def create_db(myapp):
    from app import db
    myapp.app_context().push()
    db.create_all()

def drop_db(myapp):
    from app import db
    myapp.app_context().push()
    db.drop_all()

if __name__ == '__main__':
    application = create_app('develop')
    application.run(host="0.0.0.0", port=3389,debug=True)
