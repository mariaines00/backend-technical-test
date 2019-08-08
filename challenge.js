const fs = require('fs');
const Call = require('./call.js');

/* 'main' function */
(function () {

	const input_file = process.argv[2]; // get file name

	try {
		let data = fs.readFileSync(input_file, 'utf8');
		let allCalls = parseCalls(data);

		let result = calculateFinalCost(allCalls);
		console.log(result);

	} catch (e) {
		console.log('Error:', e.message);
	}

})();

/**
 * Given the raw data from the file (provided it comes properly formated)
 * 	will create an array containing the newly created call objects
 * 
 * @param {*} data 
 */
function parseCalls(data) {
	const aux_calls = data.split(/\r\n|\r|\n/g); //by lines

	let parsed_calls = aux_calls.map(call => {
		const call_data = call.split(';');
		const starter = call_data[2];

		const call_start = new Date(`1995-02-09T${call_data[0]}`);
		const call_end = new Date(`1995-02-09T${call_data[1]}`);
		const call_duration = call_end - call_start; //elapsed time in milliseconds
		
		return new Call(starter, call_duration);
	});

	return parsed_calls; //[] of calls formated
}

/**
 * Iterates thru the array containing all calls and calculates the final amount,
 * then finds the user that had the highest calls and removes that value from
 * the total
 * 
 * @param Call[] calls 
 */
function calculateFinalCost(calls) {
	let total = 0.0;
	let current_max = 0.0;
	let current_max_caller = '';
	let debt_to_forgive = 0.0;

	calls.forEach(call => {
        total+=call.cost;
		//find caller to 'forgive'
		if(call.cost>current_max) {
			current_max = call.cost;
			current_max_caller = call.starter;
		}
	});

	//find amount to forgive //TODO: add map filter and reduce
	for (let call of calls) {
		if(call.starter === current_max_caller) {
			debt_to_forgive+=call.cost;
		}
	}

	let result = total-debt_to_forgive;
	return +result.toFixed(2); //pretty value
}

module.exports = calculateFinalCost;