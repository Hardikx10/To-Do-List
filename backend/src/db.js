const mongoose = require("mongoose");
require('dotenv').config()

const url=process.env.DATABASE_URL
mongoose.connect(url)

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
    },
    due: {
      type: String,
    },
    category: {
      type: String,
      enum: ['work', 'personal', 'hobby', 'others'],
      default: 'others',
    },
    completed:{
        type:Boolean,
    }
  });

const task = mongoose.model('tasks', taskSchema);

module.exports = {
    task
}