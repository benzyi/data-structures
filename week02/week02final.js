var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('data/m04.txt');
var $ = cheerio.load(content);

var final = [];

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
    var meetingLine = $(elem).find('td').eq(1).html().split('<br>');
    for (var i = 0; i < meetingLine.length; i++) {
        if (meetingLine[i]) {

            // include start and end times
            $(elem).find('td').each(function(i, elem) {
                if ($(elem).attr('style') == 'border-bottom:1px solid #e3e3e3;width:350px;') {
                    
                    var thisText = $(elem).html().trim(); // text to parse
                    var thisMeeting = {}; // holder for each meeting
                    // console.log(thisText); // look at the text being parsed
                    thisMeeting.day = thisText.substring(3, thisText.indexOf(' '));
                    thisMeeting.startTime = thisText.split('/b>')[1].trim().split('<b>')[0].trim();
                    thisMeeting.endTime = thisText.split('/b>')[2].trim().split('<br>')[0].trim();
                    thisMeeting.type = thisText.split('/b>')[3].trim().split('<br>')[0].trim();
                    thisMeeting.special = thisText.split('<br>')[2].trim().split('<b>Special Interest</b>'.trim());
                    // BENZ, CONTINUE WORKING HERE
                    // console.log(thisMeeting)
                    meetingDay.push(thisMeeting);
                // This code block is not needed: 
                //     testRun.timeArr = $(elem).html().trim().split('<br>');
                //     testRun.timeBrr = $(elem).html().trim().split('<br>')[1].split('<b>Meeting Type</b>');
                //     testRun.timeCrr = $(elem).html().trim().split('<br>')[2].split('<b>Special Interest</b>');
                //     // console.log($(elem).html().trim().split('<br>')[2].split('<b>Special Interest</b>'))

                //     for (var i = 0; i < testRun.timeBrr.length; i++) {
                //         if (testRun.timeBrr[i]) {
                //             oneDay.type = testRun.timeBrr[i].match(/\w\w?\s=\s\w+\s\w+[^meeting]/);
                //         }
                //     }
                //     for (var i = 0; i < testRun.timeCrr.length; i++) {
                //         if (testRun.timeCrr[i]) {
                //             oneDay.special = testRun.timeCrr[i].split('\n                    \t');
                //             // console.log(testRun.timeCrr[i])
                //         }
                //     }
                //     for (var i = 0; i < testRun.timeArr.length; i++) {
                //         if (testRun.timeArr[i].match(/ From/g) !== null) {
                //             oneDay.days = testRun.timeArr[i].match(/Mon|Tues|Wed|Thurs|Fri|Sat|Sun/gi);

                //             if (testRun.timeArr[i].match(/\d.+/g)) {
                //                 oneDay.startTime = testRun.timeArr[i].match(/\d\d?:\d\d\s\w\w/g)[0];
                //                 oneDay.endTime = testRun.timeArr[i].match(/\d\d?:\d\d\s\w\w/g)[1];

                //                 console.log(meetingDay)
                //             }
                //         }
                //     }
                }
            });
        }
    }

    location.day = meetingDay;
    final.push(location);
});
fs.writeFileSync('meetings.json', JSON.stringify(final, null, 1));