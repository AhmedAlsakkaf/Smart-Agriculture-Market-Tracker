import requests
import json
from datetime import date, timedelta
import random

# --- Configuration ---
BASE_URL = 'http://127.0.0.1:5000'
HEADERS = {'Content-Type': 'application/json'}

# --- Session Storage (to hold tokens and IDs) ---
session = {
    "admin_token": None,
    "farmer_token": None,
    "market_item_id": None,
    "post_id": None,
    "comment_id": None
}

# --- Helper Functions ---
def print_test_title(title):
    """Prints a formatted title for a test section."""
    print("\n" + "="*50)
    print(f"   {title.upper()}")
    print("="*50)

def print_response(response):
    """Prints the status code and JSON response of an API call."""
    print(f"Status Code: {response.status_code}")
    try:
        print("Response JSON:", json.dumps(response.json(), indent=2))
    except json.JSONDecodeError:
        print("Response Body:", response.text)

def get_auth_headers(user_type='farmer'):
    """Returns the authorization headers for a given user type."""
    token = session.get(f"{user_type}_token")
    if not token:
        raise Exception(f"Token for '{user_type}' not found. Please log in first.")
    return {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }

# --- Test Functions ---

def test_authentication():
    """Tests user registration and login endpoints."""
    print_test_title("1. Testing Authentication")
    
    # Register Admin
    admin_payload = {
        "username": "testadmin" + str(random.randint(1, 10000)),
        "password": "adminpassword",
        "role": "Admin"
    }
    print("\n--> Registering Admin...")
    response = requests.post(f"{BASE_URL}/api/auth/register", headers=HEADERS, json=admin_payload)
    print_response(response)

    # Register Farmer
    farmer_payload = {
        "username": "testfarmer" + str(random.randint(1, 10000)),
        "password": "farmerpassword",
        "role": "Farmer"
    }
    print("\n--> Registering Farmer...")
    response = requests.post(f"{BASE_URL}/api/auth/register", headers=HEADERS, json=farmer_payload)
    print_response(response)

    # Login Admin
    print("\n--> Logging in as Admin...")
    response = requests.post(f"{BASE_URL}/api/auth/login", headers=HEADERS, json={"username": admin_payload["username"], "password": admin_payload["password"]})
    print_response(response)
    if response.ok:
        session["admin_token"] = response.json().get('token')

    # Login Farmer
    print("\n--> Logging in as Farmer...")
    response = requests.post(f"{BASE_URL}/api/auth/login", headers=HEADERS, json={"username": farmer_payload["username"], "password": farmer_payload["password"]})
    print_response(response)
    if response.ok:
        session["farmer_token"] = response.json().get('token')

def test_admin_dashboard():
    """Tests Admin-specific endpoints for market data management."""
    print_test_title("2. Testing Admin Dashboard")
    
    # Add Market Data
    market_payload = {
        "name": "Tomato",
        "price": 150.75,
        "date": date.today().isoformat()
    }
    print("\n--> Admin adding market data (Tomato)...")
    response = requests.post(f"{BASE_URL}/api/market-data", headers=get_auth_headers('admin'), json=market_payload)
    print_response(response)
    if response.ok:
        session["market_item_id"] = response.json().get('entryId')

    # Add another item
    requests.post(f"{BASE_URL}/api/market-data", headers=get_auth_headers('admin'), json={
        "name": "Potato", "price": 80.00, "date": date.today().isoformat()
    })

    # Update Market Data
    update_payload = {"price": 155.00}
    print(f"\n--> Admin updating market data for item ID: {session['market_item_id']}...")
    response = requests.put(f"{BASE_URL}/api/market-data/{session['market_item_id']}", headers=get_auth_headers('admin'), json=update_payload)
    print_response(response)

    # Get Market Stats
    print("\n--> Admin fetching market stats...")
    response = requests.get(f"{BASE_URL}/api/market-data/stats", headers=get_auth_headers('admin'))
    print_response(response)

