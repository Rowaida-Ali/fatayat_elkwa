from flask import Flask, request, session ,jsonify
from models import db, User

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users_data.db"
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route("/signup", methods=["GET", "POST"])
def registration():
    if request.method == "POST":
        json = request.get_json()
    user = User(
        email=json["email"], password=json["password"], username=json["username"], age=json["age"], school=json["school"], gender=json["gender"]
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


@app.route('/search',methods=["GET","POST"])
def search():
    if request.method=="GET":
        json=request.get_json()
        username=json["username"]
    user=User.query.filter_by(username=username).first()
    if not(user is None):
        return jsonify({
            "age":user.age,
            "gender":user.gender,
            "school":user.school,
            "email":user.email,
        })
     
    else:
        return"user not found"    
if __name__ == "__main__":
    app.run(debug=True)        