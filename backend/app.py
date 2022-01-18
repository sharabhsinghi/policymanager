
from flask import Flask
from flask_cors import CORS
from resources.modules import policy
from resources.modules import auth


app = Flask(__name__)
CORS(app)

app.register_blueprint(policy.POLICY)
app.register_blueprint(auth.AUTH)

if __name__ == "__main__":
    app.run(debug=True)

