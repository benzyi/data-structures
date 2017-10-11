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
        // locationData.push(location)
    });

    //meeting days group
    var meetingDay = [];
    var meetingLine = $(elem).find('td').eq(1).html().trim().split(splitOn);
    $(meetingLine).each(function(j, elem){

        var thisText = elem; // text to parse
        // console.log(thisText)
        var thisMeeting = {}; // holder for each meeting
        // console.log(thisText); // look at the text being parsed
        thisMeeting.day = thisText.substring(0, thisText.indexOf(' '));
        thisMeeting.startTime = thisText.split('/b>')[1].trim().split('<b>')[0].trim();
        thisMeeting.endTime = thisText.split('/b>')[2].trim().split('<br>')[0].trim();
        thisMeeting.type = thisText.split('<br>')[1];
        thisMeeting.special = thisText.split('<br>')[2];
        console.log(thisMeeting.special)
        // .trim().split('<br>')[0].trim();
        // thisMeeting.special = thisText.split('<br>')[2].trim().split('<b>Special Interest</b>'.trim());
        // BENZ, CONTINUE WORKING HERE
        // console.log(thisMeeting)
        meetingDay.push(thisMeeting);
    })
    // }

    location.day = meetingDay;
    final.push(location);
});
fs.writeFileSync('aaron2.json', JSON.stringify(final, null, 1));