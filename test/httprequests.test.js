/* var chai = require('chai')
  , chaiHttp = require('chai-http');
  chai.use(chaiHttp);
const app = require('../app');
const { expect } = require('chai');

describe("test", () => {
  let server;
  const port = 5400;
  before((done) => {
    server = app.listen(port, () => {
      console.info(`HTTP server is listening on http://localhost:${port}`);
      done();
    });
  });
  after((done) => {
    server.close(done);
  });
  xit("should return 401 status code", () => {
    return app.get(`http://127.0.0.1:/${port}`).catch((err) => {
      expect(err.response.status).to.be.equal(401);
    });
  });
});

*/