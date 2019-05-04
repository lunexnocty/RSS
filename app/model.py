#-*- coding: utf-8 -*-

from app import db, login_manager
from geoalchemy2 import Geometry
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), default=3, nullable=False)
    username = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    phone = db.Column(db.Text, unique=True)
    avatar = db.Column(db.Text)
    credit = db.Column(db.Integer)
    idcard = db.Column(db.Text, unique=True)
    realname = db.Column(db.Text)
    update_time = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    extra = db.Column(db.Text)
    radiations = db.relationship('Radiation', backref=db.backref('user'), lazy='select')

    def __init__(self, username, password, email, role_id=3):
        self.username = username
        self.password = self.Encrypt(password)
        self.email = email
        self.avatar = self.GetAvatar(50)
        self.update_time = datetime.utcnow()
        self.role_id = role_id

    def GetAvatar(self, size):
        from hashlib import md5
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/%s?d=identicon&s=%s' % (digest, size)

    def Encrypt(self, password):
        return generate_password_hash(password)
    
    def CheckPassword(self, password):
        return check_password_hash(self.password, password)
    
    def __repr__(self):
        return "<User(username='%r')>" % self.username

class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    permission = db.Column(db.Text)
    update_time = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    extra = db.Column(db.Text)
    users = db.relationship('User', backref=db.backref('role'), lazy='select')

    def __init__(self, name, permission):
        self.name = name
        self.permission = permission
        self.update_time = datetime.utcnow()

    def __repr__(Self):
        return "<Role(name='%r')>" % self.name

class Radiation(db.Model):
    __tablename__ = 'radiation'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    activity = db.Column(db.Float, nullable=False)
    governor = db.Column(db.Integer, db.ForeignKey('user.id'))
    terminal = db.Column(db.Integer, db.ForeignKey('rst.id'))
    enable = db.Column(db.Boolean, default=False)
    update_time = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    extra = db.Column(db.Text)

    def __init__(self, name, level, activity):
        self.name = name
        self.level = level
        self.activity = activity
        self.enable = False
        self.update_time = datetime.utcnow()
    
    def __repr__(self):
        return "<Radiation(id='%r', name='%r')>" % (self.id, self.name)

class Status(db.Model):
    __tablename__ = 'status'
    id = db.Column(db.Integer, primary_key=True)
    terminal = db.Column(db.Integer, db.ForeignKey('rst.id'), nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    activity = db.Column(db.Float, nullable=False)
    coordinate = db.Column(Geometry('POINT'))
    radiation_status = db.Column(db.Text)
    terminal_status = db.Column(db.Text)
    battery = db.Column(db.Float)
    locked = db.Column(db.Boolean)
    update_time = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    extra = db.Column(db.Text)

    def __init__(self, terminal, time, activity, coordinate, radiation_status, terminal_status, battery, locked, extra=""):
        self.terminal = terminal
        self.time = time
        self.activity = activity
        self.coordinate = 'POINT((%s, %s))' % (coordinate[0], coordinate[1])
        self.radiation_status = radiation_status
        self.terminal_status = terminal_status
        self.battery = battery
        self.locked = locked
        self.update_time = datetime.utcnow()
        self.extra = extra

    def __repr__(self):
        return "<Status(id='%r', time='%r')>" % (self.id, self.time)

class RST(db.Model):
    __tablename__ = 'rst'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True)
    enable = db.Column(db.Boolean, default=False)
    baseActivity = db.Column(db.Float)
    maxActivity = db.Column(db.Float)
    minActivity = db.Column(db.Float)
    update_time = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    extra = db.Column(db.Text)
    statuses = db.relationship('Status', backref=db.backref('rst'), lazy='select')
    radiation = db.relationship('Radiation', backref=db.backref('rst'), lazy='select')

    def __init__(self, name):
        self.name = name
        self.update_time = datetime.utcnow()
    
    def __repr__(self):
        return "<RST(id='%r', name='%r')>" % (self.id, self.name)

class Log(db.Model):
    __tablename__ = 'log'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, nullable=False)
    actions = db.Column(db.Text, nullable=False)
    update_time = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
    extra = db.Column(db.Text)

    def __init__(self, time, actions, extra=""):
        self.time = time
        self.actions = actions
        self.update_time = datetime.utcnow()
        self.extra = extra
    
    def __repr__(self):
        return "<Log(id='%r', time='%r')>" % (self.id, self.name)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
