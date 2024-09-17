from flask import Flask, request, session, jsonify
from models import db, User, Task, Note ,Abroad_blogs
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///databaeworks.db"
db.init_app(app)

with app.app_context():
    db.create_all()

CURRENT_USER = "" 


@app.route("/signup", methods=["POST"])
def registration():
    json = request.get_json()
    user = User(
        email=json["email"],
        password=json["password"],
        username=json["username"],
        age=json["age"],
        school=json["school"],
        gender=json["gender"],
    )

    user_db_email = User.query.filter_by(email=user.email).first()
    user_db_email_username = User.query.filter_by(username=user.username).first()
    if len(user.password) < 6:
        return "Password is short"
    if not (user_db_email is None):
        return "Email already saved"
    if not (user_db_email_username is None):
        return "Username is already saved "
    db.session.add(user)
    db.session.commit()
    session.get(user)
    return jsonify("Signed up successfully")


@app.route("/login", methods=["POST"])
def login():
    json3 = request.get_json()
    email = json3["email"]
    json2 = request.get_json()
    password = json2["password"]
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify("User not found")
    elif user.password != password:
        return jsonify("Incorrect password or email")
    global CURRENT_USER 
    CURRENT_USER = user.username
    return jsonify("Logged in successfully")


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
    # check if current_user == "" --> return jsonify"unauthorized"
    # username = json["username"]
    if CURRENT_USER=="":
        return jsonify("unauthorized")
    user = User.query.filter_by(username=CURRENT_USER).first()
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
    else:
        return jsonify("Not Found")


@app.route("/view_tasks", methods=["GET"])
def view_tasks():
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
    else:
        return jsonify("task not found")


@app.route("/take_note", methods=["POST"])
def taking_notes():
    json = request.get_json()
    username = json["username"]
    note = Note(your_note=json["your_note"], secret=json["secret"], user_id=user.id)
    user = User.query.filter_by(username=username).first()
    db.session.add(note)
    db.session.commit()
    return jsonify("Note added")


@app.route("/get_note_name", methods=["GET"])
def view():
    json = request.get_json()
    secret = json["secret"]
    username = json["name"]
    user = User.query.filter_by(username=username).first()
    note = Note.query.filter_by(secret=secret, user_id=user.id).first()
    return jsonify({"all your notes": note.your_note})


@app.route("/get_all_notes", methods=["GET"])
def get_notes():
    json = request.get_json()
    username = json["name"]
    view_all = Note.query.filter_by(secret=True).all()
    lst = [note.your_note for note in view_all]
    return jsonify({"all your notes": lst})


@app.route('/add_blog',methods=["POST"])
def add_blogs():
    json=request.get_json()
    blogs= Abroad_blogs( username=json["username"],university=json["university"],country=json["country"],blog=json["blog"],resources=json["resources"])
    db.session.add(blogs)
    db.session.commit()
    return jsonify("added")

@app.route('/edit_blogs', methods=["PUT"])
def edit():
    json=request.get_json()
    # blog=json["blog"]
    blog_edited=Abroad_blogs( blog=json["blog"] )
    db.session.add(blog_edited)
    db.session.commit()
    return"done"
    

@app.route("/remove_blog", methods=["DELETE"])
def remove_blog():
    json=request.get_json()
    blog_removed=json["blog_removed"]
    removed=Abroad_blogs.query.filter_by(blog=blog_removed).first()
    if removed:
        db.session.delete(removed)
        db.session.commit()
        return jsonify("task removed")
    else:
        return jsonify("not found")
if __name__ == "__main__":
    app.run(debug=True, port=3003)




# add username to class abroad_blogs, add country, university, blog, resources, username
# /add_blog 
# /edit_blog
# /remove_blog
# /logout
# /delete_account 


# Study Groups
