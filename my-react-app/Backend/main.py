from gevent import monkey
monkey.patch_all()

from flask import Flask, jsonify, request, session
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
    password = db.Column(db.String(120), nullable=False)
    public = db.Column(db.Boolean, default=True)

class Portfolios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    user = db.relationship('User', backref=db.backref('portfolios', lazy=True))

class PortfolioItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'), nullable=False)

    type = db.Column(db.String(20), nullable=False)   # "video", "script", "image", "pdf", etc.
    url = db.Column(db.String(300), nullable=False)   # where the file is stored
    title = db.Column(db.String(100), nullable=True)
    description = db.Column(db.String(300), nullable=True)

    portfolio = db.relationship('Portfolios', backref=db.backref('items', lazy=True))

@socketio.on('connect')
def handle_connect(auth):
    print("Successful Connect")
    users = User.query.filter_by(public=True).all()

    user_list = [
        {
            "id": u.id,
            "name": u.name
        }
        for u in users
    ]

    emit('Retrieve_Creators', user_list)

@socketio.on('Login')
def handle_Login(data):
    print(data['user'])
    print(data['password'])
    queredUser = User.query.filter_by(name=data['user']).first()
    if queredUser.password == data['password']:
        print("Successful Login")
        session['user_id'] = queredUser.id

    else:
        print("Login")
    
@socketio.on('Sign_up')
def handle_SignUp(data):
    print(data['username'])
    print(data['password'])

    queredUser = User.query.filter_by(name=data['username']).first()
    if queredUser is None:
        print("Successful sign-Up")
        new_user = User(name=data['username'], password=data['password'], public=True)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id

    else:
        print("Sign-up Failed")
    
@socketio.on("get_portfolio")
def handle_get_portfolio(data):
    # Validate data is a dict with 'id' key
    if not isinstance(data, dict) or 'id' not in data or data['id'] is None:
        print(f"Invalid portfolio request data: {data}")
        emit("Send_Portfolio", None)
        return

    user_id = data['id']
    portfolio = Portfolios.query.filter_by(user_id=user_id).first()

    if portfolio is None:
        emit("Send_Portfolio", None)
        return

    # Get all items belonging to this portfolio
    items = PortfolioItem.query.filter_by(portfolio_id=portfolio.id).all()

    # Serialize items
    item_list = [
        {
            "id": item.id,
            "type": item.type,
            "url": item.url,
            "title": item.title,
            "description": item.description
        }
        for item in items
    ]

    # Serialize portfolio + items
    portfolio_object = {
        "id": portfolio.id,
        "user_id": portfolio.user_id,  # Add user_id so frontend can link to creator
        "name": portfolio.name,
        "description": portfolio.description,
        "items": item_list
    }

    emit("Send_Portfolio", portfolio_object)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    print("I am working")
    socketio.run(app, port=5001, debug=False, use_reloader=False)
