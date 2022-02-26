from flask import Blueprint, request, jsonify
from resources.utils import connection, config
from  werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import json


AUTH = Blueprint("auth", __name__)


@AUTH.route('/login', methods=['POST'])
def login_user():
    data = json.loads(request.data)
    username = data.get('username')
    password = data.get('password')
    result = connection.execute_select_command("select * from users where \"user_name\"=%(value)s", {"value": username})
    if result:
        user = result[0]
        if check_password_hash(user['user_password'], password):
            # generates the JWT Token
            token = jwt.encode({
                'user_id': user['user_id'],
                'exp': datetime.utcnow() + timedelta(minutes = 30)
            }, config.SECRET_KEY)
    
            return jsonify({'token': token}), 201

    return jsonify({'message' : 'Unauthorized !!'}), 401
    

@AUTH.route('/signup', methods=['POST'])
def signup_user():
    data = json.loads(request.data)
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    password_copy = data.get('password_copy')

    if password != password_copy:
        return jsonify({'message' : 'Passwords do not Match !!'}), 501

    hashed_password = generate_password_hash(password)

    insert_statement = """INSERT INTO users 
    ("user_name", "user_password", "user_email") 
    values %(values)s returning "user_id" """
    values = (username, hashed_password, email)
    result = connection.execute_insert_command(insert_statement, {"values": values})
    res = True if result else False
    return json.dumps(res)
    

