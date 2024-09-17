from flask import Flask, request, session, jsonify
from models import Note, db, User

app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Your_Notes.db"
# db.init_app(app)

# with app.app_context():
#     db.create_all()


# @app.route("/take_note", methods=["POST"])
# def taking_notes():
#     json = request.get_json()
#     username=json["username"]
#     note = Note(your_note=json["your_note"], secret=json["secret"],user_id=user.id)
#     user = User.query.filter_by(username=username).first()
#     db.session.add(note)
#     db.session.commit()
#     return jsonify("Note added")


# @app.route("/get_note_name", methods=["GET"])
# def view():
#     json = request.get_json()
#     secret = json["secret"]
#     username = json["name"]
#     user = User.query.filter_by(username=username).first()
#     note = Note.query.filter_by(secret=secret,user_id=user.id).first()
#     return jsonify({"all your notes": note.your_note})


# @app.route("/get_all_notes", methods=["GET"])
# def get_notes():
#     json = request.get_json()
#     username = json["name"]
#     view_all = Note.query.filter_by(secret=True).all()
#     lst = [note.your_note for note in view_all]
#     return jsonify({"all your notes": lst})


if __name__ == "__main__":
    app.run(debug=True)
