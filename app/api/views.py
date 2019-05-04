# -*- coding: utf-8 -*-

from . import api
from ..model import User
from flask import request, jsonify
from .. import db

@api.route('/', methods=['GET', 'POST'])
def index():
    return 'Welcome to use this API of Radiative Source Manager System'

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(force=True)
    print('signup<at views.py line 15>:', data)
    role_id = 3 if 'role_id' not in data.keys() else data['role_id']
    status = 'failed'
    info = 'no infomation'
    if User.query.filter_by(username=data['username']).count():
        print('signup<at views.py line 20>:', data)
        status = 'failed'
        info = 'the username has already been taken.'
    elif User.query.filter_by(email=data['email']).count():
        status = 'failed'
        info = 'the email has already been taken.'
    else:
        try:
            user = User(data['username'], data['password'], data['email'], role_id)
            db.session.add(user)
            db.session.commit()
            status = 'success'
            info = 'thanks for signing up.'
        except:
            status = 'failed'
            info = 'some error has occured, please try again.'
    response = {
        'status': status,
        'info': info
    }
    return jsonify(response)

@api.route('/signin', methods=['POST'])
def signin():
    data = request.get_json(force=True)
    users = None
    status = 'failed'
    userdata = None
    info = 'no information'
    if 'username' in data.keys() or 'email' in data.keys():
        if 'username' in data.keys():
            users = User.query.filter_by(username=data['username'])
            info = 'there is no user named %s, please check your username' % data['username']
        elif 'email' in data.keys():
            users = User.query.filter_by(email=data['email'])
            info = 'there is no user signed up with %s, please check your email' % data['email']
        user = users.first() if users else None
        if user:
            if user.CheckPassword(data['password']):
                status = 'success'
                userdata = {
                    "username": user.username,
                    "avatar": user.avatar,
                    "role_id": user.role_id
                }
                info = 'welcome, ' + user.username
            else:
                status = 'failed'
                info = 'your username or email does not match your password.'
        else:
            status = 'failed'
    else:
        status = 'failed'
        info = 'no data received.'
    response = {
        "status": status,
        "user": userdata,
        "info": info
    }
    return jsonify(response)

