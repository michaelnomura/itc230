const express = require("express");
const app = express();
var music = require('./music.js');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//Convert your index.js script from the previous assignment to Express application syntax,

//Update your home.html page to display a ‘Search’ form with a text field corresponding the 
//key field in your list. For example, if your application is a book list, users could search 
//for a book title.
// send static file as response
app.get('/', (req, res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html'); 
});

app.get('/test', (req,res) => {
 res.type('application/json');
 res.sendFile(__dirname + '/package.json');
});

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});

app.get('/get', (req, res) => {
    var found = music.get(req.query.name.toLowerCase());
    res.render('details', {title: req.query.name.charAt(0).toUpperCase() + req.query.name.substr(1), result: found });
});

app.post('/get', (req, res) => {
    var found = music.get(req.body.name.toLowerCase());
    res.render('details', {title: req.body.name, result: found });
});

app.get('/delete', (req, res) => {
    var found = music.delete(req.query.name);
    res.render('delete', {title: req.query.name, result: found });
});

// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

