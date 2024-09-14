from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    age = db.Column(db.String(3), nullable=False)
    school=db.Column(db.String(200), nullable=False)
    gender=db.Column(db.String(200), nullable=False)


class task (db.Model):
    id = db.Column(db.Integer,primary_key=True)
    your_work = db.Column (db.String (100), nullable=False) 
    # content = db.Column (db.String (500), nullable = False )
    # deadline = db.Column (db.Boolean) 