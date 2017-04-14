process.env.NODE_ENV = 'test'

const chai = require('chai');
const expect = chai.expect;
const app = require('../server.js')
const chaiHttp = require('chai-http');
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Server', () => {
  beforeEach(function(done) {
    database.migrate.rollback()
    .then(function() {
      database.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach((done)=>{
    database.migrate.rollback()
    .then(()=>{
      done()
    });
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
        expect(response.body).to.be.a('array')
        expect(response.body).to.have.length(3)
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
        expect(response.body[0].name).to.equal('books')
        done();
      });
    });
    
    it('should return an error if the item is not in the garage', (done) => {
      chai.request(app)
      .get('/api/v1/junk/5')
      .end((error, response) => {
        expect(response).to.throw
        done()
      });
    });
  });

//get a sorted list
  describe('GET /api/v1/junk/sortup', () => {
    it('should retrieve the list sorted A-Z', (done) => {
      chai.request(app)
      .get('/api/v1/junk/sortup')
      .end((error, response) => {
        if(error) { done(error); }
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response.body[0].name).to.equal('bike')
        done();
      });
    });
  });

  describe('GET /api/v1/junk/sortdown', () => {
    it('should retrieve the list sorted Z-A', (done) => {
      chai.request(app)
      .get('/api/v1/junk/sortdown')
      .end((error, response) => {
        if(error) { done(error); }
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response.body[0].name).to.equal('skis')
        done();
      });
    });
  });

//add an item to the db
  describe('POST /api/v1/junk', () => {
    it('should be able to post to the db', (done) => {
      chai.request(app)
      .post('/api/v1/junk')
      .send({
        id: 4,
        name: 'tent',
        reason: 'Going camping next year',
        cleanliness: 'rancid',
        created_at: new Date
      })
      .end((error, response) => {
        if(error) { done(error); }
        expect(response).to.have.status(200)
        expect(response).to.be.json
        expect(response.body).to.have.length(4)
        done();
      });
    });
    it('should return an error if it is missing info', (done) => {
      chai.request(app)
      .post('/api/v1/junk')
      .send({
        id: 4,
        name: 'tent',
        reason: 'Going camping next year'
      })
      .end((error, response) => {
        if(error) { done(error); }
        expect(response).to.throw
        done()
      });
    });
  });

//update an item
  describe('PUT /api/v1/junk/:id', () => {
    it('should be able to update an item', (done) => {
        chai.request(app)
        .put('/api/v1/junk/3')
        .send({
          cleanliness: 'rancid'
        })
        .end((error, response) => {
          if(error) { done(error); }
          expect(response).to.have.status(200)
          expect(response).to.be.json
          done()
        })
    })
  })
});
