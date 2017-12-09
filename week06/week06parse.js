var fs = require('fs');
var cheerio = require('cheerio');
var number = '10';
var content = fs.readFileSync('data/m' + number + '.txt');
var $ = cheerio.load(content);

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var final = [];
var splitOn = '<br>\n                    \t<br>\n                    \t\n\t\t\t\t  \t    <b>';


//address, building, program, notes group

$('table').eq(2).find('tbody tr').each(function(i, elem) {
    var location = {};
    $(elem).find('td').eq(0).each(function(i, elem) {
        var addy = $(elem).contents().slice(3).eq(3).text().trim() + ' New York, NY';
        location.address = addy.split(',')[0] + ', New York, NY';
        // console.log(location.address)
        var addy2 = addy.split(',')[1]
        
            if (addy2 == ' New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\tNY 10032 New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\t10013 New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\t10012 New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\tNY 10027 New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\t10128 New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\t10024 New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\tNY 10016 New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\tNY 10023 New York') {
                location.secondAddress = ''
            }
            
            else if (addy2 == ' \n\t\t\t\t\t\t10007 New York') {
                location.secondAddress = ''
            }
            
            else (
                location.secondAddress = addy2
                )
                
                console.log(addy2)
        console.log (location.address)
        location.building = $(elem).find('h4').contents().slice(0).eq(0).text().trim();
        location.program = $(elem).contents().slice(2).eq(2).text().trim().split(' -')[0];
        location.wheelchair = $(elem).find('span').contents().text().trim() != false;
        location.notes = $(elem).find('div').contents().text().trim();
        // console.log(location)
    });
    //meeting days group
    var meetingDay = [];
    var meetingLine = $(elem).find('td').eq(1).html().trim().split(splitOn);
    $(meetingLine).each(function(j, elem) {

        var thisText = elem; // text to parse
        // console.log(thisText)
        var thisMeeting = {}; // holder for each meeting
        var tempTwo = thisText.match(/Mon|Tues|Wed|Thurs|Fri|Sat|Sun/gi)

        if (tempTwo !== null) {
            thisMeeting.day = tempTwo[0]
            if(thisMeeting.day == "Mon") {
                        thisMeeting.day = 1
                    }
            else if(thisMeeting.day == "Tues") {
                        thisMeeting.day = 2
                    }
            else if(thisMeeting.day == "Wed") {
                        thisMeeting.day = 3
                    }
            else if(thisMeeting.day == "Thurs") {
                        thisMeeting.day = 4
                    }
            else if(thisMeeting.day == "Fri") {
                        thisMeeting.day = 5
                    }
            else if(thisMeeting.day == "Sat") {
                        thisMeeting.day = 6
                    }
            else if(thisMeeting.day == "Sun") {
                        thisMeeting.day = 0
                    }
        }
        
        var startTime = thisText.split('</b>')[1].trim().split('<b>')[0].trim();
        var endTime = thisText.split('</b>')[2].trim().split('<br>')[0].trim();
        var startHour;
        var startMinute;
        var endHour;
        var endMinute;
        //start time
        if (startTime.split(' ')[0].split(':')[0] === '12' && startTime.split(' ')[1] === 'PM') {
            startHour = '12' * 1;
            startMinute = startTime.split(' ')[0].split(':')[1];
        }
        else if (startTime.split(' ')[0].split(':')[0] === '12' && startTime.split(' ')[1] === 'AM') {
            startHour = '00';
            startMinute = startTime.split(' ')[0].split(':')[1];
        }
    
        else if (startTime.split(' ')[1] === 'PM') {
            startHour = 12 + startTime.split(' ')[0].split(':')[0] * 1;
            startMinute = startTime.split(' ')[0].split(':')[1];
        }
    
        else {
            startHour = startTime.split(' ')[0].split(':')[0] * 1;
            startMinute = startTime.split(' ')[0].split(':')[1];
        }
        //end time
        if (endTime.split(' ')[0].split(':')[0] === '12' && endTime.split(' ')[1] === 'PM') {
            endHour = '12' * 1;
            endMinute = endTime.split(' ')[0].split(':')[1];
        }
        else if (endTime.split(' ')[0].split(':')[0] === '12' && endTime.split(' ')[1] === 'AM') {
            endHour = '00';
            endMinute = endTime.split(' ')[0].split(':')[1];
        }
    
        else if (endTime.split(' ')[1] === 'PM') {
            endHour = 12 + endTime.split(' ')[0].split(':')[0] * 1;
            endMinute = endTime.split(' ')[0].split(':')[1];
        }
    
        else {
            endHour = endTime.split(' ')[0].split(':')[0] * 1;
            endMinute = endTime.split(' ')[0].split(':')[1];
        }
        
        thisMeeting.startHour = startHour * 1;
        // thisMeeting.startMinute = startMinute;
        if (startMinute == '00') {
            thisMeeting.startMinute = '00';
        }
        else {
            thisMeeting.startMinute = startMinute * 1;
        };
        thisMeeting.endHour = endHour * 1;
        // thisMeeting.endMinute = endMinute;
        if (endMinute == '00') {
            thisMeeting.endMinute = '00';
        }
        else {
            thisMeeting.endMinute = endMinute * 1;
        };
        
        thisMeeting.endTime = (endHour + endMinute) * 1;
        
        //fixing midnight and adding AM PM
        if (startHour == '0' ) {
            thisMeeting.startTime = ('00' + ':' + startMinute + ' AM')
        }
        else if (startHour < '12') {
            thisMeeting.startTime = (startHour + ':' + startMinute + ' AM')
        }
        else if (startHour >= '12') {
            thisMeeting.startTime = (startHour + ':' + startMinute + ' PM')
        }
        if (endHour == '0' ) {
            thisMeeting.endTime = ('00' + ':' + endMinute + ' AM')
        }
        else if (endHour < '12') {
            thisMeeting.endTime = (endHour + ':' + endMinute + ' AM')
        }
        else if (endHour >= '12') {
            thisMeeting.endTime = (endHour + ':' + endMinute + ' PM')
        }
        
        // thisMeeting.endHour = 
        // thisMeeting.endMin = 
        
        var temp = thisText.split('<br>')[1];
        if (temp !== undefined) {
            thisMeeting.type = temp.slice(20, temp.length).trim();
        };
        var tempOne = thisText.split('<br>')[2];
        if (tempOne !== undefined) {
            var tempThree = tempOne.split('</b>')[1];
            if (tempThree !== undefined) {
                thisMeeting.special = tempThree.trim();
            }
        }
        
        
        meetingDay.push(thisMeeting);

    })
        location.day = meetingDay;
        final.push(location);
        // console.log(location)
//   console.log(final)
}); //end tags for main
fs.writeFileSync('./firstclean/m' + number + '.json', JSON.stringify(final, null, 1));