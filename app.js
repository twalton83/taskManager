const express = require('express')
const Task = require('./models/tasks.js')
const User = require('./models/users');
const bodyParser = require('body-parser')
const app = express();
const passport = require('passport');
const localStrategy = require("passport-local");
const mongoose = require('mongoose')
const indexRoutes = require('./routes/index')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const logoutRoutes = require('./routes/logout')
const taskRoutes = require('./routes/tasks')
const secret = require('./config.json').secret

//const middleware = require('/middleware/index.js')

const PORT = process.env.PORT || 5500
const uri = process.env.DATABASEURL || "mongodb://localhost/taskManager";
mongoose.connect(uri,
{ useNewUrlParser: true, useUnifiedTopology: true }, () => { })
        .catch(err => console.log(err));

        
app.set('view engine', "ejs");
app.use(express.static(__dirname + '/public'));

app.use(require('express-session')({
    secret: secret,
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
app.use(indexRoutes)
app.use("/register", registerRoutes)
app.use("/login", loginRoutes)
app.use("/logout", logoutRoutes)
app.use("/tasks", taskRoutes)







app.listen(PORT, process.env.IP, () => {
    console.log("Server is live.")
})

