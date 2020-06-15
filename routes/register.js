const express = require('express')
const app = express();
const router = express.Router()
const passport = require('passport');
const User = require('../models/users.js')

router.get('/', (req, res) =>{
    res.render('register')
})

router.post('/', (req, res) => {
    console.log(req.body)
    const newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            res.send(err)
            return res.redirect('/')
           
        }
        passport.authenticate('local')(req, res, () =>{
            return res.redirect('/tasks')
        })
    })
})

module.exports = router