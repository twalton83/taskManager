const express = require('express')

const app = express();

app.use(express.static(__dirname + '/public'));

const mongoose = require('mongoose')

const url = process.env.DATABASEURL || "mongodb://localhost/taskManager"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/login', (req, res) =>{
    res.send('login route')
})

app.listen(5500, () => {
    console.log('Server is running at port 5500');
})

