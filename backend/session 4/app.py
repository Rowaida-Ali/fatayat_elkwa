from flask import Flask,request,session
from models import db , User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/registration',methods=['GET','POST'])
def registration():
    if request.method=='POST':
        json=request.get_json()
        username=json["username"]
        json2=request.get_json()
        password=json2["password"]
        json3=request.get_json()
        email=json3["email"]
    user=User(
         email=json["email"],
         password=json["password"],
         username=json["username"]
     )
 
    db.session.add(user)
    db.session.commit()
    session.get(user)
    if len(password)<6 :
        return'password is short'
    # user=User.query.filter_by(email=email).first()
    # if not (user is None):
    #     return 'Email is already saved' 
    else:
          return'signed up successfully'
    

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method=="POST":
        json3=request.get_json()
        email=json3["email"]     
        json2=request.get_json()
        password=json2["password"]
    user=User.query.filter_by(email=email).first()
    if user is None:
        return 'incorrect email'
    if user.password!=password:
        return 'incorrect password'
    return 'logged in'
if __name__=='__main__':
    app.run(debug=True)


    