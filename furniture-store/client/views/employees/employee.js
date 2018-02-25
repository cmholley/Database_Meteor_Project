import { Template } from 'meteor/templating';

import { Employees } from '../../../both/collections/employees.js';

Tracker.autorun(function(){
	Meteor.subscribe('allEmployees');
});

Template.employeeList.helpers({
	employees() {
		return Employees.find({}, {sort: {employee_id: 1}});
	}
});

Template.employee.events({
	'click .deleteEmployee': function(){
		Employees.remove(this._id);
	},
	'click .editEmployee': function(){
		Employees.simpleSchema().namedContext('updateForm').resetValidation();
		Employees.simpleSchema().namedContext('insertForm').resetValidation();		
		Session.set('editEmployeeId', this._id);
	},
	'click .cancelEmployee': function(){
		Employees.simpleSchema().namedContext('updateForm').resetValidation();
		Employees.simpleSchema().namedContext('insertForm').resetValidation();
		Session.set('editEmployeeId', null);
	},  
	'click .saveEmployee': function(){
		saveEmployee();
	},
	'keypress input': function(e){
		if(e.keyCode === 13){
			saveEmployee();
		}
		else if(e.keyCode === 27){
			Session.set('editEmployeeId', null);
		}
	}
});

Template.employee.helpers({
	editing: function(){
		return Session.equals('editEmployeeId', this._id);
	} 
});

var addEmployee = function(){
	var employeeId = Employees.findOne({}, {sort: {employee_id: -1}}).employee_id +1;
	var newEmployee = {
		employee_id: employeeId,
		first_name: $('#first_name').val(),
		mid_initial: $('#mid_initial').val(),
		last_name: $('#last_name').val(),
		location_id: $('#location_id').val(),
		ssn: $('#ssn').val(),
		home_address_line1: $('#home_address_line1').val(),
		home_address_line2: $('#home_address_line2').val(),
		home_address_city: $('#home_address_city').val(),
		home_address_state: $('#home_address_state').val(),
		home_address_zipcode: $('#home_address_zipcode').val(),
		phone_number: $('#phone_number').val(),
		email: $('#email').val(),
		position: $('#position').val(),
		rank: $('#rank').val(),
		subtype: $('#subtype').val()
	};

	Employees.insert(newEmployee, {validationContext: 'insertForm'}, function(error, result) {
		if(!error){
			this.$('form').find('input:text').val('');
			$('#address_line1').focus();
		}
	});
}

var resetForm = function(template){
	template.$('form').find('input:text').val('');
	template.$('#addEmployeeAccordion').accordion('close', 0);
	Employees.simpleSchema().namedContext('insertForm').resetValidation();
}

Template.addEmployee.events({
	'submit form': function(e, template){
		addEmployee();
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

Template.addEmployee.rendered = function(){
	var self = this;
	$('#addEmployeeAccordion.ui.accordion').accordion({
		onOpen: function(){
			self.$('#address_line1').focus();
		}
	});
}

var saveEmployee = function(){
	var editEmployee = {
		first_name: $('#edit_first_name').val(),
		mid_initial: $('#edit_mid_initial').val(),
		last_name: $('#edit_last_name').val(),
		location_id: $('#edit_location_id').val(),
		ssn: $('#edit_ssn').val(),
		home_address_line1: $('#edit_home_address_line1').val(),
		home_address_line2: $('#edit_home_address_line2').val(),
		home_address_city: $('#edit_home_address_city').val(),
		home_address_state: $('#edit_home_address_state').val(),
		home_address_zipcode: $('#edit_home_address_zipcode').val(),
		phone_number: $('#edit_phone_number').val(),
		email: $('#edit_email').val(),
		position: $('#edit_position').val(),
		rank: $('#edit_rank').val(),
		subtype: $('#edit_subtype').val()
	}
	Employees.update(Session.get('editEmployeeId'), {$set: editEmployee}, {validationContext: 'updateForm'}, function(error, result) {
		if(!error){
			Session.set('editEmployeeId', null);
		}
	});
}

Template.employeeSearch.events({
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

Template.employeeSearch.helpers({
	searchValue: function() {
		var searchQuery = Session.get('searchQuery');

		if(searchQuery && searchQuery[this.columnName]){
			return searchQuery[this.columnName];
		} else {
			return '';
		}
	}
});