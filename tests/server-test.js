process.env.NODE_ENV = 'test'
const config = require('../knexfile.js')['test']
const knex = require('knex')(config)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const chai = require('chai');
const expect = chai.expect;
const server = require('../server.js')
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
    expect(server).to.exist
  });

  describe('GET /', ()=>{
    it('should return html successfully',(done)=>{
      chai.request(server)
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
      chai.request(server)
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
      chai.request(server)
      .get('/api/v1/junk/1')
      .end((error, response) => {
        if(error) { done(error); }
        expect(response).to.have.status(200)
        expect(response).to.be.json
        done();
      });
    });
  });

  describe('POST /api/v1/junk', () => {
    it('should be able to post to the db', (done) => {
      chai.request(server)
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
        done();
      });
    });
  });

  describe('PUT /api/v1/junk/:id', () => {
    it('should be able to update an item', (done) => {
        chai.request(server)
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
