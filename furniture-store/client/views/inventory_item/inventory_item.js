import { Template } from 'meteor/templating';

import { Inventory_Items } from '../../../both/collections/inventory_items.js';

Tracker.autorun(function(){
	Meteor.subscribe('allInventory_Items');
});

Template.inventory_itemList.helpers({
	inventory_items() {
		return Inventory_Items.find({}, {sort: {item_id: 1}});
	}
});

Template.inventory_item.events({
	'click .deleteInventory_Item': function(){
		Inventory_Items.remove(this._id);
	},
	'click .editInventory_Item': function(){
		Inventory_Items.simpleSchema().namedContext('updateForm').resetValidation();
		Inventory_Items.simpleSchema().namedContext('insertForm').resetValidation();		
		Session.set('editInventory_ItemId', this._id);
	},
	'click .cancelInventory_Item': function(){
		Inventory_Items.simpleSchema().namedContext('updateForm').resetValidation();
		Inventory_Items.simpleSchema().namedContext('insertForm').resetValidation();
		Session.set('editInventory_ItemId', null);
	},  
	'click .saveInventory_Item': function(){
		saveInventory_Item();
	},
	'keypress input': function(e){
		if(e.keyCode === 13){
			saveInventory_Item();
		}
		else if(e.keyCode === 27){
			Session.set('editInventory_ItemId', null);
		}
	}
});

Template.inventory_item.helpers({
	editing: function(){
		return Session.equals('editInventory_ItemId', this._id);
	} 
});

var addInventory_Item = function(){
	var inventory_itemId = Inventory_Items.findOne({}, {sort: {item_id: -1}}).item_id +1;
	var newInventory_Item = {
		item_id: inventory_itemId,
		item_id: $('#item_id').val(),
		location_id: $('#location_id').val(),
		box_length: $('#box_length').val(),
		box_width: $('#box_width').val(),
		box_height: $('#box_height').val(),
		item_length: $('#item_length').val(),
		item_width: $('#item_width').val(),
		item_height: $('#item_height').val(),
		item_description: $('#item_description').val(),
		brand: $('#brand').val()

	};

	Inventory_Items.insert(newInventory_Item, {validationContext: 'insertForm'}, function(error, result) {
		if(!error){
			this.$('form').find('input:text').val('');
			$('#address_line1').focus();
		}
	});
}

var resetForm = function(template){
	template.$('form').find('input:text').val('');
	template.$('#addInventory_ItemAccordion').accordion('close', 0);
	Inventory_Items.simpleSchema().namedContext('insertForm').resetValidation();
}

Template.addInventory_Item.events({
	'submit form': function(e, template){
		addInventory_Item();
		return false;
	},
	'click #cancelButton': function(e, template){
		resetForm(template);
	},
	'keypress input': function(e, template){
		if(e.keyCode === 27){
			resetForm(template);
		} 
	}
});

Template.addInventory_Item.rendered = function(){
	var self = this;
	$('#addInventory_ItemAccordion.ui.accordion').accordion({
		onOpen: function(){
			self.$('#address_line1').focus();
		}
	});
}

var saveInventory_Item = function(){
	var editInventory_Item = {
		item_id: $('#edit_item_id').val(),
		location_id: $('#edit_location_id').val(),
		box_length: $('#edit_box_length').val(),
		box_width: $('#edit_box_width').val(),
		box_height: $('#edit_box_height').val(),
		item_length: $('#edit_item_length').val(),
		item_width: $('#edit_item_width').val(),
		item_height: $('#edit_item_height').val(),
		item_description: $('#edit_item_description').val(),
		brand: $('#edit_brand').val()

	}
	Inventory_Items.update(Session.get('editInventory_ItemId'), {$set: editInventory_Item}, {validationContext: 'updateForm'}, function(error, result) {
		if(!error){
			Session.set('editInventory_ItemId', null);
		}
	});
}

Template.inventory_itemSearch.events({
	'keyup .searchInput': _.throttle(function(e, t) {
		var searchQuery = Session.get('searchQuery') || {};
		var searchValue = t.$('.searchInput').val();

		if(searchValue){
			if(this.number){
				searchValue = parseFloat(t.$('.searchInput').val());
			}

			searchQuery[this.columnName] = searchValue;
		}else{
			delete searchQuery[this.columnName];
		}
		Session.set('searchQuery', searchQuery);


	},500)
});

Template.inventory_itemSearch.helpers({
	searchValue: function() {
		var searchQuery = Session.get('searchQuery');

		if(searchQuery && searchQuery[this.columnName]){
			return searchQuery[this.columnName];
		} else {
			return '';
		}
	}
});