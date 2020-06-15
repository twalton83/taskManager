'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const dbHandler = require('./dbhandler');
const User = require('../models/users')
const Task = require('../models/tasks');
const { deleteOne } = require('../models/tasks');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);


before(async () => {
    await dbHandler.connect();
});

after(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
});



describe('============== Users ============== ', () => {
  xit('add user to database', async()=>{
      User.create({username: "Tatiana", password: "hello"}, (err, user) => {
        if (err){
          console.log(err)
        } else{
          user.save()
        }
      }) 
      User.create({username: "Jesse", password: "hello"}, (err, user) => {
        if (err){
          console.log(err)
        } else{
          user.save()
        }
      }) 
      const cnt = await User.countDocuments();
        expect(cnt).to.equal(2);
  })
  xit('Dont save incorrect format to database', function(done) {
    var wrongSave = User({
      notName: 'Not Mike'
    });
    wrongSave.save(err => {
      if(err) { return done();}
      throw new Error('Should generate error!');
    });
  });
  xit('Should retrieve data from test database', async()=> {
  User.findOne({username: 'Tatiana'}, (err, user) => {
      if(err) {throw err;}
      if(User.length === 0) {throw new Error('No data!');}
      if(user){
        console.log(user, " - retrived from database")
      }
    });
  });
  xit('Should add task to user', async () =>{
    User.findOne({username: 'Tatiana'}, (err, user) => {
      if(err) {throw err;}
      if(user){
        const newTask = new Task({title: "A Test Task", description: "This is a description"})
        const newTask2 = new Task({title: "A Test Task 2", description: "This is a description"})
        newTask.author.id = user._id;
        newTask2.author.id = user._id;
        user.tasks.push(newTask)
        user.tasks.push(newTask2)
        user.save()
      expect(user.tasks.length).to.equal(2)
      }
    });
  })
  xit('task should persist', async () => {
    User.findOne({username: 'Tatiana'}, (err, user) => {
      if(err) {done()}
      if(user.tasks.length === 0) {throw new Error('No tasks!');}
     console.log(user.tasks)
      expect(user.tasks.length).to.equal(2)
    });
  })
})


describe('============== Tasks ============== ', ()=>{
  xit('should create new tasks', async ()=>{
    const newTask = new Task({title: "A Test Task", description: "This is a description"})
    console.log(newTask)
    newTask.save()
    if(Task.length === 0) {throw new Error('Task was not saved!');}
  })
  xit('should update description', async () =>{
    Task.findOneAndUpdate({title: 'A Test Task'}, {description: "I made a better description."})
    Task.findOne({title: 'A Test Task'}, (err, task) =>{
      if(err){
        done()
      } else {
        task.save()
        console.log(task.description)
        expect(task.description)
      }

    })
  })
})
