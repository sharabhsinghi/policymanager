from functools import wraps
import jwt
from flask import jsonify, request
from resources.utils import config


# decorator for verifying the JWT
def authorize(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, config.SECRET_KEY, algorithms=['HS256'])
            current_user = data["user_id"]
        except Exception as ex:
            print(ex)
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401

        kwargs['user_id'] = current_user
        # returns the current logged in users contex to the routes
        return f(*args, **kwargs)
  
    return decorated
