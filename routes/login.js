
const express = require('express')
const router = express.Router()
const passport = require('passport');


router.get('/', (req, res) =>{
    res.render('login')
})

router.post("/", passport.authenticate("local", {
    successRedirect: "/tasks",
    failureRedirect:"/login"
}), function(req, res){
    return res.redirect('/tasks')
});

module.exports = router