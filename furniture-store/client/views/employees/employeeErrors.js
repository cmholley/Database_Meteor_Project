import { Template } from 'meteor/templating';

import { Employees } from '../../../both/collections/employees.js';


Template.employeeErrors.helpers({
  errors: function(){
    var context = Employees.simpleSchema().namedContext(this.contextName);
    return context.invalidKeys().map(function(data){ return {message: context.keyErrorMessage(data.name)}});
  }
});