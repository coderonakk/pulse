# Pulse

Pulse is a full-stack social media application where users can create accounts, authenticate securely, create image-based posts, browse a feed, view their own posts, and delete posts they own.

The project was built to practice building and connecting a complete React frontend with an Express/MongoDB backend, including authentication, protected APIs, cookies, file uploads, authorization, and frontend state management.

## Features

* User registration
* User login and logout
* JWT-based authentication
* Authentication stored using cookies
* Protected API routes
* User session verification
* Create posts with images and captions
* Feed displaying posts
* Newest posts displayed first
* Switch between:

  * All Posts
  * My Posts
* Delete your own posts
* Users cannot delete other users' posts
* Frontend error handling for failed requests
* Responsive dark-blue UI
* Client-side navigation with React Router

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer

## Project Structure

```text
Pulse/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Feed.jsx
│   │   │   └── CreatePost.jsx
│   │   │
│   │   └── ...
│   │
│   └── ...
│
└── Backend/
    ├── routes/
    ├── models/
    ├── middleware/
    ├── app.js
    └── ...
```

## Authentication Flow

Pulse uses JWT authentication stored in an HTTP cookie.

### Registration

```text
Register
   ↓
Backend validates user
   ↓
Password hashed with bcrypt
   ↓
User stored in MongoDB
   ↓
JWT generated
   ↓
JWT stored in cookie
   ↓
User redirected to Feed
```

### Login

```text
Login
   ↓
Find user
   ↓
Compare password with bcrypt
   ↓
Generate JWT
   ↓
Store JWT in cookie
   ↓
User can access protected resources
```

### Protected Requests

The frontend sends credentials with authenticated requests:

```js
{
    withCredentials: true
}
```

The backend authentication middleware checks the JWT before allowing access to protected routes.

## Post System

Users can create posts containing:

* Image
* Caption
* Author

Posts are associated with their author through a MongoDB ObjectId reference.

The feed displays the newest posts first.

Users can switch between:

```text
All Posts
```

and:

```text
My Posts
```

The frontend filters posts based on the authenticated user's ID.

## Authorization

Authentication and authorization are handled separately.

Being logged in does not automatically mean a user can delete every post.

A user can delete only posts that belong to them.

The frontend also hides the delete button for posts belonging to other users, while the backend remains responsible for enforcing the actual authorization.

## Error Handling

The application handles common authentication errors such as:

* User already exists
* User does not exist
* Invalid password
* Unauthorized requests
* Failed API requests

Errors are displayed to the user instead of requiring them to inspect the browser console or backend terminal.

## Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Pulse
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../Backend
npm install
```

### 4. Environment Variables

Create a `.env` file in the backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any other environment variables required by your image-upload/storage configuration.

### 5. Start the backend

```bash
npm run dev
```

### 6. Start the frontend

In another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

and the backend at:

```text
http://localhost:3000
```

## What I Practiced

This project helped me practice:

* React components
* React state with `useState`
* Side effects with `useEffect`
* React Router navigation
* Axios API requests
* Form handling
* `FormData`
* Rendering arrays with `.map()`
* Filtering data with `.filter()`
* Conditional rendering
* Express routes
* REST APIs
* MongoDB and Mongoose
* Password hashing with bcrypt
* JWT authentication
* Cookie-based authentication
* Authentication middleware
* Authorization
* CORS
* Cross-origin credentials
* Image uploads
* API error handling
* Frontend/backend integration

## Future Improvements

Possible future improvements include:

* Like and comment system
* Post editing
* User profiles
* Follow/follower system
* Pagination or infinite scrolling
* Search
* Better loading states
* Image optimization
* Notifications
* Production deployment improvements

## Status

**Completed — ready for deployment.**

Pulse is intentionally being kept as a focused project rather than continuously adding features.

---

Built with React, Node.js, Express, MongoDB and a lot of debugging.
