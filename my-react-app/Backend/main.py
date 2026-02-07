from gevent import monkey
monkey.patch_all()

from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
import secrets



#psql -U postgres -p 4000
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode ="gevent")

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:676767@localhost:4000/sparkhacksdb"

db = SQLAlchemy(app)

followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    public = db.Column(db.Boolean, default=True)
    token = db.Column(db.String(100), unique=True, nullable=True)
    
    preferences = db.Column(db.String(100), default="General")
    ArtistType = db.Column(db.String(100), default="Viewer")
    followers_count = db.Column(db.Integer, default=0)

    following = db.relationship(
    'User',
    secondary=followers,
    primaryjoin=id == followers.c.follower_id,
    secondaryjoin=id == followers.c.followed_id,
    backref='followers'
    )

    

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
            "name": u.name,
            "ArtistType": u.ArtistType,
            "Followers": u.followers_count
        }
        for u in users
    ]

    emit('Retrieve_Creators', user_list)

@socketio.on('Login')
def handle_Login(data):
    print(data['user'])
    print(data['password'])
    queredUser = User.query.filter_by(name=data['user']).first()

    if queredUser is None:
        print("Login Failed: User not found")
        emit("Login_failed", "User not found")
        return


    if queredUser.password == data['password']:
        print("Successful Login")
        session['user_id'] = queredUser.id
        emit("Login_success", queredUser.token)

    else:
        print("Login")
    
@socketio.on('Sign_up')
def handle_SignUp(data):
    print(data['username'])
    print(data['password'])

    queredUser = User.query.filter_by(name=data['username']).first()
    if queredUser is None:
        print("Successful sign-Up")
        new_user = User(name=data['username'], password=data['password'], public=True, token = generate_token())
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        #Signing up
        emit("Sign_up_success", new_user.token)

    else:
        emit("Sign_up_error", "Sign-up Failed")
        print("Sign-up Failed")
    
@socketio.on("get_portfolio")
def handle_get_portfolio(data):
    user_id = data['id']
    portfolio = Portfolios.query.filter_by(user_id=user_id).first()

    if portfolio is None:
        emit("Retrieve_Portfolios", None)
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
        "name": portfolio.name,
        "description": portfolio.description,
        "items": item_list
    }

    emit("Send_Portfolio", portfolio_object)

@socketio.on("follow_user")
def handle_follow_user(data):

    follower_id = data["follower_id"]
    followed_id = data["followed_id"]

    follower = User.query.get(follower_id)
    followed = User.query.get(followed_id)

    if follower is None or followed is None:
        emit("follow_failed", "Invalid user IDs")
        return

    # Prevent duplicates
    if followed not in follower.following:
        follower.following.append(followed)
        followed.followers_count += 1
        db.session.commit()



    follower.following.append(followed)
    db.session.commit()

#generate the token
def generate_token():
    return secrets.token_urlsafe(32)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    print("I am working")
    socketio.run(app, port=5001, debug=False, use_reloader=False)
