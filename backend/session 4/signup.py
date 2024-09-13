from flask import Flask,request,session
from app import db
from models import User
from app import app

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
    if len(password)<6 :
        return'password is short'
    if email in session :
        return'You already have an account'
    else:
          return'signed up successfully'
 



