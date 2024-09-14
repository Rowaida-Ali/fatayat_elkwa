from flask import Flask,request ,jsonify
from models import task,db
todo=Flask(__name__)

todo.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///yourtasks.db"
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


@todo.route ("/remove", methods = ["DELETE"])
def remove_task():
    json=request.get_json()
    task_remove= json["your_work"]
    Task = task.query.filter_by(your_work=task_remove).first()
    if Task :
        db.session.delete(Task)
        db.session.commit()
        return "Task Deleted"
    else:
        return "Not Found"

@todo.route("/view", methods = ["GET"])
def view_tasks () :
    view_all_tasks = task.query.all ()
    tasks = [ task.your_work for task in view_all_tasks]
    return jsonify(tasks)

@todo.route ("/completed", methods=["PUT"])
def task_completed ():
    json=request.get_json()
    complete = json.get("your_work")
    Task = task.query.filter_by(your_work=complete).first()
    if Task :
        Task.completed = True
        db.session.commit()
        return "Task marked as completed"
if __name__ == "__main__":
    todo.run(debug=True)        