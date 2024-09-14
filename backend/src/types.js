const zod = require("zod");

const createTask = zod.object({
    title: zod.string(),
    description: zod.string().optional(),
    due:zod.string().optional(),
    category:zod.string().optional()
})

const updateTask = zod.object({
    id:zod.string(),
    completed: zod.boolean().optional(),
    title: zod.string().optional(),
    description: zod.string().optional(),
    due: zod.string().optional(),
    category: zod.string().optional()
})
const updateCompleted= zod.object({
    id:zod.string(),
    completed: zod.boolean()
})

const deleteTask=zod.object({
    id:zod.string()
})
module.exports = {
    createTask: createTask,
    updateTask: updateTask,
    updateCompleted:updateCompleted,
    deleteTask:deleteTask
}