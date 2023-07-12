
# i_NoteBook

i_NoteBook is a secure MERN (MongoDB, Express, React, Node.js) web application for note-taking. It provides user login/signup functionality and encrypted data storage using JWT (JSON Web Token) and bcrypt.js. Effortlessly manage, update, and delete your notes in a user-friendly interface.

## Installation and Setup

1. Backend Installation:
   - Open a new terminal or PowerShell window.
   - Navigate to the backend directory: `cd backend`
   - Install the dependencies: `npm install`
   - Start the server: `npm start`

2. Frontend Installation:
   - Open a new terminal or PowerShell window.
   - Navigate to the frontend directory: `cd frontend`
   - Install the dependencies: `npm install`
   - Start the client: `npm start`

To start both the backend and frontend simultaneously, install the `concurrently` package by running `npm install concurrently` in the frontend terminal.

## Package Dependencies

### Backend:
- bcryptjs: ^2.4.3
- body-parser: ^1.20.2
- cors: ^2.8.5
- express: ^4.18.2
- express-validator: ^7.0.1
- jsonwebtoken: ^9.0.0
- mongoose: ^7.2.1
- validator: ^13.9.0
- nodemon (dev): ^2.0.22

### Frontend:
- axios: ^1.4.0
- bootstrap: ^5.3.0
- node-fetch: ^3.3.1
- react: ^18.2.0
- react-bootstrap: ^2.7.4
- react-dom: ^18.2.0
- react-icons: ^4.10.1
- react-router-dom: ^6.12.1
- react-scripts: ^5.0.1
- web-vitals: ^2.1.4


## Usage

1. Open your web browser and visit `http://localhost:3000` to access i_NoteBook.
2. Sign up or log in to your account.
3. Create, update, and delete notes within the application.
4. Stay organized and boost productivity with i_NoteBook's efficient note-taking features.

## Technologies Used

- MongoDB: Document database for storing user data and notes
- Express: Backend framework for building the RESTful API
- React: Frontend library for creating the user interface
- Node.js: Runtime environment for executing JavaScript on the server
- JWT: JSON Web Token for secure user authentication and authorization
- bcrypt.js: Library for data encryption and password hashing

