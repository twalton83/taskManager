const express= require('express');
const router = express.Router();
const cors = require('cors')


router.get("/", function(req,res, next){
    res.send('hello')
});

module.exports = router