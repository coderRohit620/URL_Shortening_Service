# 🔗 LinkSnip — URL Shortening Service

## [GitHub Repository](https://github.com/siddharth9367/URL_Shortening_Service)

## Live Demo 
<https://linksnip1.onrender.com/>


A full-stack URL shortening application that lets anyone instantly shorten long URLs into clean, shareable links. Authenticated users get a personal dashboard with click analytics, link management, and persistent history.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture Overview](#-architecture-overview)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Reference](#-api-reference)
  - [Authentication Endpoints](#authentication-endpoints)
  - [URL Endpoints](#url-endpoints)
  - [Redirection](#redirection)
- [Database Models](#-database-models)
- [Authentication & Security](#-authentication--security)
- [Frontend Pages & Routes](#-frontend-pages--routes)
- [Screenshots](#-screenshots)
- [Author](#-author)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Anonymous Shortening** | Shorten URLs instantly without signing up — open to everyone |
| **User Authentication** | Secure registration & login with JWT access + refresh token strategy |
| **Personal Dashboard** | Authenticated users manage all their links in one place |
| **Click Analytics** | Track total click counts for each shortened URL |
| **One-Click Copy** | Copy shortened URLs to clipboard with animated toast feedback |
| **Link Deletion** | Remove unwanted links with owner-scoped authorization |
| **Short Code Redirect** | Clean `/:shortCode` redirects with automatic click tracking |
| **Responsive Design** | Mobile-first, modern UI with backdrop blur and smooth animations |
| **Protected Routes** | Smart redirects — logged-in users skip auth pages, guests can't access the dashboard |

---

## 🛠 Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** (ES Modules) | JavaScript runtime |
| **Express.js v5** | Web framework & middleware pipeline |
| **MongoDB + Mongoose v9** | Database & ODM |
| **JWT** (`jsonwebtoken`) | Dual-token authentication (Access + Refresh) |
| **bcrypt** | Password hashing (10 salt rounds) |
| **nanoid** | Collision-resistant 7-character short code generation |
| **cookie-parser** | HTTP cookie parsing for token extraction |
| **cors** | Cross-origin resource sharing with credentials |
| **dotenv** | Environment variable management |
| **nodemon** | Hot-reload development server |

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI library |
| **Vite 8** | Ultra-fast dev server & build tool |
| **React Router DOM v7** | Client-side declarative routing |
| **Axios** | HTTP client with cookie credentials |
| **react-hot-toast** | Lightweight toast notifications |
| **react-icons** (Feather) | Scalable SVG icon set |
| **Vanilla CSS + CSS Variables** | Custom design token system with responsive layout |

---

## 📂 Project Structure

```
URL_Shortening_Service/
├── README.md
│
├── backend/
│   ├── .env                        # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── public/                     # Static assets (currently empty)
│   └── src/
│       ├── index.js                # Server bootstrap & DB connection
│       ├── app.js                  # Express app, middleware & routes
│       ├── config/
│       │   └── db.js               # MongoDB connection (Mongoose)
│       ├── controllers/
│       │   ├── auth.controller.js  # Auth request/response handlers
│       │   └── url.controller.js   # URL request/response handlers
│       ├── middleware/
│       │   └── auth.middleware.js  # JWT verification (strict & optional)
│       ├── models/
│       │   ├── user.model.js       # User schema with auth methods
│       │   └── url.models.js       # URL schema with click tracking
│       ├── repositories/
│       │   ├── auth.repository.js  # User database queries
│       │   └── url.repository.js   # URL database queries
│       ├── services/
│       │   ├── auth.service.js     # Auth business logic
│       │   └── url.service.js      # URL business logic
│       └── utils/
│           ├── ApiError.js         # Custom error class
│           ├── ApiResponse.js      # Standardized response wrapper
│           └── asyncHandler.js     # Async error-catching wrapper
│
└── frontend/
    ├── .gitignore
    ├── index.html                  # SPA entry point
    ├── vite.config.js              # Vite build configuration
    ├── eslint.config.js            # ESLint flat config
    ├── package.json
    ├── public/
    │   ├── _redirects              # SPA routing for static hosts
    │   ├── favicon.svg
    │   └── icons.svg               # SVG icon sprites
    └── src/
        ├── main.jsx                # React root mount & providers
        ├── App.jsx                 # Route definitions & layout
        ├── index.css               # Global design tokens & reset
        ├── App.css                 # Component-specific styles
        ├── api/
        │   └── axios.js            # Configured Axios instance
        ├── context/
        │   └── AuthContext.jsx     # Global auth state provider
        ├── hooks/
        │   └── useAuth.js          # Auth context consumer hook
        ├── components/
        │   ├── Navbar.jsx          # Navigation bar with auth state
        │   ├── ProtectedRoute.jsx  # Route guard for private pages
        │   ├── ShortenForm.jsx     # URL input form (dashboard)
        │   └── UrlCard.jsx         # Link card with stats & actions
        ├── pages/
        │   ├── Home.jsx            # Public landing page
        │   ├── Login.jsx           # Login form
        │   ├── Register.jsx        # Registration form
        │   ├── Dashboard.jsx       # Authenticated link management
        │   └── NotFound.jsx        # 404 fallback page
        └── assets/
            └── hero.png            # Hero section image
```

---

## 🏗 Architecture Overview

### Backend — Layered Architecture

The backend follows a clean **Controller → Service → Repository → Model** pattern for separation of concerns:

```
Request
  │
  ▼
┌─────────────────────────────────────────────────────┐
│  Express Middleware Pipeline                         │
│  (CORS → JSON Parser → Cookie Parser → Static)     │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  Routes (auth.routes.js / url.routes.js)             │
│  ├── Middleware: verifyJWT / optionalJWT              │
│  └── Maps HTTP methods to controllers                │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  Controllers                                         │
│  Handle req/res, delegate to services, send response │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  Services                                            │
│  Business logic, validation, token generation        │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  Repositories                                        │
│  Direct MongoDB/Mongoose queries                     │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  Models (Mongoose Schemas)                           │
│  User / Url with hooks, methods, and validations     │
└──────────────────────────────────────────────────────┘
```

### Frontend — Component Architecture

```
<BrowserRouter>
  └── <AuthProvider>           ← Global auth state (user, login, register, logout)
      ├── <Toaster />          ← Toast notifications
      └── <App>
          ├── <Navbar />       ← Dynamic nav (guest vs. authenticated)
          └── <Routes>
              ├── /             → <Home />          (Public landing + anonymous shortening)
              ├── /login        → <Login />         (Guest only, redirects if logged in)
              ├── /register     → <Register />      (Guest only, redirects if logged in)
              ├── /dashboard    → <ProtectedRoute>  (Auth guard)
              │                    └── <Dashboard>
              │                        ├── <ShortenForm />
              │                        └── <UrlCard /> (×N)
              └── *             → <NotFound />       (404 fallback)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd URL_Shortening_Service
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

#### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
PORT=8000
CORS_ORIGIN=http://localhost:5173
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<app>
ACCESS_TOKEN_SECRET=your_access_token_secret_here
ACCESS_TOKEN_EXPIRATION=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRATION=7d
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `8000` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |
| `MONGODB_URL` | MongoDB connection string | — |
| `ACCESS_TOKEN_SECRET` | JWT signing secret for access tokens | — |
| `ACCESS_TOKEN_EXPIRATION` | Access token lifespan | `1d` |
| `REFRESH_TOKEN_SECRET` | JWT signing secret for refresh tokens | — |
| `REFRESH_TOKEN_EXPIRATION` | Refresh token lifespan | `7d` |

#### Frontend (`frontend/.env`)

Create a `.env` file in the `frontend/` directory (optional):

```env
VITE_BACKEND_URL=http://localhost:8000
```

| Variable | Description | Default |
|---|---|---|
| `VITE_BACKEND_URL` | Backend server URL | `http://localhost:8000` |

### Running the Application

#### Development Mode

Start both servers in separate terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server starts at http://localhost:8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App opens at http://localhost:5173
```

#### Production Build

```bash
# Build frontend for production
cd frontend
npm run build       # Output: frontend/dist/

# Start backend in production
cd ../backend
npm start
```

---

## 📡 API Reference

All API responses follow a consistent envelope format:

```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Success description",
  "success": true
}
```

Error responses:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description",
  "errors": []
}
```

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API health check |

---

### Authentication Endpoints

Base path: `/api/v1/auth`

| Method | Endpoint | Auth | Request Body | Description |
|---|---|---|---|---|
| `POST` | `/register` | Public | `{ "name", "email", "password" }` | Register a new user account |
| `POST` | `/login` | Public | `{ "email", "password" }` | Login and receive tokens |
| `POST` | `/logout` | 🔒 JWT | — | Logout and clear session |
| `GET` | `/me` | 🔒 JWT | — | Get current authenticated user |

#### `POST /api/v1/auth/register`

**Request:**
```json
{
  "name": "Rohit Ravi",
  "email": "rohit@example.com",
  "password": "securepassword"
}
```

**Response** `201 Created`:
```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "...",
      "name": "Rohit Ravi",
      "email": "rohit@example.com",
      "createdAt": "2026-08-19T...",
      "updatedAt": "2026-08-19T..."
    },
    "accessToken": "eyJhbGciOiJIUzI1..."
  },
  "message": "User registered successfully",
  "success": true
}
```
> Sets `accessToken` and `refreshToken` as `httpOnly` cookies.

#### `POST /api/v1/auth/login`

**Request:**
```json
{
  "email": "rohit@example.com",
  "password": "securepassword"
}
```

**Response** `200 OK`:
```json
{
  "statusCode": 200,
  "data": {
    "user": { "_id", "name", "email", "..." },
    "accessToken": "eyJhbGciOiJIUzI1..."
  },
  "message": "Login successful",
  "success": true
}
```

---

### URL Endpoints

Base path: `/api/v1/url`

| Method | Endpoint | Auth | Request Body / Params | Description |
|---|---|---|---|---|
| `POST` | `/shorten` | Optional | `{ "fullUrl": "https://..." }` | Shorten a URL (works for guests & users) |
| `GET` | `/my-urls` | 🔒 JWT | — | Fetch all URLs for the authenticated user |
| `DELETE` | `/:id` | 🔒 JWT | URL param: MongoDB ObjectId | Delete a URL (owner only) |

#### `POST /api/v1/url/shorten`

**Request:**
```json
{
  "fullUrl": "https://www.example.com/very/long/path/to/resource"
}
```

**Response** `201 Created`:
```json
{
  "statusCode": 201,
  "data": {
    "_id": "66c3a1...",
    "full_url": "https://www.example.com/very/long/path/to/resource",
    "short_url": "aB3dX7z",
    "click": 0,
    "user": "66c3a0...",
    "createdAt": "2026-08-19T...",
    "updatedAt": "2026-08-19T..."
  },
  "message": "Short URL created successfully",
  "success": true
}
```

---

### Redirection

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/:shortCode` | Redirects (HTTP 302) to the original URL and increments click count |

**Example:**
```
GET http://localhost:8000/aB3dX7z
→ 302 Redirect → https://www.example.com/very/long/path/to/resource
```

---

## 🗃 Database Models

### User Model

| Field | Type | Constraints | Description |
|---|---|---|---|
| `name` | String | required, trim, 3–50 chars | User's display name |
| `email` | String | required, unique, lowercase | Login identifier |
| `password` | String | required, min 6 chars, `select: false` | Bcrypt-hashed password (hidden by default) |
| `refreshToken` | String | optional | Active refresh token for session |
| `createdAt` | Date | auto-generated | Account creation timestamp |
| `updatedAt` | Date | auto-generated | Last modification timestamp |

**Hooks:** `pre('save')` — auto-hashes password on creation/modification.  
**Methods:** `isPasswordCorrect(password)`, `generateAccessToken()`, `generateRefreshToken()`.

### URL Model

| Field | Type | Constraints | Description |
|---|---|---|---|
| `full_url` | String | required | Original target URL |
| `short_url` | String | required, unique, indexed | 7-character nanoid code |
| `click` | Number | required, default: 0 | Total redirect count |
| `user` | ObjectId | ref: "User", optional | Owner (null for anonymous) |
| `createdAt` | Date | auto-generated | Link creation timestamp |
| `updatedAt` | Date | auto-generated | Last modification timestamp |

---

## 🔐 Authentication & Security

| Mechanism | Details |
|---|---|
| **Password Hashing** | bcrypt with 10 salt rounds, auto-hashed via Mongoose `pre('save')` hook |
| **Access Token** | Short-lived JWT (default: 1 day) containing `{ _id, email, name }` |
| **Refresh Token** | Long-lived JWT (default: 7 days) containing `{ _id }`, persisted in DB |
| **Token Delivery** | Sent as `httpOnly` cookies + in JSON response body |
| **Token Extraction** | Cookies first (`req.cookies.accessToken`), fallback to `Authorization: Bearer <token>` |
| **Cookie Security** | `httpOnly: true`, `secure: true` in production, `sameSite: "none"` |
| **Dual Auth Modes** | `verifyJWT` (strict — 401 if unauthenticated) / `optionalJWT` (permissive — guest-friendly) |
| **Owner-Scoped Deletion** | Delete queries filter by both `_id` and `user` to prevent IDOR attacks |
| **Password Hidden** | User password field uses `select: false` — never returned in API responses |

---

## 🖥 Frontend Pages & Routes

| Route | Page | Access | Description |
|---|---|---|---|
| `/` | Home | Public | Landing page with hero section, instant URL shortening form, features grid, and CTA |
| `/login` | Login | Guest only | Email + password login form. Auto-redirects to `/dashboard` if already logged in |
| `/register` | Register | Guest only | Name + email + password registration. Auto-redirects to `/dashboard` if already logged in |
| `/dashboard` | Dashboard | 🔒 Authenticated | Personal link management — create, view stats, copy, and delete shortened URLs |
| `*` | NotFound | Public | 404 fallback with navigation back to home |

### State Management

- **Global:** `AuthContext` provides `user`, `loading`, `login()`, `register()`, `logout()` across the app
- **Local:** Component-level `useState` for form inputs, submission states, and URL collections
- **Notifications:** `react-hot-toast` for success/error feedback on all user actions

---

## 📸 Screenshots

> Add screenshots of the Home page,
![alt text](<Screenshot 2026-08-19 050426.png>)

Dashboard,
![alt text](<Screenshot 2026-08-19 050607.png>)

Login/Register pages here.
![alt text](<Screenshot 2026-08-19 050441.png>)
![alt text](<Screenshot 2026-08-19 050457.png>)
![alt text](<Screenshot 2026-08-19 050607.png>)
![alt text](<Screenshot 2026-08-19 050653.png>)

--- 

## 👤 Author

**Rohit Ravi**

---

## 📄 License

This project is licensed under the **ISC License**.
