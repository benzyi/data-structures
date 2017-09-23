var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('data/m04.txt');
var $ = cheerio.load(content);
//starter code
var final = [];
//first, find the biggest russian doll - tbody. then move in.
 $('tbody').find('tr').each(function(i, elem) {
     //use $(elem) to get in the next level.
    $(elem).find('td').eq(0).each(function(i,elem) {
        var address = $(elem).contents().slice(3).eq(3).text().trim();
//print to array
    final.push(address + ' New York, NY')
    });
});
    
    fs.writeFileSync('./data/output2.json',JSON.stringify(final))