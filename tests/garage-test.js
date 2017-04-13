require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const $ = require('jquery');
const Garage = require('../public/index.js');
const jsdom = require('mocha-jsdom')
// global.document = require('jsdom').jsdom('<html></html>');
// global.window = document.defaultView;
// global.$ = require('jquery')(window);

describe ('Garage', function() {

  it('should exist', () => {
    expect(garage).to.exist
  });

  it.skip('should start closed', () => {
    expect('#open-btn').to.have.length(1)
  });

  it.skip('should have a list of items in the garage', () => {
    Garage.openGarage();
    Garage.showJunk();
    expect('li').to.have.length(3)
  });
});
