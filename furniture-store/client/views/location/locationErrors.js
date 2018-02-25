import { Template } from 'meteor/templating';

import { Locations } from '../../../both/collections/locations.js';


Template.locationErrors.helpers({
  errors: function(){
    var context = Locations.simpleSchema().namedContext(this.contextName);
    return context.invalidKeys().map(function(data){ return {message: context.keyErrorMessage(data.name)}});
  }
});