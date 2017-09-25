// npm install mongodb

var request = require('request');

// IN MONGO exists a database `citibike` with a collection `stations`
var dbName = 'meetings'; // name of Mongo database (created in the Mongo shell)
var collName = 'address'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data on citibike stations
// Insert the list of citibike stations (contained in an array) in the Mongo collection
request('https://raw.githubusercontent.com/benzyi/data-structures/41118b0de6268115c0a9bb3d2d4f025cf2032b11/Week02/data/week03.json', function(error, response, body) {
    var meetingAddress = JSON.parse(body);
// console.log(body);
    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; 

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(meetingAddress.address);
        db.close();

    }); //MongoClient.connect

}); //request