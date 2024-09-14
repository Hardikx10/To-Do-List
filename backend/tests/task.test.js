const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');  // Import the Express app
require('dotenv').config()
// Before all tests, connect to the test database
beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// After all tests, disconnect from the test database
afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect(); 
});

// Test suite for Task routes
describe('Task Routes', () => {
    
    let taskId;

    // Test for POST /task (adding a new task)
    it('should create a new task', async () => {
        const response = await request(app)
            .post('/task')
            .send({
                title: 'Test Task',
                description: 'Test description',
                due: '2023-09-10',
                category: 'work'
            });

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Task added');
    });

    // Test for GET /tasks (retrieving all tasks)
    it('should retrieve all tasks', async () => {
        const response = await request(app).get('/tasks');
        
        expect(response.status).toBe(200);
        expect(response.body.tasks.length).toBeGreaterThan(0);
        taskId = response.body.tasks[0]._id;  // Capture taskId for later use
    });

    // Test for PUT /completed (updating completed status of a task)
    it('should update completed status of a task', async () => {
        const response = await request(app)
            .put('/completed')
            .send({
                id: taskId,
                completed: true
            });

        expect(response.status).toBe(200);
        expect(response.body.task.completed).toBe(true);
    });

    // Test for PUT /update (updating task details)
    it('should update task details', async () => {
        const response = await request(app)
            .put('/update')
            .send({
                id: taskId,
                title: 'Updated Task',
                description: 'Updated description',
                due: '2023-09-20',
                category: 'personal'
            });

        expect(response.status).toBe(200);
        expect(response.body.task.title).toBe('Updated Task');
    });

    // Test for DELETE /delete (deleting a task)
    it('should delete a task', async () => {
        const response = await request(app)
            .delete('/delete')
            .send({
                id: taskId
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted successfully');
    });
});
