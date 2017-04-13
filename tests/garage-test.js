require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const Garage = require('../public/index.js').default

describe ('Garage', function() {
  const garage = new Garage()

  it('should exists', () => {
    expect(garage).to.exist
  });

  it.skip('should start closed', () => {
    expect()
  })
});
