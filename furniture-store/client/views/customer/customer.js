import { Template } from 'meteor/templating';

import { Customers } from '../../../both/collections/customers.js';

Tracker.autorun(function(){
	Meteor.subscribe('allCustomers');
});

Template.customerList.helpers({
	customers() {
		return Customers.find({}, {sort: {customer_id: 1}});
	}
});

Template.customer.events({
	'click .deleteCustomer': function(){
		Customers.remove(this._id);
	},
	'click .editCustomer': function(){
		Customers.simpleSchema().namedContext('updateForm').resetValidation();
		Customers.simpleSchema().namedContext('insertForm').resetValidation();		
		Session.set('editCustomerId', this._id);
	},
	'click .cancelCustomer': function(){
		Customers.simpleSchema().namedContext('updateForm').resetValidation();
		Customers.simpleSchema().namedContext('insertForm').resetValidation();
		Session.set('editCustomerId', null);
	},  
	'click .saveCustomer': function(){
		saveCustomer();
	},
	'keypress input': function(e){
		if(e.keyCode === 13){
			saveCustomer();
		}
		else if(e.keyCode === 27){
			Session.set('editCustomerId', null);
		}
	}
});

Template.customer.helpers({
	editing: function(){
		return Session.equals('editCustomerId', this._id);
	} 
});

var addCustomer = function(){
	var customerId = Customers.findOne({}, {sort: {customer_id: -1}}).customer_id +1;
	console.log(customerId)
	var newCustomer = {
		customer_id: customerId,
		first_name: $('#first_name').val(),
		mid_initial: $('#mid_initial').val(),
		last_name: $('#last_name').val(),
		home_address_line1: $('#home_address_line1').val(),
		home_address_line2: $('#home_address_line2').val(),
		home_address_city: $('#home_address_city').val(),
		home_address_state: $('#home_address_state').val(),
		home_address_zipcode: $('#home_address_zipcode').val(),
		phone_number: $('#phone_number').val(),
		email: $('#email').val()
	};

	Customers.insert(newCustomer, {validationContext: 'insertForm'}, function(error, result) {
		if(!error){
			this.$('form').find('input:text').val('');
			$('#first_name').focus();
		}
	});
}

var resetForm = function(template){
	template.$('form').find('input:text').val('');
	template.$('#addCustomerAccordion').accordion('close', 0);
	Customers.simpleSchema().namedContext('insertForm').resetValidation();
}

Template.addCustomer.events({
	'submit form': function(e, template){
		var customerId = Customers.findOne({}, {sort: {customer_id: -1}}).customer_id +1;
		console.log(customerId)
		var newCustomer = {
			customer_id: customerId,
			first_name: $('#first_name').val(),
			mid_initial: $('#mid_initial').val(),
			last_name: $('#last_name').val(),
			home_address_line1: $('#home_address_line1').val(),
			home_address_line2: $('#home_address_line2').val(),
			home_address_city: $('#home_address_city').val(),
			home_address_state: $('#home_address_state').val(),
			home_address_zipcode: $('#home_address_zipcode').val(),
			phone_number: $('#phone_number').val(),
			email: $('#email').val()
		};


		Customers.insert(newCustomer, {validationContext: 'insertForm'}, function(error, result) {
			console.log(error);
			if(!error){
				this.$('form').find('input:text').val('');
				$('#first_name').focus();
			}
		});
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

Template.addCustomer.rendered = function(){
	var self = this;
	$('#addCustomerAccordion.ui.accordion').accordion({
		onOpen: function(){
			self.$('#first_name').focus();
		}
	});
}

var saveCustomer = function(){
	var editCustomer = {
		first_name: $('#edit_first_name').val(),
		mid_initial: $('#edit_mid_initial').val(),
		last_name: $('#edit_last_name').val(),
		home_address_line1: $('#edit_home_address_line1').val(),
		home_address_line2: $('#edit_home_address_line2').val(),
		home_address_city: $('#edit_home_address_city').val(),
		home_address_state: $('#edit_home_address_state').val(),
		home_address_zipcode: $('#edit_home_address_zipcode').val(),
		phone_number: $('#edit_phone_number').val(),
		email: $('#edit_email').val()
	}
	Customers.update(Session.get('editCustomerId'), {$set: editCustomer}, {validationContext: 'updateForm'}, function(error, result) {
		if(!error){
			Session.set('editCustomerId', null);
		}
	});
}

Template.customerSearch.events({
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

Template.customerSearch.helpers({
	searchValue: function() {
		var searchQuery = Session.get('searchQuery');

		if(searchQuery && searchQuery[this.columnName]){
			return searchQuery[this.columnName];
		} else {
			return '';
		}
	}
});