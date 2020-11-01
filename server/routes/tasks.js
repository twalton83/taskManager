const express= require('express');
const router = express.Router();
const Task = require('../models/tasks.js');
const User = require('../models/users.js')
let bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get("/", async (req,res) => {
    res.render("showTasks.ejs")
});

router.post('/', async (req, res) =>{
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
    await User.findById(req.user._id, (err, user)=>{
        if(err){
            console.log(err)
        } else {
        Task.create(newTask, (err, newlyCreatedTask)=>{
            if(err){
            console.log(err) 
            } else {
                newlyCreatedTask.author.id = req.user._id;
                user.tasks.push(newlyCreatedTask)
                user.save()
                return res.redirect("/tasks")
            }
        })
    }

})
    
})

router.post('/completeTask', async (req, res) =>{
    let taskId = req.body.id;
    const user = await User.findById(req.user._id)
    user.tasks.id(taskId).completionStatus = true
    user.save()
    res.redirect("/tasks")
})


router.post('/incompleteTask', async (req, res) =>{
    let taskId = req.body.id;
    let authorId = req.author._id
    const user = await User.findById(authorId)
    user.tasks.id(taskId).completionStatus = false
    user.save()
    res.redirect("/tasks")
})

router.get('/:id', async (req, res) => {
    res.send('you have reached a task')
})


router.delete('/:id', async (req, res) =>{
    const user = await User.findById(req.user._id);
    user.tasks.id(req.params.id).remove()
    user.save()
    res.redirect(303, 'back')
})


module.exports = router