
from flask import Flask
from resources.modules import policy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(policy.POLICY)


if __name__ == "__main__":
    app.run(debug=True)

