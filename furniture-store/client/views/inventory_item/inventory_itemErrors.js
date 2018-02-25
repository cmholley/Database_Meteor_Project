import { Template } from 'meteor/templating';

import { Inventory_Items } from '../../../both/collections/inventory_items.js';


Template.inventory_itemErrors.helpers({
  errors: function(){
    var context = Inventory_Items.simpleSchema().namedContext(this.contextName);
    return context.invalidKeys().map(function(data){ return {message: context.keyErrorMessage(data.name)}});
  }
});