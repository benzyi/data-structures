var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('data/m04.txt');
var $ = cheerio.load(content);
var request = require('request'); // npm install request
var async = require('async'); // npm install async
// var finalAddress = [];
// var meetingsData = [];
var formattedAddress = fs.readFileSync('data/week05formatted.json');
var apiKey = process.env.GMAKEY;

//  $('tbody').find('tr').each(function(i, elem) {
//      $(elem).find('td').eq(0).each(function(i,elem) {
//         var address = $(elem).contents().slice(3).eq(3).text().trim() + ' New York, NY';
//         finalAddress.push(address);
//     });
//  });
 //reactivate starting here 10/7/17

// eachSeries in the async module iterates over an array and operates on each item in the array in series
// async.eachSeries(finalAddress, function(value, callback) {
//     var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
//     var thisMeeting = new Object;
//     thisMeeting.address = value;
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//         //getting error in 'geometry' because of undefined locations. this try-catch is a workaround. not recommended.
//         try{
//         thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
//         //this line adds the formatted address to double check accuracy. see onenote for more info.
//         thisMeeting.formattedAddress = JSON.parse(body).results[0].formatted_address;
//         }catch(err){
// }
//         //push to array
//         meetingsData.push(thisMeeting.formattedAddress);
        
//         // troublshoot line for errors in the body -- run to see all the undefined.
//         // console.log(body);
//     });
//     setTimeout(callback, 200);
// // });
// // stop here
//     // what does this function do?
// }, function() {
//     // console.log(meetingsData.);
//     fs.writeFileSync('./data/week05formatted.json',JSON.stringify(meetingsData));
// });
    
        
 $('tbody').find('tr').each(function(i, elem) {
     var eachItem = {};
     //use $(elem) to get in the next level.
     // include building, address, program
    $(elem).find('td').eq(0).each(function(i,elem) {
        // var address = $(elem).contents().slice(3).eq(3).text().trim() + ' New York, NY';
        // eachItem.address = formattedAddress.contents().eq(i);
        eachItem.address = $(elem).contents().slice(3).eq(3).text().trim() + ' New York, NY';
        // console.log(meetingsData)
        eachItem.building = $(elem).find('h4').contents().slice(0).eq(0).text().trim();
        eachItem.program = $(elem).contents().slice(2).eq(2).text().trim();
    // finalAddress.push(address);
    });
    
    //include day
    $(elem).find('td').eq(1).each(function(i,elem) {
      $(elem).find('b').eq(0).each(function(i,elem) {
          eachItem.day = $(elem).contents().slice(0).eq(0).text().trim();
          eachItem.day = eachItem.day.slice(0,eachItem.day.length - 5);
        //   console.log(eachItem.day
        //       );
      });
    });
//include time
    // $(elem).find('td').each(function(i,elem){
    //     if($(elem).attr('style') == 'border-bottom:1px solid #e3e3e3;width:350px;'){
    //         $(elem).html().trim().split('<b>to</b>')
    //         $(elem).html().trim().split('<br>')
    //         console.log($(elem).find(/\d\d?:\d\d/g).text())
            
            // for (var i = 0; i < eachItem.timeArr.length; i++) {
            //     if(eachItem.timeArr[i].match(/ From/g) !== null){
            //         console.log(eachItem.timeArr[i].match(/\d.+/g))
            //     }
            // }
    //     }
        
    // });

    $(elem).find('td').each(function(i,elem) {
        // console.log($(elem).contents().slice(0).eq(0).text().trim());
        var testRun = {};
        if($(elem).attr('style') == 'border-bottom:1px solid #e3e3e3;width:350px;'){
            testRun.timeArr = $(elem).html().trim().split('<br>');
            
            for (var i = 0; i < testRun.timeArr.length; i++) {
                if(testRun.timeArr[i].match(/ From/g) !== null){
                    // var testRun = {}
                    eachItem.days =
                    testRun.timeArr[i].match(/Mon|Tues|Wed|Thurs|Fri|Sat|Sun/gi);
                    
                    if(testRun.timeArr[i].match(/\d.+/g)){
                     eachItem.startTime = testRun.timeArr[i].match(/\d\d?:\d\d\s\w\w/g)[0];
                     eachItem.endTime = testRun.timeArr[i].match(/\d\d?:\d\d\s\w\w/g)[1];
                         
                     
                         
                    };
                    
            // eachItem.timeArr = testRun        
                    // console.log(testRun)
                    // console.log(meetingsData) ;
                    console.log(eachItem);
                //  console.log(time);
                }
            }
            // eachItem.startTime = eachItem.timeArr;
            // console.log(eachItem.startTime);
        }
        
    });
    
    // console.log(eachItem);
});



    
    