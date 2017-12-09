var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('data/m04.txt');
var $ = cheerio.load(content);

var final = [];

var splitOn = '<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    <b>';

//address, building, program, notes group
$('table').eq(2).find('tbody tr').each(function(i, elem) {
    var location = {};
    $(elem).find('td').eq(0).each(function(i, elem) {
        location.address = $(elem).contents().slice(3).eq(3).text().trim() + ' New York, NY';
        location.building = $(elem).find('h4').contents().slice(0).eq(0).text().trim();
        location.program = $(elem).contents().slice(2).eq(2).text().trim();
        location.wheelchair = $(elem).find('span').contents().text().trim() != false;
        location.notes = $(elem).find('div').contents().text().trim();
        // console.log(location.notes);
        // locationData.push(location)
    });

    //meeting days group
    var meetingDay = [];
    var meetingLine = $(elem).find('td').eq(1).html().trim().split(splitOn);
    console.log(meetingLine)
    $(meetingLine).each(function(j, elem){

        var thisText = elem; // text to parse
        // console.log(thisText)
        var thisMeeting = {}; // holder for each meeting
        // console.log(thisText); // look at the text being parsed
        // thisMeeting.days = thisText.match(/Mon|Tues|Wed|Thurs|Fri|Sat|Sun/gi);
        var tempTwo = thisText.match(/Mon|Tues|Wed|Thurs|Fri|Sat|Sun/gi)
        
        if(tempTwo !== null){
            thisMeeting.day = tempTwo[0]
        }
        // console.log(thisMeeting)
        // thisMeeting.day = thisText.substring(0, thisText.indexOf(' '));
        thisMeeting.startTime = thisText.split('</b>')[1].trim().split('<b>')[0].trim();
        thisMeeting.endTime = thisText.split('</b>')[2].trim().split('<br>')[0].trim();
        var temp = thisText.split('<br>')[1];
        if(temp !== undefined){
          thisMeeting.type = temp.slice(20,temp.length).trim();  
        };
        var tempOne = thisText.split('<br>')[2];
        // console.log(thisText.split('<br>')[2])
        if(tempOne !== undefined){
          var tempThree = tempOne.split('</b>')[1];
          if(tempThree !== undefined) {
              thisMeeting.special = tempThree.trim();
          }
        }
        // console.log(thisMeeting.special)
        // BENZ, CONTINUE WORKING HERE
        // console.log(thisMeeting)
        meetingDay.push(thisMeeting);
    })
    // }

    location.day = meetingDay;
    final.push(location);
});
fs.writeFileSync('aaron2.json', JSON.stringify(final, null, 1));
