import { Mongo } from 'meteor/mongo';
 
export const Locations = new Mongo.Collection('locations');

Locations.allow({
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

Locations.attachSchema(new SimpleSchema({
	location_id: {
		type: Number,
		label: "location_id",
		decimal: false,
		optional: true
	},
	address_line1: {
		type: String,
		label: "address_line1",
		max: 200, 
		optional: true 
	},
	address_line2: {
		type: String,
		label: "address_line2",
		max: 200,
		optional: true 
	},
	address_city: {
		type: String,
		label: "address_city",
		max: 200, 
		optional: true 
	},
	address_state: {
		type: String,
		label: "address_state",
		max: 2, 
		optional: true,
		allowedValues: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI"]
	},
	address_zipcode: {
	 	type: String,
	 	label: "address_zipcode",
	 	regEx: /^[0-9]{5}$/, 
		optional: true
	},
	manager_id: {
		type: Number,
		label: "manager_id"
	},
	phone_number: {
		type: String,
		label: "phone_number",
		regEx: /^\d{3}-\d{3}-\d{4}$/
	},
	hours: {
		type: String,
		label: "hours",
		max: 200,
		optional: true
	},
	square_footage: {
		type: Number,
		label: "square_footage",
		optional: true
	},
	subtype: {
		type: String,
		label: "subtype",
		allowedValues: ["warehouse","store"]
	}
}));


