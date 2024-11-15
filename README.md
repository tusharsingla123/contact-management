# Contacts Management System


**Project Description**

The Contacts Management System is a CRM (Customer Relationship Management) feature that allows users to manage contacts. It provides full CRUD (Create, Read, Update, Delete) functionality, using React and MUI components for the frontend and Node.js with Express and MongoDB for the backend. Users can add, view, edit, and delete contact details, with the ability to paginate, sort, and validate form inputs.

**Technical Decisions and Overview**

* Frontend: Built with React.js and MUI (Material-UI) components, providing a responsive and user-friendly interface.
* Backend: Developed using Node.js and Express to serve RESTful APIs, connecting with a MongoDB database to store and manage contact details.
* Pagination & Sorting: The application uses TablePagination and TableSortLabel components to enable easy navigation and sorting of contacts.
* Form Validation: Included to ensure the data integrity of user inputs, especially for email and phone fields.
* Error Handling: Robust error handling for both client-side (frontend validations) and server-side (API error responses).
* Database: MongoDB is used for its scalability, flexibility, and seamless integration with Node.js for handling large amounts of data.

## Setup Instructions

**Prerequisites**
* Node.js
* MongoDB

**Installation**
* Clone the Repository:
     ```bash
     git clone https://github.com/tusharsingla123/contacts-management.git
     cd contacts-management-system
     ```
* Install Server Dependencies: Navigate to the backend folder and install dependencies
  ```bash
  cd backend
  npm install
  ```
* Install Client Dependencies: Open a new terminal window, navigate to the frontend folder, and install dependencies
  ```bash
  cd frontend
  npm install
  ```
* Configure Environment Variables: Create a .env file in the backend directory and specify the following environment variables
  ```bash
  PORT=8000
  MONGODB_URI=mongodb://localhost:27017/contactsDB
  ```
* Database Setup: Ensure MongoDB is running locally or modify the MONGODB_URI in the .env file to match your database setup.
* Run the Backend Server: Start the backend server in the backend folder
  ```bash
  npm start
  ```
   The server will start at http://localhost:8000.
* Run the Frontend Server: Start the React frontend in the frontend folder.
  ```bash
  npm start
  ```
   The frontend will be accessible at http://localhost:3000.

## ScreenShot

## Database Schema

``` bash
const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  company: { type: String },
  jobTitle: { type: String },
});
module.exports = mongoose.model("Contact", contactSchema);
```

  This schema is used to store contact information in MongoDB. Ensure you have created the database and added this schema to your backend.


## Project Structure

**Backend**
* Routes: Defined in Express for CRUD operations at endpoints like /contacts.
* Controllers: Handle business logic for each operation (e.g., adding, updating contacts).
* Database: MongoDB stores contact data, with Mongoose for schema modeling.
* Validation & Error Handling: Includes checks for required fields, email formats, and unique constraints.

**Frontend**
* Components:
    * ContactsTable: Displays contacts in a paginated, sortable table.
    * Form: Manages adding and editing contact information with validation.
    * Pagination & Sorting: Managed by MUI components (TablePagination and TableSortLabel).
* State Management: Managed with useState hooks and props passed between components.
* Navigation: React Router handles navigation between pages (e.g., editing contact details).

## Running Tests
To test API endpoints or other functionality, use tools like Postman or ThunderClient

## Future Improvements
* Add user authentication and authorization for secure data access.
* Implement additional filters and advanced search functionality.
* Consider Dockerization for consistent environment setups.



