# MERN Stack Movie Application with Role-Based Access Control

A production-ready full-stack movie management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring JWT authentication and role-based access control (RBAC).

## Features

### Authentication & Authorization
- **Secure JWT-based authentication**
- **Role-based access control** (User and Admin roles)
- **Protected routes** on both frontend and backend
- **Default landing page is Login** - no access without authentication
- **Auto-redirect based on role** after login:
  - Regular users → Home page
  - Admin users → Admin Dashboard
- **Token verification** on page refresh
- **Secure password hashing** with bcrypt

### User Features
- **Browse all movies** with pagination (12 per page)
- **Search movies** by title, description, director, or genre
- **Sort movies** by:
  - Name (A-Z or Z-A)
  - Rating (High to Low or Low to High)
  - Release Date (Newest or Oldest)
  - Duration (Shortest or Longest)
- **Responsive UI** with Material-UI components
- **Movie cards** displaying:
  - Poster image
  - Title, rating, description
  - Release date, duration
  - Genre tags
  - Director information

### Admin Features
- **Admin Dashboard** with full movie management
- **Add new movies** with comprehensive form
- **Edit existing movies** with pre-filled data
- **Delete movies** with confirmation dialog
- **Admin-only routes** protected by middleware
- **Table view** of all movies with quick actions

### Technical Features
- **RESTful API** design
- **MongoDB indexing** for optimized queries
- **Pagination** for efficient data loading
- **Real-time search** with debouncing
- **Error handling** with centralized middleware
- **Input validation** on both client and server
- **Responsive design** for all screen sizes
- **Loading states** and error feedback

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── movieController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Movie.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── movieRoutes.js
│   │   └── utils/
│   │       └── jwt.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MovieForm.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Search.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Authentication Flow

1. **Application starts** → User lands on `/` (Login page)
2. **User cannot access any page** without logging in
3. **Login/Register** → JWT token generated and stored
4. **Token stored** in localStorage
5. **Role-based redirect**:
   - `role: "user"` → `/home`
   - `role: "admin"` → `/admin`
6. **On page refresh** → Token validated automatically
7. **Logout** → Token cleared → Redirect to `/`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Movie Endpoints

#### Get All Movies (with pagination & sorting)
```http
GET /movies?page=1&limit=12&sortBy=rating&sortOrder=desc
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "count": 12,
  "total": 50,
  "page": 1,
  "pages": 5,
  "movies": [...]
}
```

#### Search Movies
```http
GET /movies/search?q=inception&page=1&limit=12
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "count": 3,
  "total": 3,
  "page": 1,
  "pages": 1,
  "movies": [...]
}
```

#### Get Single Movie
```http
GET /movies/:id
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "movie": {...}
}
```

#### Create Movie (Admin Only)
```http
POST /movies
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Inception",
  "description": "A thief who steals corporate secrets...",
  "releaseDate": "2010-07-16",
  "duration": 148,
  "rating": 8.8,
  "genre": ["Action", "Sci-Fi", "Thriller"],
  "director": "Christopher Nolan",
  "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
  "poster": "https://example.com/poster.jpg"
}

Response: 201 Created
{
  "success": true,
  "message": "Movie created successfully",
  "movie": {...}
}
```

#### Update Movie (Admin Only)
```http
PUT /movies/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Updated Title",
  "rating": 9.0
}

Response: 200 OK
{
  "success": true,
  "message": "Movie updated successfully",
  "movie": {...}
}
```

#### Delete Movie (Admin Only)
```http
DELETE /movies/:id
Authorization: Bearer {admin_token}

Response: 200 OK
{
  "success": true,
  "message": "Movie deleted successfully"
}
```

## Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables in .env**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. **Start MongoDB** (if running locally)
```bash
mongod
```

6. **Start the backend server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables in .env**
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Start the development server**
```bash
npm run dev
```

Application will run on `http://localhost:3000`

### Creating Admin User

To create an admin user, you can either:

**Option 1: Register via API with role**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

**Option 2: Modify existing user in MongoDB**
```javascript
// Connect to MongoDB
use movie-app

// Update user role
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

## Usage Guide

### For Regular Users

1. **Register/Login** at `http://localhost:3000/`
2. **Browse movies** on the Home page
3. **Sort movies** by name, rating, release date, or duration
4. **Search movies** using the Search page
5. **Navigate** using the header menu
6. **Logout** when done

### For Admin Users

1. **Login** at `http://localhost:3000/` with admin credentials
2. **Redirected automatically** to Admin Dashboard
3. **View all movies** in table format
4. **Add new movie** using the Add Movie button
5. **Edit movies** using the edit icon
6. **Delete movies** using the delete icon (with confirmation)
7. **Access user features** via header navigation

## Deployment

### Backend Deployment (Railway/Render/Heroku)

1. **Push code to Git repository**
2. **Connect to deployment platform**
3. **Set environment variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Strong secret key
   - `JWT_EXPIRE`: Token expiration time
   - `NODE_ENV`: production
4. **Deploy**

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**
```bash
npm run build
```

2. **Deploy dist folder** to hosting platform
3. **Set environment variable**:
   - `VITE_API_URL`: Your deployed backend URL

### MongoDB Atlas Setup

1. **Create account** at mongodb.com/cloud/atlas
2. **Create cluster**
3. **Get connection string**
4. **Whitelist IP addresses** or allow all (0.0.0.0/0)
5. **Update MONGODB_URI** in backend .env

## Security Features

- **JWT token authentication** with expiration
- **Password hashing** using bcrypt (10 salt rounds)
- **Role-based authorization** middleware
- **Protected API routes** requiring authentication
- **Input validation** on all endpoints
- **CORS configuration** for cross-origin requests
- **Error handling** without exposing sensitive data
- **Secure HTTP headers** (can be enhanced with helmet.js)

## Performance Optimizations

- **MongoDB indexes** on frequently queried fields
- **Pagination** to limit data transfer
- **Debounced search** to reduce API calls
- **Lazy loading** for large datasets
- **Efficient React re-renders** with proper state management
- **Axios interceptors** for request/response handling

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify network connectivity
- Check firewall settings

### CORS Errors
- Verify backend CORS configuration
- Check API URL in frontend .env
- Ensure proper headers in requests

### Authentication Issues
- Clear localStorage and try again
- Check JWT_SECRET matches on backend
- Verify token is being sent in headers
- Check token expiration time

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

## Future Enhancements

- [ ] Movie ratings and reviews by users
- [ ] Watchlist functionality
- [ ] Advanced filters (genre, year range, rating range)
- [ ] Movie recommendations
- [ ] Image upload for posters
- [ ] Social sharing features
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Movie trailers integration
- [ ] Dark mode toggle
- [ ] Analytics dashboard for admin

## License

This project is open-source and available under the MIT License.

## Support

For issues, questions, or contributions, please create an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
