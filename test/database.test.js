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



describe('Users', () => {
  it('add user to database', async()=>{
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
  it('Dont save incorrect format to database', async (done)=> {
  
    let wrongSave = new User({notName: 'Not Mike'});
    function wrong(){
    wrongSave.save(err => {
      if(err) {throw new Error('This is the wrong type!');}
    });
  }
  return wrongSave().should.eventually.be.rejected;

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
    const user = User.findOne({username: 'Tatiana'}, (err, user) => {
      if(err) {throw err;}
      if(user){
        console.log(user)
        return user
      }
    });
      console.log(user, "- user")
      const newTask = new Task({title: "A Test Task", description: "This is a description"})
      newTask.author.id = user._id;
      user.tasks.push(task)
      user.save()
      expect(user.tasks.length).to.equal(1)
  })
  xit('task should persist', async() => {
    User.findOne({name: 'Tatiana'}, (err, user) => {
      if(err) {throw err;}
      if(User.length === 0) {throw new Error('No data!');}
      const tasks = user.tasks
      expect(tasks.length).to.equal(1)
    });
  })
})


describe('Tasks', ()=>{
  xit('should create new tasks', ()=>{
    const newTask = new Task({title: "A Test Task", description: "This is a description"})
    console.log(newTask)
    newTask.save()
    if(Task.length === 0) {throw new Error('No data!');}
  })
})
