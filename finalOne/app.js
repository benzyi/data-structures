var express = require('express'),
    app = express();
var fs = require('fs');
var moment = require('moment-timezone');

// Postgres
const { Pool } = require('pg');
var db_credentials = new Object();
db_credentials.user = 'benzyi';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'sensors';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Mongo
var collName = 'meetings';
var MongoClient = require('mongodb').MongoClient;
var url = process.env.ATLAS;



// HTML wrappers for AA data
var index1 = fs.readFileSync("data-structures/finalOne/index1.txt");
var index3 = fs.readFileSync("data-structures/finalOne/index3.txt");

app.get('/', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM sensortime AT TIME ZONE 'America/New_York') as sensorday, 
             EXTRACT(MONTH FROM sensortime AT TIME ZONE 'America/New_York') as sensormonth, 
             EXTRACT(HOUR FROM sensortime AT TIME ZONE 'America/New_York') as sensorhour, 
             EXTRACT(MINUTE FROM sensortime AT TIME ZONE 'America/New_York') as sensorminute, 
             count(*) as num_obs,
             bool_or(ir) as ir_detected,
             bool_or(tilt) as couch_mode
             FROM irTilt
             GROUP BY sensormonth, sensorday, sensorhour, sensorminute
             HAVING bool_or(ir) = true;`;
             
    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

app.get('/hour', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM sensortime AT TIME ZONE 'America/New_York') as sensorday, 
             EXTRACT(MONTH FROM sensortime AT TIME ZONE 'America/New_York') as sensormonth, 
             EXTRACT(HOUR FROM sensortime AT TIME ZONE 'America/New_York') as sensorhour,
             count(*) as num_obs,
             bool_or(ir) as ir_detected,
             bool_or(tilt) as couch_mode
             FROM irTilt
             GROUP BY sensormonth, sensorday, sensorhour;`;
             
    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

app.get('/aa', function(req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}
        
        var dateTimeNow = new Date();
        var today = moment.tz(new Date(), "America/New_York").days();
        var tomorrow;
        
        if (today == 6) {tomorrow = 0;}
        
        // if (today == 7) {today = 0;} //need to change my data so sunday is 0 instead of 7.. or this
        // else if (today == 6) {tomorrow = 0;} 
        
        else {tomorrow = today + 1}
        var hour = moment.tz(new Date(), "America/New_York").hours();

        var collection = db.collection(collName);
    
        collection.aggregate([ // start of aggregation pipeline
            // match by day and time
            { $unwind : "$day" },
            { $match : 
                { $or : [
                    { $and: [
                        { "day.day" : today } , { "day.startHour" : { $gte: hour } }
                    ]},
                    { $and: [
                        { "day.day" : tomorrow } , { "day.startHour" : { $lte: 4 } }
                    ]}
                ]}
            },
            { $unwind : "$day" },
            // group by meeting group
            { $group : { _id : {
                latLong : "$latLong",
                meetingName : "$program",
                meetingBlgd: "$building",
                meetingAddress1 : "$mainAddress",
                meetingAddress2 : "$secondAddress",
                meetingDetails : "$notes",
                meetingWheelchair : "$wheelchair",
                },
                    meetingDay : { $push : "$day.day" },
                    meetingStartTime : { $push : "$day.startTime" }, 
                    meetingType : { $push : "$day.type" }
            }
            },
            
            // group meeting groups by latLong
            {
                $group : { _id : { 
                    latLong : "$_id.latLong"},
                    meetingGroups : { $push : {groupInfo : "$_id", meetingDay : "$meetingDay", meetingStartTime : "$meetingStartTime", meetingType : "$meetingType" }}
                }
            }
        
            ]).toArray(function(err, docs) { // end of aggregation pipeline
            if (err) {console.log(err)}
            
            else {
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(index1);
                res.write(JSON.stringify(docs));
                res.end(index3);
            }
            db.close();
        });
    });
    
});

// app.listen(process.env.PORT, function() {
app.listen(3000, function() {
    console.log('Server listening...');
});