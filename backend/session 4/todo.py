from flask import Flask,request,session
from models import task,db
todo=Flask(__name__)

todo.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///task.db"
db.init_app(todo)

with todo.app_context():
    db.create_all()

@todo.route("/add",methods=["GET","POST"])
def add():
    if request.method=="POST":
        json=request.get_json()
        # add =json["add"]
        work = task(
            add=json["add"]
            )
    db.session.add(add)
    db.session.commit()
    session.get(work)
    return "received"




if __name__ == "__main__":
    todo.run(debug=True)        