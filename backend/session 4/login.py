from flask import Flask,request,session
from app import app
@app.route('/login',methods=['GET','POST'])
def login():
    json3=request.get_json()
    email=json3["email"]     
    json2=request.get_json()
    password=json2["password"]
    if password not in session and email not in session or password not in session or email not in session:
        return 'sth went wrong'
    else:
        return 'You are successfully logged in'


if __name__=='__main__':
    app.run(debug=True)










