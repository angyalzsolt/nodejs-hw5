/*
*
* Unit tests
*
*
*/

// Dependencies
const assert = require('assert');
const lib = require('./../app/lib');

// Holder for theses tests
let unit = {};

// Assert that the generateRandomNumber function is returning a number
unit['lib.generateRandomNumber should return a number'] = (done)=>{
	const val = lib.generateRandomNumber(5);
	assert.equal(typeof(val), 'number');
	done();
};

// Assert the the generateRandomNumber returns a number between 0 and the given input
unit['lib.generateRandomNumber should return a number between 0 and the input'] = (done)=>{
	const val = lib.generateRandomNumber(10);
	assert.equal(typeof(val), 'number');
	assert.ok(val < 10);
	done();
};

// Assert that the checkInputType returns the type of the input
unit['lib.checkInputType should return the type of the input'] = (done)=>{
	const val = lib.checkInputType(123);
	assert.equal(val, typeof(123));
	done();
}

module.exports = unit;