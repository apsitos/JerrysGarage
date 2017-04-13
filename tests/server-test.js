process.env.NODE_ENV = 'test'
const config = require('../knexfile.js')['test']
const knex = require('knex')(config)

const chai = require('chai');
const expect = chai.expect;
const app = require('../server.js')
const chaiHttp = require('chai-http');
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Server', () => {
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });
  afterEach((done)=>{
    knex.migrate.rollback()
    .then(()=>{
      done()
    })
  });

  it('should exist', () => {
    expect(app).to.exist
  });

  describe('GET /', ()=>{
    it('should return html successfully',(done)=>{
      chai.request(app)
      .get('/')
      .end((error, response)=>{
        if(error) { done(error); }
        expect(response).to.have.status(200)
        expect(response).to.be.html
        done();
      });
    });
  });

//get all the garage items
  describe('GET /api/v1/junk', () => {
    it('should retrieve the junk', (done) => {
      chai.request(app)
      .get('/api/v1/junk')
      .end((error, response) => {
        if(error) { done(error); }
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response).to.be.a('array')
        expect(response).to.have.length(3)
        done();
      });
    });
  });

//get one item from the garage
  describe('GET /api/v1/junk/:id', () => {
    it('should retrieve one item from the garage', (done) => {
      chai.request(app)
      .get('/api/v1/junk/1')
      .end((error, response) => {
        if(error) { done(error); }
        expect(response).to.have.status(200)
        expect(response).to.be.json
        done();
      })
    })
  })
});
