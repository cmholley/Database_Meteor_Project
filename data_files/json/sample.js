Customers.attachSchema(new SimpleSchema({
	customer_id: {
		type: Number,
		label: "customer_id",
		decimal: false,
		optional: true
	},
	first_name:  {
		type: String,
		label: "first_name",
		max: 200 
	},
	mid_initial:  {
		type: String,
		label: "mid_initial",
		max: 1, 
		optional: true
	},
	last_name:  {
		type: String,
		label: "last_name",
		max: 200 
	}
	...
}));


Customers.insert(newCustomer, {validationContext: 'insertForm'}, function(error, result) {
		if(!error){
			this.$('form').find('input:text').val('');
			$('#first_name').focus();
		}
	});
