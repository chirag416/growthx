# Node.js Backend API for User and Admin Management

This repository contains a **Node.js backend** application for managing users and admins. It supports authentication using JWT, role-based access control, and assignment management between users and admins.

---

## Features

- **Registration and Login of Users and Admins**
  - Role-based registration and login endpoints.
  - Password hashing using `bcrypt`.
  - Get admins list

- **JWT Authentication**
  - Secure token-based authentication.
  - Role validation for protected routes.

- **Assignment Management**
  - Users can upload assignments to specific admins.
  - Admins can view, accept, or reject assignments.

- **Protected Routes**
  - Only authenticated users can access specific features.

---

## Tech Stack

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: dotenv
- **Other Libraries**:
  - `bcryptjs` for password hashing.
  - `mongoose` for MongoDB object modeling.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chirag416/growthx.git
   cd growthx

2. Install dependencies:
   ```bash
   npm install

3. Create a `.env` file in the root directory and add following variables
   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   
4. Start the server
   ```bash
   npm start
