# To-Do List Application

## Overview

This To-Do List application allows users to manage tasks with features such as creating, updating, deleting, and marking tasks as completed. It is built using Node.js, Express, and MongoDB, with Zod for input validation and Jest for testing.

## Features

- **Create a Task**: Add new tasks with title, description, due date, and category.
- **Retrieve Tasks**: Get a list of all tasks.
- **Update Task Details**: Modify the title, description, due date, or category of an existing task.
- **Update Task Completion Status**: Mark a task as completed or not completed.
- **Delete a Task**: Remove a task from the list.


### Installation

1. **Clone the Repository**

   git clone https://github.com/Hardikx10/To-Do-List.git
   
2. **Install Dependencies**

- cd To-Do-list/backend
- npm install 

3. **Set Up Environment Variables**

- Create a .env file in the backend directory and add the following:
- DATABASE_URL="your mongo database url"

4. **Run the Application**
    
    - npm start

    - The server will start on http://localhost:3000.

5. **For Testing the Application**

    - npm test


### API Endpoints

1. **POST /task**: Create a new task.
- Request Body: {
    "title": "string",
    "description": 
    "string",
    "due": "string",
    "category": "string" ('work', 'personal', 'hobby', 'others')
    }

2. **GET /tasks**: Retrieve all tasks.

3. **PUT /completed**: Update the completion status of a task.
- Request Body: {
    "id": "string",
    "completed": "boolean"

    }

4. **PUT /update**: Update task details.
- Request Body:{

    "id": "string",
    "title": "string (optional)",
    "description": "string (optional)",
    "due": "string (optional)",
    "category": "string (optional)",
    "completed": "boolean (optional)"
    }

5. **DELETE /delete**: Delete a task.
- Request Body: {
    "id": "string"
    }

### Code Structure

- src/index.js: This file sets up Express and API routes.
- src/db.js: Contains the database connection logic using Mongoose and defines the Task model.
- src/types.js: Defines Zod schemas for validating incoming data to ensure it meets the expected format and    constraints.
- src/server.js: This file is used for starting the server on port 3000.
- tests/task.test.js: Contains unit tests for the API endpoints, implemented using Jest and Supertest to verify that the endpoints are functioning correctly.


### Key Decisions
- Validation: Zod is used for schema validation to ensure data integrity and provide detailed error messages. This decision enhances data consistency and simplifies error handling.

- Database: MongoDB with Mongoose was chosen for its flexibility in handling documents with varying attributes and its seamless integration with JavaScript. This allows for a more dynamic and scalable data model.

- Testing: Jest is used for unit testing to ensure that API endpoints work as expected and handle edge cases properly.

- Error Handling: Comprehensive error handling is implemented across all routes to catch and respond to potential issues, improving the reliability and robustness of the application.

