const express= require('express');
const router = express.Router();
const Task = require('../models/tasks.js');
const User = require('../models/users.js')
let bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get("/", function(req,res){
    res.render("showTasks.ejs")
});

router.post('/', (req, res) =>{
    let title = req.body.taskText;
    let description = ''
    let completionStatus = false;
    let dueDate = undefined;
    let dateCreated = new Date();
    let author = req.user._id;
    let newTask = {
        title : title,
        completionStatus : completionStatus,
        dueDate : dueDate,
        dateCreated : dateCreated,
        author: author,
        description: description
    }
    User.findById(req.user._id, (err, user)=>{
        if(err){
            console.log(err)
        } else {
        Task.create(newTask, (err, newlyCreatedTask)=>{
            if(err){
            console.log(err) 
            } else {
                newlyCreatedTask.author.id = req.user._id;
                user.tasks.push(newlyCreatedTask)
                newlyCreatedTask.save();
                user.save()
                res.redirect("/tasks")
            }
        })
    }

})
    
})


router.post('/completeTask', async (req, res) =>{
    let taskId = req.body.id;
    const task = await Task.findById(taskId)
    let authorId = task.author.id
    const user = await User.findById(authorId)
    user.tasks.id(taskId).completionStatus = true
    user.save()
    res.redirect("/tasks")
})


router.post('/incompleteTask', async (req, res) =>{
    let taskId = req.body.id;
    const task = await Task.findById(taskId)
    let authorId = task.author.id
    const user = await User.findById(authorId)
    user.tasks.id(taskId).completionStatus = false
    user.save()
    res.redirect("/tasks")
})


router.delete('/:id', (req, res) =>{
    Task.findById(req.params.id, async (err, task)=>{
        if(err){
            console.log(err)
        } else{
            const user = await User.findById(task.author.id)
            user.tasks.id(req.params.id).remove()
            user.save()
            console.log(user.tasks)
            res.status(204).send()
        }
    })
})
module.exports = router