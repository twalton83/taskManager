const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String, 
    completionStatus: Boolean,
    dueDate : {type: Date, default: undefined},
    dateCreated: {type: Date, default: new Date()}
})

module.exports = mongoose.model("Task", taskSchema)