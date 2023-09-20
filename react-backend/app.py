from flask import Flask,render_template,request,jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
from flask_login import login_user, logout_user, current_user, login_required
app=Flask(__name__)

client = MongoClient('mongodb+srv://syedkhajahussain2k:Ka1602105262$@cluster0.5yit4iu.mongodb.net/')
db=client['flaskreactfullstack']

CORS(app)
class Task(db.Document):
    title = db.StringField(required=True)
    description = db.StringField()
    owner = db.ReferenceField(User)  # Reference to the user who owns the task
@app.route('/login', methods=['POST'])
def login():
    # Validate user credentials (e.g., username and password)
    username = request.json.get('username')
    password = request.json.get('password')

    # Check credentials in your database (query the User model)
    # If credentials are valid, login the user
    if valid_credentials(username, password):
        user = User(user_id=1, username=username, password_hash='hashed_password')
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'}), 200

@app.route('/tasks',methods=['POST','GET'])
def data():

    if request.method=='POST':
        body=request.json
        task=body['task']

        db['users'].insert_one({
            "task":task
        })

        return jsonify({
            'status':'Data is suucessfully posted',
            'task':task
        })
    
    if request.method=='GET':
        allTask=db['users'].find()
        taskJson=[]
        for task in allTask:
            id=task['_id']
            task=task['task']
            taskDict={
                'id':str(id),
                'task':task
            }
            taskJson.append(taskDict)
        print(taskJson)
        return jsonify(taskJson)
    
@app.route('/tasks/<string:id>',methods=['GET','PUT','DELETE'])
def oneData(id):
    if request.method=='GET':
        data=db['users'].find_one({"_id":ObjectId(id)})
        id=data['_id']
        task=data['task']

        taskDict={
            'id':str(id),
            'task':task
        }

        return jsonify(taskDict)
    if request.method=='DELETE':
        db['users'].delete_many({"_id":ObjectId(id)})
        return jsonify({
            'status':'Data id:'+ id + 'is deleted'
        })
    if request.method=='PUT':
        body=request.json
        task=body['task']

        db['users'].update_one(
            {'_id':ObjectId(id)},
            {
                "$set":{
                    'task':task
                }
            }
        )

        return jsonify({
            'status':'the task with '+id+' is successfully updated'
        })


if __name__=='__main__':
    app.run(debug=True)