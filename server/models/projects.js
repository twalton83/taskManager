const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Task = require('./tasks.js')
const TaskSchema = mongoose.model('Task').schema;
const Schema = mongoose.Schema
const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    tasks : {type: [TaskSchema], default: []},
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Project", projectSchema)