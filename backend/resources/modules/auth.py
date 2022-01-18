from flask import Blueprint, request, jsonify, make_response
from resources.utils import connection, utilities, config
from  werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import json


POLICY = Blueprint("policy", __name__)


@POLICY.route('/login', methods=['POST'])
def login_user():
    username = request.form.get('username')
    password = request.form.get('password')
    result = connection.execute_select_command("select * from users where \"user_name\"='%(value)s'", {"value": username})
    print(result)
    if result:
        user = result[0]
        if check_password_hash(user['password'], password):
            # generates the JWT Token
            token = jwt.encode({
                'user_id': user['user_id'],
                'exp': datetime.utcnow() + timedelta(minutes = 30)
            }, config.SECRET_KEY)
    
            return make_response(jsonify({'token': token.decode('UTF-8')}), 201)
    else:
        raise Exception("Unauthorized")
    
    return json.dumps(result, default=utilities.datetime_handler)

