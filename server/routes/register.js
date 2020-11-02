const express = require('express')
const app = express();
const router = express.Router()
const passport = require('passport');
const User = require('../models/users.js')

router.get('/', (req, res)=>{
    res.send('route hit')
})
router.post(
    '/',
    passport.authenticate('register', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  );

module.exports = router