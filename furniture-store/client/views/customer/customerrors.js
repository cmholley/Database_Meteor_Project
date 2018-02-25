import { Template } from 'meteor/templating';

import { Customers } from '../../../both/collections/customers.js';


Template.customerErrors.helpers({
  errors: function(){
    var context = Customers.simpleSchema().namedContext(this.contextName);
    return context.invalidKeys().map(function(data){ return {message: context.keyErrorMessage(data.name)}});
  }
});