import { Mongo } from 'meteor/mongo';
 
export const Inventory_Items = new Mongo.Collection('inventory_items');

Inventory_Items.allow({
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

Inventory_Items.attachSchema(new SimpleSchema({
	item_id: {
		type: Number,
		label: "item_id",
		decimal: false,
		optional: true
	},
	location_id: {
		type: Number,
		label: "location_id", 
	},
	box_length: {
		type: Number,
		label: "box_length",
		optional: true 
	},
	box_width: {
		type: Number,
		label: "box_width",
		optional: true 
	},
	box_height: {
		type: Number,
		label: "box_height",
		optional: true 
	},
	item_length: {
		type: Number,
		label: "item_length",
		optional: true 
	},
	item_width: {
		type: Number,
		label: "item_width",
		optional: true 
	},
	item_height: {
		type: Number,
		label: "item_height",
		optional: true 
	},
	item_description: {
		type: String,
		label: "item_description",
		max: 500, 
		optional: true 
	},
	brand: {
		type: String,
		label: "brand",
		max: 200, 
		optional: true
	},
	model_number: {
	 	type: String,
	 	label: "model_number",
	 	max: 200, 
		optional: true
	},
	price: {
		type: Number,
		label: "price",
		decimal: true
	}
}));


