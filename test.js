const fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/furniture_store";

    MongoClient.connect(url, (err, db) => {
        assert.equal(null, err)
        console.log("Connected to mongo server")

        var collection = db.collection('documents')

        // This fires
        console.log('about to start insert many')
        collection.insertMany([{greeting: 'hi'}, {greeting: 'hey'}, {greeting: 'yo'}], (err, recs) => {
            // I never get past here
            console.log('finished insert many')
            assert.equal(err,null)
            assert.equal(3,recs.result.n)
            assert.equal(3,recs.insertedCount)
            db.close();
            res.send("multi insert result: " + recs)
        })
    })