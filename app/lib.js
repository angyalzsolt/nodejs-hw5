/*
*
* Simple functions to test
*
*
*/

// Container for the module
let example = {};


// Generate a random number
example.generateRandomNumber = (num)=>{
	let randomNum = Math.floor(Math.random() * num);
	return randomNum;
};
// Returns the type of the input
example.checkInputType = (input)=>{
	let result = typeof(input);
	return result;
};






// Export the module
module.exports = example;