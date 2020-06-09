const express= require('express');
const router = express.Router();
const Task = require('../models/tasks.js');

router.get("/", function(req,res){
    res.render("index.ejs")
});

