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
<ul><li>React.js</li>
 <li>React Router</li>
 <li>Axios</li>
 <li>Tailwind</li></ul> 

Backend:
 <ul><li>Node.js</li>
 <li>Express.js</li>
 <li>MongoDB (Mongoose ODM)</li>
 <li>JSON Web Token (JWT)</li>
 <li>bcrypt (Password Hashing)</li></ul>

<h2>User Roles</h2>
Customer:
 <ul><li>Register & Login</li>
 <li>Book vehicle service</li>
 <li>View personal bookings</li>
 <li>Cancel bookings</li></ul>

Admin:
<ul><li>Secure login</li>
<li>View all service bookings</li>
<li>Update booking status (Pending / Approved / Completed)</li>
<li>Delete bookings if necessary</li></ul>

<h2>Project Structure</h2>
vehicle-service-booking-system/
 <dl>
  <dt>backend/</dt>
   <dd>controllers/</dd>
   <dd>models/</dd>
   <dd>routes/</dd>
   <dd>middleware/</dd>
   <dd>config/</dd>
   <dd>server.js</dd>

 <dt>frontend/</dt>
   <dd>src/</dd>
      <dd>pages/<br/>
      components/<br/>
      api/</dd>
   <dd>App.jsx</dd>

 <dt>README.md</dt>
 </dl>

<h2>Authentication Flow</h2>
 <ul><li>User registers as Customer</li>
 <li>Password is hashed using bcrypt</li>
 <li>JWT token is generated upon login</li>
 <li>Protected routes are accessed using JWT middleware</li>
 <li>Role-based authorization ensures Admin & Customer access control</li></ul>

<h2>Database Schema (Example)</h2>
User Model:
 <ul><li>name</li>
 <li>email</li>
 <li>password</li>
 <li>role (admin / customer)</li></ul>
 
Booking Model:
 <ul><li>user (ObjectId)</li>
 <li>vehicleType</li>
 <li>serviceType</li>
 <li>bookingDate</li>
 <li>status (Pending / Approved / Completed)</li></ul>

<h2>Installation & Setup</h2>
<ol><li> Clone the Repository</li>
<ul><li>git clone https://github.com/your-username/vehicle-service-booking-system.git</li>
<li>cd vehicle-service-booking-system</li></ul>

<li> Backend Setup</li>
<ul><li>cd backend</li>
<li>npm install</li></ul>

<ul><li>Create a .env file inside the backend folder:</li></ul>

<ul><li>PORT=5000</li>
<li>MONGO_URI=your_mongodb_connection_string</li>
<li>JWT_SECRET=your_secret_key</li></ul>


<ul><li>Start the backend server:</li></ul>

<ul><li>npm run dev</li></ul>

<li> Frontend Setup</li>
<ul><li>cd frontend</li>
<li>npm install</li>
<li>npm start</li></ul></ol>

<h2>API Endpoints (Sample)</h2>
<dl><dt>Auth Routes</dt>
<dd>POST   /api/auth/register</dd>
<dd>POST   /api/auth/login</dd>

<dt>Booking Routes</dt>
<dd>POST   /api/bookings</dd>
<dd>GET    /api/bookings/my</dd>
<dd>GET    /api/bookings      (Admin)</dd>
<dd>PUT    /api/bookings/:id  (Admin)</dd>
<dd>DELETE /api/bookings/:id  (Admin)</dd></dl>

<h2>Environment Variables</h2>
<table>
 <tr><th>Variable</th> 	<th>Description</th></tr>
 <tr><td>PORT</td>     	<td>Backend server port</td></tr>
 <tr><td>MONGO_URI</td>	<td>MongoDB connection string</td></tr>
 <tr><td>JWT_SECRET</td>	<td>Secret key for JWT</td></tr>
</table>

<h2>Learning Outcomes</h2>
This project demonstrates:
 <ul><li>Full-stack MERN development</li>
 <li>RESTful API design</li>
 <li>JWT authentication</li>
 <li>Role-based authorization</li>
 <li>MongoDB data modeling</li>
 <li>Frontend–Backend integration</li></ul>

<h2>License</h2>
This project is licensed under the MIT License.
