// require('babel-core/register')({
//   ignore: /node_modules\/(?!ProjectB)/
// });
//
// const chai = require('chai');
// const expect = chai.expect;
// const assert = chai.assert;
// const jquery = require('jquery');
// const garage = require('../public/index.js');
// const jsdom = require("jsdom").jsdom;
// const doc = jsdom();
// const window = doc.defaultView;
// $ = require('jquery')(window);
//
//
// describe ('Garage', function() {
//
//   it('should exist', () => {
//     expect(garage).to.exist
//   });
//
//   it('should start closed', () => {
//     expect('#open-btn').to.have.length(1)
//   });
//
//   it('should have a list of items in the garage', () => {
//     garage.openGarage();
//     garage.showJunk();
//     expect('li').to.have.length(3)
//   });
// 
//   it('should clear fields after adding to the list', () => {
//     let { name: 'bins', reason: 'moving', cleanliness: 'Dusty'} = junk
//     garage.appendJunk()
//     expect(junk.name).to.equal('')
//   });
// });
