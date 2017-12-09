// npm install mongodb

var request = require('request');

// IN MONGO exists a database `meetings` with a collection `address`
var dbName = 'meetings'; // name of Mongo database (created in the Mongo shell)
var collName = 'address'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data
// Insert the list (contained in an array) in the Mongo collection
request('https://raw.githubusercontent.com/benzyi/data-structures/master/Week02/week02.json', function(error, response, body) {
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
        collection.insert(meetingAddress);
        db.close();

    }); //MongoClient.connect

}); //request