var fs = require('fs');

var dbName = 'meetings';
var collName = 'address';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

var myQuery = [ 
    // { $match : { "program" : "beginner" } };
    // { $match : { "day.startTime" : "7:00 PM" } }
    { $unwind : "$day"  },
    { $match : { $and: [ { "day.day" : "Tues" }, { $or : [{ "day.startTime" : "7:00 PM"}, {"day.startTime" : "8:00 PM" }, {"day.startTime" : "7:30 PM" }, {"day.startTime" : "8:30 PM" } ] } ]} }
    
    // {"day.day" : "<b>Tuesdays" }]}, {"day.time" : "7:00 PM"}}};
    // { $match: { availableDocks : { $lt : 1 } } }
    // { $group : { _id : "$statusValue", avgBikes : { $avg : "$availableBikes"}}}
    //faking out the grouping to nothing so that we can use average function by doing _id : null
    //need to put that statusvalue in quotes
    // { $group : { _id : "$statusValue", statName : { $push : "$stationName"}}}
    ];
    
// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

    // Select three Citibike stations
    collection.aggregate( myQuery ).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('mongo_aggregation_result.JSON', JSON.stringify(docs, null, 4));
        }
        db.close();
        
    });

}); //MongoClient.connect