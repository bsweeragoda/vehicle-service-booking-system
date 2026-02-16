<h1>Vehicle Service Booking System</h1>
A full-stack Vehicle Service Booking System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This system allows customers to book vehicle service appointments online and enables administrators to manage bookings efficiently.

<h2>Project Overview</h2>
The Vehicle Service Booking System is a web-based application designed to streamline vehicle service management.

It provides:

 Customer registration & login<br/>

 Service booking management<br/>

 Appointment scheduling<br/>

 Admin dashboard for managing bookings<br/>

 JWT-based authentication & role-based access control<br/>

<h2>Tech Stack</h2>
Frontend:
<ol><li>React.js</li>
 <li>React Router</li>
 <li>Axios</li>
 <li>Tailwind</li></ol> 

Backend:
 <ol><li>Node.js</li>
 <li>Express.js</li>
 <li>MongoDB (Mongoose ODM)</li>
 <li>JSON Web Token (JWT)</li>
 <li>bcrypt (Password Hashing)</li></ol>

<h2>User Roles</h2>
Customer:
 <ol><li>Register & Login</li>
 <li>Book vehicle service</li>
 <li>View personal bookings</li>
 <li>Cancel bookings</li></ol>

Admin:
<ol><li>Secure login</li>
<li>View all service bookings</li>
<li>Update booking status (Pending / Approved / Completed)</li>
<li>Delete bookings if necessary</li></ol>

<h2>Project Structure</h2>
vehicle-service-booking-system/
 <df><li>backend/</li>
   <df><li>controllers/</li>
   <li>models/</li>
   <li>routes/</li>
   <li>middleware/</li>
   <li>config/</li>
   <li>server.js</li></df>

 <li>frontend/</li>li
   <df><li>src/</li>
    <df><li>pages/</li>
       <li>components/</li>
       <li>api/</li></df>
    <li>App.jsx</li></df>

 <li>README.md</li></df>

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
