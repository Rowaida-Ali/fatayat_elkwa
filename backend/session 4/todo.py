from flask import Flask,request
from models import task,db
todo=Flask(__name__)

todo.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///yourtask.db"
db.init_app(todo)

with todo.app_context():
    db.create_all()

@todo.route("/add_your",methods=["GET","POST"])
def add():
    if request.method=="POST":
        json=request.get_json()
        work = task(
            your_work=json["your_work"]
            )
        db.session.add(work)
        db.session.commit()
        return "received"




if __name__ == "__main__":
    todo.run(debug=True)        