import { Customers } from '../both/collections/customers.js';
import { Locations } from '../both/collections/locations.js';
import { Inventory_Items } from '../both/collections/inventory_items.js';
import { Employees } from '../both/collections/employees.js';

Meteor.publish("allCustomers", function (searchQuery) {
  var mongoQuery = {};
  if(searchQuery){
    _.each(_.keys(searchQuery), function(key){
      if(_.isNumber(searchQuery[key])){
        mongoQuery[key] = searchQuery[key];
      }else{
        mongoQuery[key] = {$regex: searchQuery[key], $options: 'i'};
      }
    });
  }
  return Customers.find(mongoQuery);
});

Meteor.publish("allLocations", function (searchQuery) {
  var mongoQuery = {};
  if(searchQuery){
    _.each(_.keys(searchQuery), function(key){
      if(_.isNumber(searchQuery[key])){
        mongoQuery[key] = searchQuery[key];
      }else{
        mongoQuery[key] = {$regex: searchQuery[key], $options: 'i'};
      }
    });
  }
  return Locations.find(mongoQuery);
});

Meteor.publish("allInventory_Items", function (searchQuery) {
  var mongoQuery = {};
  if(searchQuery){
    _.each(_.keys(searchQuery), function(key){
      if(_.isNumber(searchQuery[key])){
        mongoQuery[key] = searchQuery[key];
      }else{
        mongoQuery[key] = {$regex: searchQuery[key], $options: 'i'};
      }
    });
  }
  return Locations.find(mongoQuery);
});

Meteor.publish("allEmployees", function (searchQuery) {
  var mongoQuery = {};
  if(searchQuery){
    _.each(_.keys(searchQuery), function(key){
      if(_.isNumber(searchQuery[key])){
        mongoQuery[key] = searchQuery[key];
      }else{
        mongoQuery[key] = {$regex: searchQuery[key], $options: 'i'};
      }
    });
  }
  return Locations.find(mongoQuery);
});
