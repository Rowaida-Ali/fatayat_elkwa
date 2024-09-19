from flask import Flask, request, session, jsonify
from models import db, User, Task, Note, Abroad_blogs
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
import jwt

app = Flask(__name__)
CORS(app)
jwt = JWTManager(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///apps.db"
app.config["SECRET_KEY"] = "secret_key"
db.init_app(app)
bcrypt = Bcrypt(app)

with app.app_context():
    db.create_all()


@app.route("/signup", methods=["POST"])
def registration():
    json = request.get_json()
    hashed_password = bcrypt.generate_password_hash(json["password"]).decode("utf-8")
    user = User(
        email=json["email"],
        password_hash=hashed_password,
        username=json["username"],
        age=json["age"],
        school=json["school"],
        gender=json["gender"],
    )
    user_db_email = User.query.filter_by(email=user.email).first()
    user_db_email_username = User.query.filter_by(username=user.username).first()
    if not (user_db_email is None):
        return jsonify("Email already saved"), 409
    if not (user_db_email_username is None):
        return jsonify("Username is already saved "), 409
    db.session.add(user)
    db.session.commit()
    return jsonify("Signed up successfully"), 200


@app.route("/login", methods=["POST"])
def login():
    json = request.get_json()
    email = json["email"]
    password = json["password"]
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid email or password"}), 401


@app.route("/search_user", methods=["GET"])
def search():
    json = request.get_json()
    username = json["username"]
    user = User.query.filter_by(username=username).first()
    if not (user is None):
        return jsonify(
            {
                "username": user.username,
                "age": user.age,
                "gender": user.gender,
                "school": user.school,
                "email": user.email,
            }
        )

    else:
        return jsonify("user not found")


@app.route("/add_task", methods=["POST"])
def add():
    json = request.get_json()
    username = json["username"]
    user = User.query.filter_by(username=username).first()
    work = Task(your_work=json["your_work"], user_id=user.id)
    db.session.add(work)
    db.session.commit()
    return jsonify("received")


@app.route("/remove_task", methods=["DELETE"])
def remove_task():
    json = request.get_json()
    task_remove = json["task_remove"]
    username = json["username"]
    user = User.query.filter_by(username=username).first()
    task = Task.query.filter_by(your_work=task_remove, user_id=user.id).first()
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify("Task Deleted")
    return jsonify("Not Found"), 404


@app.route("/edit_task", methods=["PUT"])
def edit_tasks():
    json = request.get_json()
    username = json["username"]
    your_work = json["your_work"]
    edit_task = Task(your_work=your_work)
    db.session.commit()
    return jsonify("edited")


@app.route("/view_tasks", methods=["GET"])
@jwt_required()
def view_tasks():
    current_user = get_jwt_identity()
    json = request.get_json()
    username = json["username"]
    user = User.query.filter_by(username=username).first()
    view_all_tasks = Task.query.filter_by(user_id=user.id)
    tasks = [task.your_work for task in view_all_tasks]
    return jsonify(tasks)


@app.route("/completed_tasks", methods=["PUT"])
def task_completed():
    json = request.get_json()
    complete = json["completed_tasks"]
    username = json["username"]
    user = User.query.filter_by(username=username).first()
    task = Task.query.filter_by(your_work=complete, user_id=user.id).first()
    if task:
        task.completed = True
        db.session.commit()
        return jsonify("Task marked as completed")
    return jsonify("task not found"), 404


@app.route("/take_note", methods=["POST"])
def taking_notes():
    json = request.get_json()
    username = json["username"]
    user = User.query.filter_by(username=username)
    note = Note(
        your_note=json["your_note"], secret=json["secret"], username=json["username"]
    )
    db.session.add(note)
    db.session.commit()
    return jsonify("Note added")


@app.route("/edit_note", methods=["PUT"])
def edit_note():
    json = request.get_json()
    username = json["username"]
    edit = Task(your_note=json["your_note"], secret=json["secret"])
    user = User.query.filter_by(username=username)
    db.session.add(edit)
    db.session.commit()
    return jsonify("edited")


@app.route("/get_note_name", methods=["GET"])
def view():
    json = request.get_json()
    secret = json["secret"]
    username = json["username"]
    user = User.query.filter_by(username=username).first()
    note = Note.query.filter_by(secret=secret, user_id=user.id)
    if secret == False:
        return jsonify("all your notes")
    return jsonify("not found")


@app.route("/get_all_notes", methods=["GET"])
def get_notes():
    json = request.get_json()
    username = json["username"]
    view_all = Note.query.filter_by(secret=True).all()
    lst = [note.your_note for note in view_all]
    return jsonify({"all your notes": lst})


@app.route("/add_blog", methods=["POST"])
def add_blogs():
    json = request.get_json()
    blogs = Abroad_blogs(
        username=json["username"],
        university=json["university"],
        country=json["country"],
        blog=json["blog"],
        resources=json["resources"],
    )
    db.session.add(blogs)
    db.session.commit()
    return jsonify("added")


@app.route("/edit_blogs", methods=["PUT"])
def edit():
    json = request.get_json()
    blog = json["blog"]
    blog_edited = Abroad_blogs.query.get(blog)
    # blog_edited=json["blog"]
    # db.session.add(blog)
    # db.session.delete(blog_edited)
    db.session.commit()
    return jsonify("Edited")


@app.route("/remove_blog", methods=["DELETE"])
def remove_blog():
    json = request.get_json()
    blog_removed = json["blog_removed"]
    removed = Abroad_blogs.query.filter_by(blog=blog_removed).first()
    if removed:
        db.session.delete(removed)
        db.session.commit()
        return jsonify("Bloged removed")
    return jsonify("not found"), 404


@app.route("/view_all_blogs", methods=["GET"])
def view_blog():
    view_blogs = Abroad_blogs.query.all()
    lst = []
    for blog in view_blogs:
        blogs_view = {
            # 'id' : blog.id,
            "username": blog.username,
            "title": blog.title,
            "blog": blog.blog,
            "country": blog.country,
            "university": blog.university,
            "resources": blog.resources,
        }
        lst.append(blogs_view)
    return jsonify(lst)


@app.route("/view_my_blogs", methods=["GET"])
def my_blogs():
    json = request.get_json()
    username = json["username"]
    blogs = Abroad_blogs.query.filter_by(username=username).all()
    lst = []
    for blog in blogs:
        blogs_view = {
            # 'id' : blog.id,
            "title": blog.title,
            "blog": blog.blog,
            "country": blog.country,
            "university": blog.university,
            "resources": blog.resources,
        }
        lst.append(blogs_view)
    return jsonify(lst)


if __name__ == "__main__":
    app.run(debug=True, port=3003)