def test_farmer_dashboard_and_viz():
    """Tests Farmer-facing endpoints for viewing data."""
    print_test_title("3. Testing Farmer Dashboard & Data Visualization")
    
    # Get Market Prices
    print("\n--> Farmer fetching all market prices...")
    response = requests.get(f"{BASE_URL}/api/market-prices", headers=get_auth_headers('farmer'))
    print_response(response)

    # Search for a specific price
    print("\n--> Farmer searching for 'Tomato'...")
    response = requests.get(f"{BASE_URL}/api/market-prices?search=Tomato", headers=get_auth_headers('farmer'))
    print_response(response)

    # Get Price Trends
    print("\n--> Farmer fetching 7-day price trend for 'Tomato'...")
    response = requests.get(f"{BASE_URL}/api/price-trends/Tomato", headers=get_auth_headers('farmer'))
    print_response(response)
    
    # Get Price Comparison
    print("\n--> Farmer comparing prices for 'Tomato,Potato'...")
    response = requests.get(f"{BASE_URL}/api/price-comparison?items=Tomato,Potato", headers=get_auth_headers('farmer'))
    print_response(response)


def test_community_forum():
    """Tests all CRUD operations for the community forum."""
    print_test_title("5. Testing Community Forum")

    # Farmer creates a post
    post_payload = {
        "title": "Best fertilizer for wheat?",
        "content": "I am looking for recommendations on organic fertilizers."
    }
    print("\n--> Farmer creating a new post...")
    response = requests.post(f"{BASE_URL}/api/forum/posts", headers=get_auth_headers('farmer'), json=post_payload)
    print_response(response)
    if response.ok:
        session["post_id"] = response.json().get('postId')

    # Get all posts
    print("\n--> Fetching all forum posts...")
    response = requests.get(f"{BASE_URL}/api/forum/posts", headers=get_auth_headers('farmer'))
    print_response(response)

    # Admin adds a comment to the post
    comment_payload = {"content": "Neem-based fertilizers have worked well for me."}
    print(f"\n--> Admin adding a comment to post ID: {session['post_id']}...")
    response = requests.post(f"{BASE_URL}/api/forum/posts/{session['post_id']}/comments", headers=get_auth_headers('admin'), json=comment_payload)
    print_response(response)
    if response.ok:
        session["comment_id"] = response.json().get('commentId')

    # Farmer gets all comments for their post
    print(f"\n--> Farmer fetching comments for post ID: {session['post_id']}...")
    response = requests.get(f"{BASE_URL}/api/forum/posts/{session['post_id']}/comments", headers=get_auth_headers('farmer'))
    print_response(response)

    # Admin updates their comment
    update_comment_payload = {"content": "To clarify, neem-based fertilizers are great for pest control too."}
    print(f"\n--> Admin updating comment ID: {session['comment_id']}...")
    response = requests.put(f"{BASE_URL}/api/forum/comments/{session['comment_id']}", headers=get_auth_headers('admin'), json=update_comment_payload)
    print_response(response)

    # Admin deletes their comment
    print(f"\n--> Admin deleting comment ID: {session['comment_id']}...")
    response = requests.delete(f"{BASE_URL}/api/forum/comments/{session['comment_id']}", headers=get_auth_headers('admin'))
    print_response(response)
    
    # Farmer deletes their post
    print(f"\n--> Farmer deleting post ID: {session['post_id']}...")
    response = requests.delete(f"{BASE_URL}/api/forum/posts/{session['post_id']}", headers=get_auth_headers('farmer'))
    print_response(response)
    
def test_cleanup():
    """Cleans up created data."""
    print_test_title("6. Cleaning Up Test Data")

    # Admin deletes the market data item
    print(f"\n--> Admin deleting market data item ID: {session['market_item_id']}...")
    response = requests.delete(f"{BASE_URL}/api/market-data/{session['market_item_id']}", headers=get_auth_headers('admin'))
    print_response(response)

if __name__ == "__main__":
    try:
        test_authentication()
        test_admin_dashboard()
        test_farmer_dashboard_and_viz()
        test_community_forum()
    except Exception as e:
        print(f"\nAn error occurred during testing: {e}")
    finally:
        if session.get("admin_token") and session.get("market_item_id"):
            test_cleanup()
        print("\n" + "="*50)
        print("         TESTING COMPLETE")
        print("="*50)