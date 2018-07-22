const express = require("express");
const app = express();
var music = require('./music.js');

var albumMethods = require("./albumMethods.js");

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

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.send('About page');
});

app.get('/get', (req, res) => {
    albumMethods.get(req.query.name.toLowerCase()).then((item) => {
        console.log(item);
    res.render('details', {title: req.query.name, result: item }); 
  }).catch((err) =>{
    return next(err);
  });
});

app.get('/', (req, res, next) => {
  albumMethods.getAll().then((items) => {
    res.render('home', {albums: items }); 
  }).catch((err) =>{
    return next(err);
  });
});

app.get('/delete', (req, res) => {
     albumMethods.delete(req.query.name.toLowerCase()).then((item) => {
        console.log(item);
    res.render('delete', {title: req.query.name}); 
  }).catch((err) =>{
    return next(err);
  });
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

