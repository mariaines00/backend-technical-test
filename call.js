class Call {

	constructor(starter, duration) {
		this._starter = starter;
		this._duration = duration;
		this._cost = this.calculateCallCost();
	}
	// Getters
	get starter() {
		return this._starter;
	}
	get duration() {
		return this._duration;
	}
	get cost() {
		return this._cost;
	}

	//consts
	static get five_minutes() { return 300000; }
	static get one_minute() { return 60000; }
	static get five_cents() { return 0.05; }
	static get two_cents() { return 0.02; }

	/**
	 * Method
	 * Calculates a sigle call cost according to the rules;
	 * While the aux_duration value is more than one minute, charge the user 
	 * Returns the cost as a number
	 */
	calculateCallCost() {
		let aux_duration = this.duration;
		let aux_cost = 0.0;
		
		while(aux_duration > 1) {			
			if (aux_duration < Call.five_minutes) { // The first 5 minutes of each call are billed at 5 cents per minute
				aux_cost+=Call.five_cents;
			} else { // The remainer of the call is billed at 2 cents per minute
				aux_cost+=Call.two_cents;
			}
			aux_duration-=Call.one_minute;
		}
		return aux_cost;
	}

}

module.exports = Call;