var fs = require('fs');
var cheerio = require('cheerio');
var content = fs.readFileSync('data/m04.txt');
var $ = cheerio.load(content);
//starter code

//first, find the biggest russian doll - tbody. then move in.
 $('tbody').find('tr').each(function(i, elem) {
     //use $(elem) to get in the next level.
    $(elem).find('td').eq(0).each(function(i,elem) {
        //pick first td of the three only. the others have extra text.
        var address = $(elem).contents().slice(3).eq(3).text().trim();
        //create variable to output the result. so you call the elem, get its contents, slice (choose the element line you want so it'll take the next <x>.)
        //.eq(3) is the code that reduces the result into just that line, otherwise you get all this other text. it basically executes the slice before it.
        //text to output text, and trim the output afterwards
//print
console.log(address);
    });
});
    