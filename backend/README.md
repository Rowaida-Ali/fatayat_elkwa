# StudyPuffs
A Study Help website 
Backend Documentation for StudyPuffs

## 1.Project Description:
- **Sign up and Login page**: To store all the data of user.

- **Logout** : to logout 

- **Delete Account** : to delete account 

- **Profile & Edit profile** : user's profile (username, age, gender , school , email) , can edit (username,age,school,gender)

- **To_do lsit**: List for students to manage their tasks and  it has many routes (Add,Remove,View,edit,Complete).

- **Notes** : Students can write notes public or private , ( add note , edit , remove, get all private notes , get all public note)

- **Study Abroad**: To share experience by add blogs also can edit , remove , view all and view user's blogs 

## 2. Technologies Used:
- **Framework** : Flask
- **Database** : SQlite 
- **ORM** : SQlAlchemy
- **Authentication** : JWT
- **Password Hashing** : Bcrypt for protection

## 3. Database:
- **CLASSES :**
    1. class User model : to store user data , information
    columns:username,password_hash,email,gender,age,school,id
    2. class Task model : 
    columns:your_work,completed,user_id,title,id
    3. class Note model : 
    columns : user_id , your_note , title_notes , id  , secret
    4. class Abroad_blogs model : 
    columns : user_id , university , title_blog , id  , country , blog 
    5. Model relations :
    - tasks : user can have tasks , one-to-many relationship which is by `user_id`
    ```
    tasks = db.relationship ("Task", backref="User" primaryjoin="User.id == Task.user_id" )
    ```
    - notes : user can create and have notes (public/private ) , one-to-many relationship which is by `user_id`
    ```
    notes = db.relationship("Note", backref="User", primaryjoin="User.id == Note.user_id" )
    ```
    - abroad blogs : users can share their experiences 
    ```
    abroad = db.relationship("Abroad_blogs", backref="User", primaryjoin="User.id == Abroad_blogs.user_id")
    ```
    6. Methods used : 
    - set password : hashes password using `bcrypt` 
    - check password : compares the password to the hashed password in the database for security (authentication)

## 4.Endpoints:
1. **Sign_up** :
Method : POST ,
Endpoint : `/signup` 

2. **Login** :
Method:POST ,
Endpoint : `/login`

3. **Logout** :
Method : POST ,
Endpoint : `/logout`

3. **Delete Account** :
Method : DELETE ,
Endpoint : `/delete_account`

4. **Search** :
Method : GET ,
Endpoint : `/profile`

3. **Edit Profile** :
Method : PUT ,
Endpoint : `/edit_profile`

- **TO_DO LIST Endpoints**:
1. **Add**:
Method:POST ,
Endpoint: `/add_task`
2. **Remove**:
Method:DELETE ,
Endpoint:`/remove_task`
3. **Edit** :
Method:PUT ,
Endpoint:`/edit_task`
4. **View**:
Method:GET ,
Endpoint:`/view_tasks`
5. **Completed**:
Method:PUT ,
Endpoint:`/completed_task`

- **Notes Endpoints**:
1. **Add**:
Method:POST ,
Endpoint: `/take_note`
2. **Edit** :
Method:PUT ,
Endpoint:`/edit_note`
3. **Get notes name** :
Method:GET ,
Endpoint:`/get_private_notes`
4. **Remove**:
Method:DELETE ,
Endpoint:`/remove_note`
5. **Get All**:
Method:GET ,
Endpoint:`/get_public_notes`

- **Study Abroad Endpoints**:
1. **Add**:
Method:POST ,
Endpoint: `/add_blog`
2. **Edit** :
Method:PUT ,
Endpoint:`/edit_blogs`
3. **Remove**:
Method:DELETE ,
Endpoint:`/remove_blog`
4. **View All**:
Method:GET ,
Endpoint:`/view_all_blogs`
5. **View My**:
Method:GET ,
Endpoint:`/view_my_blogs`

## 5.Installation: 
1. clone the repositry 
2. open backend folder 
3. run or ```flask run`` in the terminal
4. the backend will be running on  : ` http://127.0.0.1:3003`

## 6.How to test by postman: 
1. Download Postman or visit `https://www.postman.com/`
2. test endpoints and send requests 
    - put the method (PUT,DELETE,POST,GET) , URL , body and send for response 