const express = require('express')
const Task = require('./models/tasks.js')
const User = require('./models/users');
const bodyParser = require('body-parser')
const app = express();
const passport = require('passport');
const localStrategy = require("passport-local");
const mongoose = require('mongoose')
//const middleware = require('/middleware/index.js')

const url = process.env.DATABASEURL || "mongodb://localhost/taskManager";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})


app.set('view engine', "ejs");
app.use(express.static(__dirname + '/public'));

app.use(require('express-session')({
    secret: "hello",
    resave: false,
    saveUninitialized: false
}));

//this is necessary to parse POSTS
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    //anything in res.locals is passed to all templates
    res.locals.currentUser= req.user;
  
    next();
})





app.get('/', function(req, res) {
    res.render('index');
});

app.post('/addTask', (req, res) =>{
    let newTask = {
        title : req.body.title,
        completionStatus : false,
        dueDate : undefined,
        dateCreated : new Date(),
        author: req.user._id
    }
    Task.create(newTask, (err, newlyCreatedTask)=>{
        err ? console.log(err)  : console.log(newlyCreatedTask)
    })

    
  
    
})


app.get('/login', (req, res) =>{
    res.render('login')
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect:"/login"
}), function(req, res){
});

app.get('/register', (req, res) =>{
    res.render('register')
})


app.post('/register', (req, res) => {
    console.log(req.body)
    const newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            return res.redirect('/')
        }
        passport.authenticate('local')(req, res, () =>{
            res.redirect('/')
        })
    }) 
})

app.get('/logout', (req, res) =>{
    req.logout()
    res.redirect('/')
}) 
app.listen(5500, () => {
    console.log('Server is running at port 5500');
})

