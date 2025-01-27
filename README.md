# Hotel Management System

A full-stack web application for managing hotel rooms, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Authentication (Register/Login)
- Room Management (CRUD operations)
- Room Status Tracking
- Responsive Design
- Modern UI with Material-UI

## Project Structure

```
HotelManagement/
├── backend/              # Node.js & Express backend
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Server entry point
└── frontend/            # React frontend
    ├── src/
    │   ├── components/  # React components
    │   └── App.js       # Main App component
    └── public/          # Static files
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/rashel7r/HotelManagement.git
   cd HotelManagement
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Environment Setup:
   - Copy `.env.example` to `.env` in the backend directory
   - Update the environment variables with your MongoDB connection string and JWT secret

4. Start the application:
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend development server (from frontend directory)
   npm start
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room
- `PATCH /api/rooms/:id/status` - Update room status

## Technologies Used

- **Frontend:**
  - React.js
  - Material-UI
  - Axios
  - React Router

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - Mongoose

## Contributing

Feel free to submit issues and enhancement requests. 