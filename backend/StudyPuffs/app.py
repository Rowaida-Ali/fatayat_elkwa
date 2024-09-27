from flask import Flask, request, session, jsonify
from models import db, User, Task, Note, Abroad_blogs
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from datetime import timedelta
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
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///databse.db"
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
        access_token = create_access_token(
            identity=email,
            expires_delta=timedelta(weeks=52),
        )
        return jsonify(access_token=access_token), 200
    if not user:
        return jsonify("User not found "), 401
    return jsonify({"msg": "Invalid email or password"}), 401


@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify("Successfully logged out"), 200


@app.route("/delete_account", methods=["DELETE"])
@jwt_required()
def delete_account():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    password = json["password"]
    if user and bcrypt.check_password_hash(user.password_hash, password):
        db.session.delete(user)
        db.session.commit()
        return jsonify("Account deleted"), 200
    else:
        return jsonify("Invalid"), 404


@app.route("/profile", methods=["GET"])
@jwt_required()
def search():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
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
    return jsonify("user not found"), 404


@app.route("/edit_profile", methods=["PUT"])
@jwt_required()
def edit_profile():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    user.age = json["age"]
    user.gender = json["gender"]
    user.school = json["school"]
    db.session.commit()
    return jsonify("updated successfully"), 200


@app.route("/add_task", methods=["POST"])
@jwt_required()
def add():
    current_user_email = get_jwt_identity()
    json = request.get_json()
    user = User.query.filter_by(email=current_user_email).first()
    work = Task(your_work=json["text"], title=json["title"], user_id=user.id)
    db.session.add(work)
    db.session.commit()
    return jsonify("received")


@app.route("/remove_task", methods=["DELETE"])
@jwt_required()
def remove_task():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    title = json["title"]
    task = Task.query.filter_by(title=title, user_id=user.id).first()
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify("Task Deleted")
    return jsonify("Not Found"), 404


@app.route("/edit_task", methods=["PUT"])
@jwt_required()
def edit_tasks():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    your_work = json["text"]
    title = json["title"]
    edit_task = Task.query.filter_by(title=title, user_id=user.id).first()
    if edit_task is None:
        return jsonify("Title not found"), 404
    edit_task.your_work = your_work
    db.session.commit()
    return jsonify("edited"), 200


@app.route("/view_tasks", methods=["GET"])
@jwt_required()
def view_tasks():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    view_all_tasks = Task.query.filter_by(user_id=user.id)
    tasks = [[task.title, task.your_work] for task in view_all_tasks]
    return jsonify(tasks)


@app.route("/completed_task", methods=["PUT"])
@jwt_required()
def task_completed():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    task = Task.query.filter_by(title=json["title"], user_id=user.id).first()
    if task:
        task.completed = True
        db.session.commit()
        return jsonify("Task marked as completed")
    return jsonify("task not found"), 404


@app.route("/take_note", methods=["POST"])
@jwt_required()
def taking_notes():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    note = Note(
        your_note=json["your_note"],
        secret=json["secret"],
        title_notes=json["title"],
        user_id=user.id,
    )
    db.session.add(note)
    db.session.commit()
    return jsonify("Note added")


@app.route("/edit_note", methods=["PUT"])
@jwt_required()
def edit_note():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    title_notes = json["title"]
    note_edited = Note.query.filter_by(title_notes=title_notes, user_id=user.id).first()
    note_edited.your_note = json["your_note"]
    note_edited.secret = json["secret"]
    db.session.commit()
    return jsonify("edited"), 200


@app.route("/get_private_notes", methods=["GET"])
@jwt_required()
def view():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    noted = Note.query.filter_by(secret=True, user_id=user.id)
    notes = [[note.your_note, note.title_notes] for note in noted]
    return jsonify({"your_note": notes})


@app.route("/remove_note", methods=["DELETE"])
@jwt_required()
def remove_note():
    json = request.get_json()
    title_notes = json["title"]
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    note = Note.query.filter_by(title_notes=title_notes, user_id=user.id).first()
    db.session.delete(note)
    db.session.commit()
    return jsonify("Note Deleted"), 200


@app.route("/get_public_notes", methods=["GET"])
def get_notes():
    view_all = Note.query.filter_by(secret=False).all()
    lst = [[note.your_note, note.title] for note in view_all]
    return jsonify({" All the notes": lst})


@app.route("/add_blog", methods=["POST"])
@jwt_required()
def add_blogs():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    blogs = Abroad_blogs(
        university=json["university"],
        country=json["country"],
        blog=json["blog"],
        resources=json["resources"],
        title_blog=json["title"],
        user_id=user.id,
    )
    db.session.add(blogs)
    db.session.commit()
    return jsonify("added")


@app.route("/edit_blogs", methods=["PUT"])
@jwt_required()
def edit():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    title_blog = json["title"]
    blog_edited = Abroad_blogs.query.filter_by(
        title_blog=title_blog, user_id=user.id
    ).first()
    if blog_edited is None:
        return jsonify("Title not found")
    blog_edited.blog = json["blog"]
    blog_edited.university = json["university"]
    blog_edited.resources = json["resources"]
    blog_edited.country = json["country"]
    db.session.commit()
    return jsonify("Edited"), 200


@app.route("/remove_blog", methods=["DELETE"])
@jwt_required()
def remove_blog():
    json = request.get_json()
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    blog_removed = json["blog_removed"]
    removed = Abroad_blogs.query.filter_by(blog=blog_removed, user_id=user.id).first()
    if removed:
        db.session.delete(removed)
        db.session.commit()
        return jsonify("Bloged removed")
    return jsonify("not found"), 404


@app.route("/view_all_blogs", methods=["GET"])
@jwt_required()
def view_blog():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    view_blogs = Abroad_blogs.query.all()
    lst = []
    for blog in view_blogs:
        user_blog = User.query.filter_by(id=blog.user_id).first()
        blogs_view = {
            "username": user_blog.username,
            "title": blog.title,
            "blog": blog.blog,
            "country": blog.country,
            "university": blog.university,
            "resources": blog.resources,
        }
        lst.append(blogs_view)
    return jsonify(lst)


@app.route("/view_my_blogs", methods=["GET"])
@jwt_required()
def my_blogs():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    blogs = Abroad_blogs.query.filter_by(user_id=user.id).all()
    lst = []
    for blog in blogs:
        blogs_view = {
            "username": user.username,
            "title_blog": blog.title,
            "blog": blog.blog,
            "country": blog.country,
            "university": blog.university,
            "resources": blog.resources,
        }
        lst.append(blogs_view)
    return jsonify(lst)


if __name__ == "__main__":
    app.run(debug=True, port=3003)
