from flask import Flask, request, session, jsonify
from models import db, User, task

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///user.db"
db.init_app(app)

with app.app_context():
    db.create_all()


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
    return "Signed up successfully"


@app.route("/login", methods=["POST"])
def login():
    json3 = request.get_json()
    email = json3["email"]
    json2 = request.get_json()
    password = json2["password"]
    user = User.query.filter_by(email=email).first()
    if user is None:
        return "User not found"
    elif user.password != password:
        return "Incorrect password or email"
    return "Logged in successfully"


@app.route("/search_user", methods=["GET"])
def search():
    json = request.get_json()
    username = json["username"]
    user = User.query.filter_by(username=username).first()
    if not (user is None):
        return jsonify(
            {
                "age": user.age,
                "gender": user.gender,
                "school": user.school,
                "email": user.email,
            }
        )

    else:
        return "user not found"


@app.route("/add_task", methods=["POST"])
def add():
    json = request.get_json()
    work = task(your_work=json["your_work"])
    db.session.add(work)
    db.session.commit()
    return "received"


@app.route("/remove_task", methods=["DELETE"])
def remove_task():
    json = request.get_json()
    task_remove = json["your_work"]
    Task = task.query.filter_by(your_work=task_remove).first()
    if Task:
        db.session.delete(Task)
        db.session.commit()
        return "Task Deleted"
    else:
        return "Not Found"


@app.route("/view_tasks", methods=["GET"])
def view_tasks():
    view_all_tasks = task.query.all()
    tasks = [task.your_work for task in view_all_tasks]
    return jsonify(tasks)


@app.route("/completed_tasks", methods=["PUT"])
def task_completed():
    json = request.get_json()
    complete = json.get("your_work")
    Task = task.query.filter_by(your_work=complete).first()
    if Task:
        Task.completed = True
        db.session.commit()
        return "Task marked as completed"
    else:
        return "task not found"


if __name__ == "__main__":
    app.run(debug=True)
