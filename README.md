Vehicle Service Booking System
A full-stack Vehicle Service Booking System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This system allows customers to book vehicle service appointments online and enables administrators to manage bookings efficiently.

Project Overview
The Vehicle Service Booking System is a web-based application designed to streamline vehicle service management.

It provides:

 Customer registration & login

 Service booking management

 Appointment scheduling

 Admin dashboard for managing bookings

 JWT-based authentication & role-based access control

Tech Stack

Frontend:
 React.js
 React Router
 Axios
 Tailwind 

Backend
 Node.js
 Express.js
 MongoDB (Mongoose ODM)
 JSON Web Token (JWT)
 bcrypt (Password Hashing)

User Roles
Customer:
 Register & Login
 Book vehicle service
 View personal bookings
 Cancel bookings

Admin
Secure login
View all service bookings
Update booking status (Pending / Approved / Completed)
Delete bookings if necessary

Project Structure
vehicle-service-booking-system/
 backend/
   controllers/
   models/
   routes/
   middleware/
   config/
   server.js

 frontend/
   src/
    pages/
    components/
    api/
    App.jsx

 README.md

Authentication Flow
 User registers as Customer
 Password is hashed using bcrypt
 JWT token is generated upon login
 Protected routes are accessed using JWT middleware
 Role-based authorization ensures Admin & Customer access control

Database Schema (Example)
User Model:
 name
 email
 password
 role (admin / customer)
 
Booking Model:
 user (ObjectId)
 vehicleType
 serviceType
 bookingDate
 status (Pending / Approved / Completed)

Installation & Setup
1️. Clone the Repository
git clone https://github.com/your-username/vehicle-service-booking-system.git
cd vehicle-service-booking-system

2️. Backend Setup
cd backend
npm install

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Start the backend server:

npm run dev

3️. Frontend Setup
cd frontend
npm install
npm start

API Endpoints (Sample)
Auth Routes
POST   /api/auth/register
POST   /api/auth/login

Booking Routes
POST   /api/bookings
GET    /api/bookings/my
GET    /api/bookings      (Admin)
PUT    /api/bookings/:id  (Admin)
DELETE /api/bookings/:id  (Admin)

Environment Variables
 Variable 	Description
 PORT     	Backend server port
 MONGO_URI	MongoDB connection string
 JWT_SECRET	Secret key for JWT
 
Learning Outcomes
This project demonstrates:
 Full-stack MERN development
 RESTful API design
 JWT authentication
 Role-based authorization
 MongoDB data modeling
 Frontend–Backend integration

License
This project is licensed under the MIT License.
