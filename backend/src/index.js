
const express=require('express')
const cors=require('cors')
const {task}=require('./db')
const {createTask,updateTask,updateCompleted,deleteTask}=require('./types')

const app= express()

app.use(express.json())
app.use(cors())

app.get('/tasks', async (req, res) => {  // retrieving all tasks from db
    try {
        const tasks = await task.find({});
        console.log(tasks);
        res.json({
            tasks
        });
    } catch (error) {
       
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
});

app.post('/task', async (req, res) => {  // adding a task in db

    console.log(req.body);

    try {
        const valid = createTask.safeParse(req.body);
        if (!valid.success) {
            return res.status(411).json({
                msg: "invalid inputs",
                errors: valid.error.issues
            });
        }
        await task.create({
                title: req.body.title,
                description: req.body.description,
                completed: false,
                due: req.body.due,
                category: req.body.category
        });
        res.json({
            msg: "Task added"
        });
    } catch (error) {
        console.error('Error creating task:', error); 
        res.status(500).json({
            msg: "server error",
            error: error.message
        });
    }
});

app.put('/completed', async (req, res) => {   // updating completed status of a task
    const { id, completed } = req.body;
    console.log(req.body);

    try {
        const valid = updateCompleted.safeParse(req.body);
        if (!valid.success) {
            return res.status(411).json({
                msg: "invalid inputs",
                errors: valid.error.issues
            });
        }
        const getTask = await task.findById(id);

        if (!getTask) {
            return res.status(404).json({ msg: "Task not found" });
        }
        if (getTask.completed===true && valid.data.completed===true) {
            return res.status(400).json({ msg: "Task is already completed" });
        }

        getTask.completed = valid.data.completed;

        await getTask.save({ validateBeforeSave: true });

        res.json({
            msg: "Task updated",
            task: getTask
        });

    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
});

app.put('/update', async (req, res) => {  // updating details of task
    const id = req.body.id;
    console.log(req.body);
    

    try {
        const valid = updateTask.safeParse(req.body);
        if (!valid.success) {
            return res.status(411).json({
                msg: "invalid inputs",
                errors: valid.error.issues
            });
        }
        const updatedTask = await task.findByIdAndUpdate(
            id,
            {
                $set: valid.data 
            },
            {
                new: true,   // Return the updated document
                runValidators: true    // Apply schema validation
            }
        );
        if (!updatedTask) {
            return res.status(404).json({ msg: "Task not found" });
        }
        if (req.body.completed===true && updatedTask.completed===true) {
            return res.status(400).json({ msg: "Task is already completed" });
        }
        res.json({
            msg: "Task updated",
            task: updatedTask
        });
    } catch (error) {
       
        console.error('Error updating task:', error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
});

app.delete('/delete',async(req,res)=>{  // delete a particular task through id
    try {

        const valid = deleteTask.safeParse(req.body);
        if (!valid.success) {
            return res.status(411).json({
                msg: "invalid inputs",
                errors: valid.error.issues
            });
        }

        const taskId = req.body.id;
        const deletedTask = await task.findByIdAndDelete(taskId);
    
        if (!deletedTask) {
          return res.status(404).json({ message: 'Task not found' });
        }
    
        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });

      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
})

module.exports = app;