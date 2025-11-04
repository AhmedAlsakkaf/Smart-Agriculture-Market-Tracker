# Smart Agriculture Market Tracker - Frontend

## Authentication System

### Pages Created

1. **LoginPage.jsx** (`/login`)

   - Email and password input
   - Role selection (Farmer/Admin)
   - Remember me checkbox
   - Forgot password link
   - Link to signup page

2. **SignupPage.jsx** (`/signup`)
   - Full name, email, phone, location inputs
   - Password and confirm password
   - Role selection (Farmer/Admin)
   - Terms and conditions checkbox
   - Link to login page

### Navigation Updates

All buttons in HomePage now properly link to authentication pages:

- "Get Started" → `/signup`
- "Sign In" → `/login`
- "Join Now - It's Free!" → `/signup`

### API Integration Ready

**File:** `src/services/authService.js`

This service file is ready to integrate with your backend APIs. It includes:

#### Authentication Functions:

- `login(email, password, role)` - Login user
- `signup(userData)` - Register new user
- `logout()` - Logout user
- `getCurrentUser()` - Get logged-in user info
- `isAuthenticated()` - Check if user is logged in
- `getToken()` - Get JWT token

#### Helper Function:

- `authenticatedFetch(url, options)` - Make authenticated API calls

### How to Update with Backend APIs

When your backend developer provides the APIs, update these files:

#### 1. Update API Base URL

In `src/services/authService.js`:

```javascript
const API_BASE_URL = "YOUR_BACKEND_URL/api";
```

#### 2. Update Login API Endpoint

In `src/pages/LoginPage.jsx`, replace the TODO section:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await authService.login(
      formData.email,
      formData.password,
      formData.role
    );

    // Redirect based on role
    if (response.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/farmer");
    }
  } catch (error) {
    alert(error.message);
  }
};
```

#### 3. Update Signup API Endpoint

In `src/pages/SignupPage.jsx`, replace the TODO section:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await authService.signup(formData);

    // Redirect to login or dashboard
    navigate("/login");
  } catch (error) {
    alert(error.message);
  }
};
```

### Backend API Requirements

Your backend developer should provide these endpoints:

#### 1. Login Endpoint

```
POST /api/auth/login
Body: {
  email: string,
  password: string,
  role: "farmer" | "admin"
}
Response: {
  token: string,
  user: {
    id: string,
    email: string,
    fullName: string,
    role: string,
    ...
  }
}
```

#### 2. Signup Endpoint

```
POST /api/auth/signup
Body: {
  fullName: string,
  email: string,
  password: string,
  phone: string,
  location: string,
  role: "farmer" | "admin"
}
Response: {
  token: string,
  user: {
    id: string,
    email: string,
    fullName: string,
    role: string,
    ...
  }
}
```

### Form Data Structure

#### Login Form Data:

```javascript
{
  email: string,
  password: string,
  role: "farmer" | "admin"
}
```

#### Signup Form Data:

```javascript
{
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
  phone: string,
  location: string,
  role: "farmer" | "admin"
}
```

### Next Steps

1. Get API endpoints from backend developer
2. Update `API_BASE_URL` in `authService.js`
3. Test login functionality
4. Test signup functionality
5. Implement role-based redirects
6. Create Admin Dashboard
7. Create Farmer Dashboard

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Project Structure

```
src/
├── pages/
│   ├── HomePage.jsx          # Landing page
│   ├── LoginPage.jsx         # Login page with role selection
│   └── SignupPage.jsx        # Signup page with role selection
├── components/
│   ├── Header.jsx            # Navigation header
│   ├── Footer.jsx            # Footer component
│   ├── Layout.jsx            # Layout wrapper
│   └── Navbar.jsx            # Navbar component
├── services/
│   └── authService.js        # Authentication API service
└── utils/                    # Utility functions (to be added)
```
