'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const dbHandler = require('./dbhandler');
const User = require('../models/users')
const Task = require('../models/tasks')


before(async () => {
    await dbHandler.connect();
});

after(async () => {
    await dbHandler.closeDatabase();
    //   await dbHandler.clearDatabase();
});

afterEach(async () =>{
 
})

describe('...', () => {
  it('add user to database', async()=>{
      const newUser = new User({name: "Tatiana"})
      newUser.save()
      const cnt = await User.count();
        expect(cnt).to.equal(1);
  })
  it('Dont save incorrect format to database', async ()=> {
    //Attempt to save with wrong info. An error should trigger
    let wrongSave = new User({notName: 'Not Mike'});
    wrongSave.save(err => {
      if(err) {throw new Error('This is the wrong type!');}
    });
  });
  it('Should retrieve data from test database', async()=> {
    User.find({name: 'Tatiana'}, (err, user) => {
      if(err) {throw err;}
      if(user.length === 0) {throw new Error('No data!');}
    });
  });
  it('Should add task to user', async () =>{
      
  })
})
