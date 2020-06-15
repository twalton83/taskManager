const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Task = require('./tasks.js')
const TaskSchema = mongoose.model('Task').schema;
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    tasks : {type: [TaskSchema], default: []}
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", userSchema)