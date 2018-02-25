//Used to read the data from the json files
const fs = require('fs');

//Location of the json files
var dataPath = "E:/Dropbox/School/2017-2018/Fall2017/Databases/NoSQLProject/data_files/json/";
//Specify database name
var dbname="furniture_store"

//Load and parse all data
var customers = fs.readFileSync(dataPath+"customers.json");
var employees = JSON.parse(fs.readFileSync(dataPath+"employees.json"));
var inventory_items = JSON.parse(fs.readFileSync(dataPath+"inventory_items.json"));
var inventory_transfers = JSON.parse(fs.readFileSync(dataPath+"inventory_transfers.json"));
var locations = JSON.parse(fs.readFileSync(dataPath+"locations.json"));
var sales = JSON.parse(fs.readFileSync(dataPath+"sales.json"));

console.log("data loaded");

//Define MongoDB connection
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/furniture_store";

//Drop all collections so only fresh data exists
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("customers").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("customers deleted");
    db.close();
  });
});


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("employees").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("employees deleted");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("inventory_items").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("inventory_items deleted");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("inventory_transfers").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("inventory_transfers deleted");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("locations").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("locations deleted");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("sales").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("sales deleted");
    db.close();
  });      

});

console.log("Data deleted")
//Insert new data
console.log("Creating collections");
MongoClient.connect(url, function(err, db) {
	db.createCollection("customers");
	console.log("Created customers collection");

	db.createCollection("employees");
	console.log("Created employees collection");

	db.createCollection("inventory_items");
	console.log("Created inventory_items collection");

	db.createCollection("inventory_transfers");
	console.log("Created inventory_transfers collection");

	db.createCollection("locations");
	console.log("Created locations collection");

	db.createCollection("sales");
	console.log("Created sales collection");

	db.close();
});

MongoClient.connect(url, function(err, db) {
	var collections = db.collections();
	console.log(collections);
	db.close();
});

console.log("All collections made");


MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("customers").insertMany(customers, function(err, res) {
		if (err) throw err;
		console.log("customers inserted");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("employees").insertMany(employees, function(err, res) {
		if (err) throw err;
		console.log("employees inserted");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("inventory_items").insertMany(inventory_items, function(err, res) {
		if (err) throw err;
		console.log("inventory_items");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("inventory_transfers").insertMany(inventory_transfers, function(err, res) {
		if (err) throw err;
		console.log("inventory_transfers inserted");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("locations").insertMany(locations, function(err, res) {
		if (err) throw err;
		console.log("locations inserted");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("sales").insertMany(sales, function(err, res) {
		if (err) throw err;
		console.log("sales inserted");
		db.close();
	});
});


/*
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("customers").insertMany(customers, function(err, res) {
		if (err) throw err;
		console.log("customers inserted");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("employees").insertMany(employees, function(err, res) {
		if (err) throw err;
		console.log("employees inserted");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("inventory_items").insertMany(inventory_items, function(err, res) {
		if (err) throw err;
		console.log("inventory_items");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("inventory_transfers").insertMany(inventory_transfers, function(err, res) {
		if (err) throw err;
		console.log("inventory_transfers inserted");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("locations").insertMany(locations, function(err, res) {
		if (err) throw err;
		console.log("locations inserted");
		db.close();
	});
});

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	db.collection("sales").insertMany(sales, function(err, res) {
		if (err) throw err;
		console.log("sales inserted");
		db.close();
	});
});*/