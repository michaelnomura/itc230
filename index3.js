var http = require("http");
var fs = require("fs");
const querystring = require('querystring');
var url = require('url');
var music = require('./music.js');

http.createServer(function(req,res) {

var q = url.parse(req.url, true);
var path = q.pathname;
    
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    //res.end('404 | Not found' + q.pathname);
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
        //console.log(q.search);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        //console.log(q.search);
        var qdata = q.query;
        //console.log(qdata.name);
        var found = music.get(qdata.name);
        if (found) {
            str = JSON.stringify(found);
        //console.log(str);
        res.end(str);
        } else {
            res.end('Error does not exist');
            //insert error
        }
        
    break;
    case '/delete':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        var qdata = q.query;
        var found = music.get(qdata.name);
        if (found) {
            //delete item function
            music.delete(qdata.name);
            //console.log(str);
        res.end('Deleted');
        } else {
            //insert error
            res.end('Error does not exist');
        }
    break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 | Not found');
      break;
    }
}).listen(process.env.PORT || 3000);