var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('data/m04.txt');
var $ = cheerio.load(content);
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var final = [];
var meetingsData = [];
// SETTING ENVIRONMENT VARIABLES (in console): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY;

 $('tbody').find('tr').each(function(i, elem) {
     //use $(elem) to get in the next level.
    $(elem).find('td').eq(0).each(function(i,elem) {
        var address = $(elem).contents().slice(3).eq(3).text().trim();
//print to array
    final.push(address + ' New York, NY');
    });
});
//If using off a JSON object (utf8 is language code, I believe) also be sure to change var in async if using this to addressesArray, instead of final.
// var addressesArray = JSON.parse(fs.readFileSync('./data/output.json','utf8'));
// console.log(addressesArray)

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(final, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        //getting error in 'geometry' because of undefined locations. this try-catch is a workaround. not recommended.
        try{
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        //this line adds the formatted address to double check accuracy. see onenote for more info.
        thisMeeting.formattedAddress = JSON.parse(body).results[0].formatted_address;
        }catch(err){
}
        //push to array
        meetingsData.push(thisMeeting);
        
        //troublshoot line for errors in the body -- run to see all the undefined.
        // console.log(body);
    });
    setTimeout(callback, 200);
    
    //what does this function do?
}, function() {
    console.log(meetingsData);
    fs.writeFileSync('./data/week03.json',JSON.stringify(meetingsData));
    // var meetingsNyc = JSON.parse(fs.readFileSync('./data/textfile.json','utf8'));
    // fs.writeFileSync ('./data/week03.txt', meetingsNyc.join('\n'));
    // fs.writeFileSync ('./data/week03test.txt', meetingsData.join('\n'));
//     request('textfile.json', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     fs.writeFileSync('/home/ubuntu/workspace/data/week03test.txt', body);}})
});
    
    