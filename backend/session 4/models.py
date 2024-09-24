from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, declarative_base, sessionmaker
from sqlalchemy import Integer, ForeignKey, Column
from flask_bcrypt import Bcrypt


db = SQLAlchemy()
Bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    age = db.Column(db.String(3), nullable=False)
    school = db.Column(db.String(200), nullable=False)
    gender = db.Column(db.String(200), nullable=False)
    tasks = db.relationship(
        "Task", backref="User", primaryjoin="User.id == Task.user_id"
    )
    notes = db.relationship(
        "Note", backref="User", primaryjoin="User.id == Note.user_id"
    )
    abroad = db.relationship(
        "Abroad_blogs", backref="User", primaryjoin="User.id == Abroad_blogs.user_id"
    )

    def set_password(self, password):
        self.password_hash = Bcrypt.generate_password_hash(password).decode("utf-8")

    def check(self, password):
        return Bcrypt.check_password_hash(self.password_hash, password)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    your_work = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.BOOLEAN, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"))
    title = db.Column(db.String(150))


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    your_note = db.Column(db.Text)
    secret = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"))
    title_notes = db.Column(db.String(150))


class Abroad_blogs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(50))
    university = db.Column(db.String(100))
    blog = db.Column(db.Text(5000))
    resources = db.Column(db.String(200))
    title_blog = db.Column(db.String(150))
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"))

