from gevent import monkey
monkey.patch_all()

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy


#psql -U postgres -p 4000
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode ="gevent")

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:676767@localhost:4000/sparkhacksdb"

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    isCreator = db.Column(db.Boolean, default=False, nullable=False)

@socketio.on('connect')
def handle_connect(auth):
    print("Successful Connect")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    print("I am working")
    socketio.run(app, port=5001, debug=False, use_reloader=False)
