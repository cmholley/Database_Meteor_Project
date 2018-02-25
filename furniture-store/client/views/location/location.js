import { Template } from 'meteor/templating';

import { Locations } from '../../../both/collections/locations.js';

Tracker.autorun(function(){
	Meteor.subscribe('allLocations');
});

Template.locationList.helpers({
	locations() {
		return Locations.find({}, {sort: {location_id: 1}});
	}
});

Template.location.events({
	'click .deleteLocation': function(){
		Locations.remove(this._id);
	},
	'click .editLocation': function(){
		Locations.simpleSchema().namedContext('updateForm').resetValidation();
		Locations.simpleSchema().namedContext('insertForm').resetValidation();		
		Session.set('editLocationId', this._id);
	},
	'click .cancelLocation': function(){
		Locations.simpleSchema().namedContext('updateForm').resetValidation();
		Locations.simpleSchema().namedContext('insertForm').resetValidation();
		Session.set('editLocationId', null);
	},  
	'click .saveLocation': function(){
		saveLocation();
	},
	'keypress input': function(e){
		if(e.keyCode === 13){
			saveLocation();
		}
		else if(e.keyCode === 27){
			Session.set('editLocationId', null);
		}
	}
});

Template.location.helpers({
	editing: function(){
		return Session.equals('editLocationId', this._id);
	} 
});

var addLocation = function(){
	var locationId = Locations.findOne({}, {sort: {location_id: -1}}).location_id +1;
	var newLocation = {
		location_id: locationId,
		address_line1: $('#address_line1').val(),
		address_line2: $('#address_line2').val(),
		address_city: $('#address_city').val(),
		address_state: $('#address_state').val(),
		address_zipcode: $('#address_zipcode').val(),
		manager_id: $('#manager_id').val(),
		phone_number: $('#phone_number').val(),
		hours: $('#hours').val(),
		square_footage: $('#square_footage').val(),
		subtype: $('#subtype').val()
	};

	Locations.insert(newLocation, {validationContext: 'insertForm'}, function(error, result) {
		if(!error){
			this.$('form').find('input:text').val('');
			$('#address_line1').focus();
		}
	});
}

var resetForm = function(template){
	template.$('form').find('input:text').val('');
	template.$('#addLocationAccordion').accordion('close', 0);
	Locations.simpleSchema().namedContext('insertForm').resetValidation();
}

Template.addLocation.events({
	'submit form': function(e, template){
		addLocation();
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

Template.addLocation.rendered = function(){
	var self = this;
	$('#addLocationAccordion.ui.accordion').accordion({
		onOpen: function(){
			self.$('#address_line1').focus();
		}
	});
}

var saveLocation = function(){
	var editLocation = {
		address_line1: $('#edit_address_line1').val(),
		address_line2: $('#edit_address_line2').val(),
		address_city: $('#edit_address_city').val(),
		address_state: $('#edit_address_state').val(),
		address_zipcode: $('#edit_address_zipcode').val(),
		manager_id: $('#edit_manager_id').val(),
		phone_number: $('#edit_phone_number').val(),
		hours: $('#edit_hours').val(),
		square_footage: $('#edit_square_footage').val(),
		subtype: $('#edit_subtype').val(),
	}
	Locations.update(Session.get('editLocationId'), {$set: editLocation}, {validationContext: 'updateForm'}, function(error, result) {
		if(!error){
			Session.set('editLocationId', null);
		}
	});
}

Template.locationSearch.events({
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

Template.locationSearch.helpers({
	searchValue: function() {
		var searchQuery = Session.get('searchQuery');

		if(searchQuery && searchQuery[this.columnName]){
			return searchQuery[this.columnName];
		} else {
			return '';
		}
	}
});