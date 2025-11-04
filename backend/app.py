import os
import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
import random

# --- App Initialization ---
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# --- Database Configuration ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'market.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-super-secret-key'  # Change this in production

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# --- Database Models ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='Farmer') # Roles: 'Admin', 'Farmer'

class MarketData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    author = db.relationship('User', backref=db.backref('posts', lazy=True))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    author = db.relationship('User', backref=db.backref('comments', lazy=True))
    post = db.relationship('Post', backref=db.backref('comments', lazy=True))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

# --- Helper Functions ---

def is_admin():
    """Checks if the current JWT identity has an 'Admin' role."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return user and user.role == 'Admin'

# --- 1. Authentication Endpoints ---

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password, role=data.get('role', 'Farmer'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully", "userId": new_user.id}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=str(user.id))
        return jsonify(token=access_token, role=user.role), 200
    return jsonify({"message": "Invalid credentials"}), 401

# --- 2. Admin Dashboard Endpoints ---

@app.route('/api/market-data', methods=['POST'])
@jwt_required()
def add_market_data():
    if not is_admin():
        return jsonify({"message": "Admin access required"}), 403
    data = request.get_json()
    date_obj = datetime.datetime.strptime(data['date'], '%Y-%m-%d').date()
    new_entry = MarketData(name=data['name'], price=data['price'], date=date_obj)
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({"message": "Market data added successfully", "entryId": new_entry.id}), 201

@app.route('/api/market-data/<int:id>', methods=['PUT'])
@jwt_required()
def update_market_data(id):
    if not is_admin():
        return jsonify({"message": "Admin access required"}), 403
    data = request.get_json()
    entry = MarketData.query.get_or_404(id)
    entry.price = data.get('price', entry.price)
    db.session.commit()
    return jsonify({"message": "Market data updated successfully"}), 200

@app.route('/api/market-data/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_market_data(id):
    if not is_admin():
        return jsonify({"message": "Admin access required"}), 403
    entry = MarketData.query.get_or_404(id)
    db.session.delete(entry)
    db.session.commit()
    return jsonify({"message": "Market data deleted successfully"}), 200

@app.route('/api/market-data/stats', methods=['GET'])
@jwt_required()
def get_market_stats():
    if not is_admin():
        return jsonify({"message": "Admin access required"}), 403
    total_entries = MarketData.query.count()
    avg_price = db.session.query(db.func.avg(MarketData.price)).scalar()
    return jsonify({"totalEntries": total_entries, "averagePrice": round(avg_price, 2) if avg_price else 0}), 200

# --- 3. Farmer Dashboard Endpoints ---

@app.route('/api/market-prices', methods=['GET'])
@jwt_required()
def get_market_prices():
    search_query = request.args.get('search', '')
    today = datetime.date.today()
    # Get the latest entry for each vegetable/fruit for today
    subquery = db.session.query(
        MarketData.name,
        db.func.max(MarketData.id).label('max_id')
    ).filter(MarketData.date == today).group_by(MarketData.name).subquery()

    query = db.session.query(MarketData).join(
        subquery, MarketData.id == subquery.c.max_id
    )
    
    if search_query:
        query = query.filter(MarketData.name.ilike(f'%{search_query}%'))
        
    prices = query.all()
    
    output = [{"id": p.id, "name": p.name, "price": p.price, "lastUpdated": p.date.isoformat()} for p in prices]
    return jsonify(output), 200


# --- 4. Data Visualization Endpoints ---

@app.route('/api/price-trends/<item_name>', methods=['GET'])
@jwt_required()
def get_price_trends(item_name):
    # Simulate 7 days of data for the chart
    price_data = []
    today = datetime.date.today()
    for i in range(7):
        date = today - datetime.timedelta(days=i)
        # In a real app, you would query your DB. Here we simulate for demo.
        price = random.uniform(80.0, 150.0) 
        price_data.append({"date": date.isoformat(), "price": round(price, 2)})
    return jsonify(sorted(price_data, key=lambda x: x['date'])), 200

@app.route('/api/price-comparison', methods=['GET'])
@jwt_required()
def get_price_comparison():
    items = request.args.get('items', '').split(',')
    if not items or items == ['']:
        return jsonify({"message": "Please provide items to compare"}), 400
    
    comparison_data = {}
    today = datetime.date.today()
    for item in items:
        item_trends = []
        for i in range(7):
            date = today - datetime.timedelta(days=i)
            price = random.uniform(70.0, 160.0) # Simulate data
            item_trends.append({"date": date.isoformat(), "price": round(price, 2)})
        comparison_data[item] = sorted(item_trends, key=lambda x: x['date'])
        
    return jsonify(comparison_data), 200


# --- 7. Community Forum Endpoints ---

# Posts
@app.route('/api/forum/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_post = Post(title=data['title'], content=data['content'], user_id=user_id)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created successfully", "postId": new_post.id}), 201

@app.route('/api/forum/posts', methods=['GET'])
@jwt_required()
def get_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    output = []
    for post in posts:
        user = User.query.get(post.user_id)
        output.append({
            "id": post.id,
            "title": post.title,
            "author": user.username,
            "createdAt": post.created_at.isoformat()
        })
    return jsonify(output), 200

@app.route('/api/forum/posts/<int:id>', methods=['PUT'])
@jwt_required()
def update_post(id):
    post = Post.query.get_or_404(id)
    user_id = get_jwt_identity()
    if post.user_id != user_id and not is_admin():
        return jsonify({"message": "Not authorized to edit this post"}), 403
    data = request.get_json()
    post.content = data.get('content', post.content)
    post.title = data.get('title', post.title)
    db.session.commit()
    return jsonify({"message": "Post updated successfully"}), 200

@app.route('/api/forum/posts/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_post(id):
    post = Post.query.get_or_404(id)
    user_id = get_jwt_identity()
    if post.user_id != user_id and not is_admin():
        return jsonify({"message": "Not authorized to delete this post"}), 403
    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted successfully"}), 200

# Comments
@app.route('/api/forum/posts/<int:id>/comments', methods=['POST'])
@jwt_required()
def add_comment(id):
    post = Post.query.get_or_404(id)
    data = request.get_json()
    user_id = get_jwt_identity()
    new_comment = Comment(content=data['content'], user_id=user_id, post_id=post.id)
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({"message": "Comment added successfully", "commentId": new_comment.id}), 201

@app.route('/api/forum/posts/<int:id>/comments', methods=['GET'])
@jwt_required()
def get_comments(id):
    post = Post.query.get_or_404(id)
    comments = []
    for comment in post.comments:
        user = User.query.get(comment.user_id)
        comments.append({
            "id": comment.id,
            "content": comment.content,
            "author": user.username,
            "createdAt": comment.created_at.isoformat()
        })
    return jsonify(comments), 200

@app.route('/api/forum/comments/<int:id>', methods=['PUT'])
@jwt_required()
def update_comment(id):
    comment = Comment.query.get_or_404(id)
    user_id = get_jwt_identity()
    if comment.user_id != user_id and not is_admin():
        return jsonify({"message": "Not authorized to edit this comment"}), 403
    data = request.get_json()
    comment.content = data.get('content', comment.content)
    db.session.commit()
    return jsonify({"message": "Comment updated successfully"}), 200

@app.route('/api/forum/comments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_comment(id):
    comment = Comment.query.get_or_404(id)
    user_id = get_jwt_identity()
    if comment.user_id != user_id and not is_admin():
        return jsonify({"message": "Not authorized to delete this comment"}), 403
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted successfully"}), 200

# --- Main Execution ---

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)