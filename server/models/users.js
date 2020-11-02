const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Task = require('./tasks.js')
const TaskSchema = mongoose.model('Task').schema;
// const ProjectSchema = mongoose.model('Project').schema
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password:{type: String, required: true},
    tasks : {type: [TaskSchema], default: []},
    // projects : {type: [ProjectSchema], default: []}
})

userSchema.pre(
    'save',
    async (next) => {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next()
    }
)

module.exports = mongoose.model("User", userSchema)