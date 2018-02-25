import { Mongo } from 'meteor/mongo';
 
export const Customers = new Mongo.Collection('customers');

Customers.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return userId;
  }
});

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
	},
	home_address_line1: {
		type: String,
		label: "home_address_line1",
		max: 200, 
		optional: true 
	},
	home_address_line2: {
		type: String,
		label: "home_address_line2",
		max: 200,
		optional: true 
	},
	home_address_city: {
		type: String,
		label: "home_address_city",
		max: 200, 
		optional: true 
	},
	home_address_state: {
		type: String,
		label: "home_address_state",
		max: 2, 
		optional: true,
		allowedValues: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI"]
	},
	home_address_zipcode: {
	 	type: String,
	 	label: "home_address_zipcode",
	 	regEx: /^[0-9]{5}$/, 
		optional: true
	},
	phone_number: {
		type: String,
		label: "phone_number",
		regEx: /^\d{3}-\d{3}-\d{4}$/
	},
	email: {
		type: String,
		label: "email",
		regEx: SimpleSchema.RegEx.Email
	}
}));


