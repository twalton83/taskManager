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
    let filter = req.body;
    const task = await Task.findOne(filter)
    let taskId = task._id;
    let authorId = task.author.id
    const user = await User.findById(authorId)
    user.tasks.id(taskId).completionStatus = true
    user.save()
    res.redirect("/tasks")
})


module.exports = router