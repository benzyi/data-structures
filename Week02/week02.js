// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('data/m04.txt');

// load `content` into a cheerio object
// $ contains all the cheerio content, but also we can just reference the object by calling $
var $ = cheerio.load(content);

//var addressHere = $('h4').contents().filter();
//return this.text_node;
 // console.log($(h4).text());
//});
//console.log(addressHere);

//primary thing you want as a variable is the thing you want to select
// print names of thesis students
//$('h4').each(function(i, elem) {
// var a = $(elem).next();
   // var address = a.next();
//the h3 is testing to see if it's just h3 that we are calling in the text
//each also make it select all. without it, it just gives you the first name. the each method requires a function with an iterator and an element
 // console.log($(elem).text());
console.log($('td').children().text());
//so the text() takes just the text within that element. you can make it take the html instead or something else
//});