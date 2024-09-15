from flask import Flask,request,session,jsonify
from models import Note,db

notes = Flask(__name__)

notes.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Your_Notes.db"
db.init_app(notes)

with notes.app_context():
    db.create_all()

@notes.route('/take_note',methods=["POST"])
def taking_notes():
    # if request.method=="POST":
    json=request.get_json()
    note=Note(
    your_note=json["your_note"]  ,secret=json["secret"] , name=json["name"]
        )   
    db.session.add(note)
    db.session.commit()
    return "note added"

@notes.route('/get_note_name',methods=["GET"])
def view():
    json=request.get_json() 
    secret=json["secret"]
    name=json["name"]
    note=Note.query.filter_by(name=name).first()
    note1=Note.query.filter_by(secret=secret).first()
    view_all=Note.query.all()
    # if note1==False:
    return jsonify({
        "all your notes":note.your_note
    })

@notes.route('/get_all_notes',methods=["GET"])
def get_notes():
    view_all=Note.query.all()
    print(view_all)
    # if note1==False:
    lst = [note.your_note for note in view_all]
    return jsonify({
        "all your notes":lst
    })
    # return note.your_note

if __name__ == "__main__":
    notes.run(debug=True)     