 var chai = require('chai')
  , chaiHttp = require('chai-http');
  chai.use(chaiHttp);
const app = require('../app');
const { expect } = require('chai');
chai.use(chaiHttp);
// should get / 
var request = chai.request(app).keepOpen()

after(()=>{
  request.close()
})

describe('======= INDEX ROUTE =======', () => {
    it('should get 200 status', (done) =>{
        request
        .get('/')
        .end((err, res) => {
            expect(res).to.have.status(200)
            done();
        });
    });
      it('Should not get 200', (done) =>{
        request
        .get('/abc')
        .end((err, res) => {
            expect(res).to.have.status(404)
            console.log(res.status)
            done()
        });
     });
})


describe('======= REGISTER ROUTES =======',()=>{
  it('Register 200 status', (done) =>{
    request
    .get('/register')
    .end((err, res) => {
        expect(res).to.have.status(200)
        done()
    });
  })
  it('POST request for new user - 200 Status', (done) =>{
    request
    .post('/register')
    .type('form')
    .send({
      '_method' : 'post',
      'username' : 'test',
      'password' : 'password'
    })
    .end((err, res) => {
        expect(res).to.have.status(200)
        done()
    });
  })
  it('Throw Error', (done) =>{
    request
    .put('/register')
    .end((err, res) => {
      if(err){
        throw new Error('You cannot use a PUT here!')
      }
        expect(res).to.have.status(404)
        done()
    });
  })
})



describe('======= TASK ROUTES =======',()=>{
  it('Register 200 status', (done) =>{
    request
    .get('/tasks')
    .end((err, res) => {
        expect(res).to.have.status(200)
        done()
    });
  })
  xit('Register 200 status', (done) =>{
    request
    .post('/register')
    .end((err, res) => {
        expect(res).to.have.status(200)
        done()
    });
  })
})

