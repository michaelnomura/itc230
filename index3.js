var http = require("http");
var fs = require("fs");
const querystring = require('querystring');

//a data array of at least 5 items, where each item has at least 3 attributes (key:value pairs). 
//Determine which attribute will serve as a unique key (e.g. book title) to prevent duplicates,
var music = [
{ name : "Tupac", album : "Me Against the World", year : 1995 },
{ name : "Dr. Dre", album : "The Chronic", year : 1992 },
{ name : "Snoop Dogg", album : "Doggystyle", year : 1993 }
];

//a getAll method that returns all array items, 
function getAllAlbums(array1) {
    var allAlbums = array1.toString();
    return allAlbums; 
    }
//a get method to return the requested array item,  
function getAlbum (tempKey, array1) { 
    var album = array1.find(tempKey).toString();
    return album; 
    }
//a delete method to delete the requested item from your array.
function deleteAlbums(array1) { 
    //find index
    array1.find(function(array1){
        return array1.name === tempKey;
    })
    //delete using splice
    return successMessage; 
    }
//export these 3 methods for use by other scripts

//Import the new module into your index.js script,
//Update index.js with new routes for /get & /delete. 
//Each route should invoke the corresponding data-module method and 
//send the returned value on the server response. For example this request:
//http://localhost:3000/get?title=dune 

http.createServer(function(req,res) {
var path = req.url.toLowerCase();
var q = url.parse(req.url, true).query;

    switch(path) {
    case '/':
        fs.readFile('public/home.html', function (err, data) {
        if (err) return console.error(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data.toString());
        });
        break;
    case '/about':       
        fs.readFile('package.json', function (err, data) {
        if (err) return console.error(err);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data.toString());
        });
    break;
    case '/get':
        if (err) return console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain'})
    break;
    case '/test':
        fs.readFile('input.html', function (err, data) {
        if (err) return console.error(err);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data.toString());
        });
        break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 | Not found');
      break;
    }
}).listen(process.env.PORT || 3000);