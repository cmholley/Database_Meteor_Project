AccountsTemplates.configureRoute('signIn');

Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/customers', function () {
  this.render('customerList');
});

Router.route('/', function () {
  this.render('locationList');
});

Router.route('/locations', function () {
  this.render('locationList');
});

Router.route('/inventory_items', function () {
  this.render('inventory_itemList');
});

Router.route('/employees', function () {
  this.render('employeeList');
});