const express = require('express')
const Task = require('./models/tasks.js')
const User = require('./models/users');
const bodyParser = require('body-parser')
const app = express();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const indexRoutes = require('./routes/index')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const logoutRoutes = require('./routes/logout')
const taskRoutes = require('./routes/tasks')
const cors = require('cors')
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('./middleware/index');

if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv')
    const env = dotenv.config()
}

//const middleware = require('/middleware/index.js')

const PORT = process.env.PORT || 5500
const uri = process.env.DATABASEURL || "mongodb://localhost/taskManager";


mongoose.connect(uri,
{ useNewUrlParser: true, useUnifiedTopology: true }, () => { })
        .catch(err => console.log(err));

    
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.use(indexRoutes)
app.use("/register", registerRoutes)
app.use("/login", loginRoutes)
app.use("/logout", logoutRoutes)
app.use("/tasks", passport.authenticate('jwt', { session: false }),taskRoutes)

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
  });
  

app.listen(PORT, process.env.IP, () => {
    console.log("Server is live.")
})

//module.exports = app
