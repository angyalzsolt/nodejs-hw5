/*
*
*
* Test runner
*
*
*/

// Application logic for the test runner
_app = {};

// Conatiner for the tests
_app.tests = {};

// Add the unit tests
_app.tests.unit = require('./unit.js');

// Count all the tests
_app.countTests = ()=>{
	let counter = 0;
	for(let key in _app.tests){
		if(_app.tests.hasOwnProperty(key)){
			let subTests = _app.tests[key];
			for(let testName in subTests){
				if(subTests.hasOwnProperty(testName)){
					counter++;
				}
			}
		}
	}
	return counter++;
}

// Run all the tests, collecting the errors and succeses
_app.runTest = ()=>{
	let errors = [];
	let successes = 0;
	const limit = _app.countTests();
	let counter = 0;
	for(let key in _app.tests){
		if(_app.tests.hasOwnProperty(key)){
			let subTests = _app.tests[key];
			for(let testName in subTests){
				if(subTests.hasOwnProperty(testName)){
					(function(){
						let tmpTestName = testName;
						let testValue = subTests[testName];
						// Call the test
						try{
							testValue(()=>{
								// If it calls back without throwing, than it succeded, so log it in green
								console.log('\x1b[32m%s\x1b[0m', tmpTestName);
								counter++;
								successes++;
								if(counter === limit){
									_app.produceTestReport(limit, successes, errors);
								}
							});
						} catch(e){
							// If it throws, than it failed, so capture the error thrown and log it in red
							errors.push({
								'name': testName,
								'error': e
							});
							console.log('\x1b[31%s\x1b[0m', tmpTestName);
							counter++;
							if(counter === limit){
								_app.produceTestReport(limit, successes, errors);
							}
						}
					})();
				}
			}
		}
	}
}

// Produce a test outcome report
_app.produceTestReport = (limit, successes, errors)=>{
	console.log('');
	console.log('------------------ BEGIN TEST REPORT---------------------');
	console.log('');
	console.log('Total tests: ', limit);
	console.log('Pass: ', successes);
	console.log('Fail: ', errors.length);
	console.log('');

	// If there are errors, print them in details
	if(errors.length > 0){
		console.log('----------------- BEGIN ERROR REPORT------------------------');
		console.log('');
		errors.forEach((testError)=>{
			console.log('\x1b[31m%s\x1b[0m', testError.name);
			console.log(testError.error);
			console.log('');
		});
		console.log('');
		console.log('----------------- END ERROR REPORT------------------------');
	};

	console.log('');
	console.log('----------------- END TEST REPORT------------------------');
	process.exit(0);
};

// Run the test
_app.runTest();