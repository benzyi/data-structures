var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var apiKey = process.env.GMAKEY;

// var json = ['m01','m02','m03', 'm04', 'm05', 'm06', 'm07', 'm08', 'm09', 'm10'];
//   json.forEach(function(d,i) {

request('https://raw.githubusercontent.com/benzyi/data-structures/master/week06/firstclean/combine.json', function(error, response, body) {
  //can add iterator here, changing m01 to a var
  
  var address = JSON.parse(body);

  var meetingsData = [];
  async.eachSeries(address, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting = value;
    request(apiRequest, function(err, resp, body) {
      if (err) {throw err;}
      try{
      thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
      thisMeeting.mainAddress = JSON.parse(body).results[0].formatted_address;
      meetingsData.push(thisMeeting);
      }catch(err){
    }
    });
    setTimeout(callback, 100);
    }, function() {
      fs.writeFile('./secondclean/meetings.json', JSON.stringify(meetingsData, null, 1), function (err) {
        if (err) {
          console.error('error');
        }
      }
    );
  });

});
// });