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
- **Password Hashing** : Bcrypt

## 3. Database:
- **CLASSES :**
    1. class user
    columns:username,password_hash,email,gender,age,school,id
    2. class T
    columns:your_work,completed,user_id,title,id
    3. class Note


## 3.Endpoints:
1. **Sign_up** :
Method : POST ,
Endpoint : `/signup` 

2. **Login** :
Method:POST ,
Endpoint : `/login`

3. **Logout** :
Method : POST ,
Endpoint : `/Logout`

3. **Delete Account** :
Method : DELETE ,
Endpoint : `/delete account`

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
Endpoint:`/completed_tasks`

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