from flask import Flask, request, session
from models import db, User

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/signup", methods=["GET", "POST"])
def registration():
    if request.method == "POST":
        json = request.get_json()
    user = User(
        email=json["email"], password=json["password"], username=json["username"]
    )

    user_db_email = User.query.filter_by(email=user.email).first()
    user_db_email_username = User.query.filter_by(username=user.username).first()
    if len(user.password) < 6:
        return "Password is short"
    if not (user_db_email is None):
        return "Email already saved"
    if not (user_db_email_username is None):
        return "Username is already saved"
    db.session.add(user)
    db.session.commit()
    session.get(user)
    return "Signed up successfully"


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
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


if __name__ == "__main__":
    app.run(debug=True)
