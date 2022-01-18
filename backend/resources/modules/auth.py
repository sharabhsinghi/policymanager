from flask import Blueprint, request, jsonify, make_response
from resources.utils import connection, utilities, config
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
    print(result)
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
    

