# Republican Veterinary Laboratory (RVL) Website

This is the frontend and backend codebase for the Republican Veterinary Laboratory (RVL) website, built for a hackathon.

## Features

- **Multilingual Support**: Kazakh, Russian, and English.
- **Service Request System**: Users can submit service requests and training center enrollments.
- **Admin Panel**: Dedicated dashboard for admins to manage applications, news, users, and settings.
- **Backend API**: Express + MongoDB backend handling authentication, data storage, and business logic.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Tech Stack

- **Frontend**: React, Vite, React Router, CSS Modules
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Deployment**:
  - Frontend: [Vercel](https://rvl-new.vercel.app/)
  - Backend: [Render](https://rvl-server.onrender.com)

## Setup

1. **Install Dependencies**:
   ```bash
   npm install       # Frontend dependencies
   cd server && npm install  # Backend dependencies
   ```

2. **Environment Variables**:
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5001
   FRONTEND_URL=http://localhost:5173
   ```
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

3. **Run Development Servers**:
   ```bash
   # Run Backend (from root)
   cd server && npm run dev

   # Run Frontend (from root, open new terminal)
   npm run dev
   ```

## Admin Access

The admin panel is accessible at `/admin` (or via the Dashboard sidebar) for users with the `admin` role.

---
*Created for Student Hackathon*
