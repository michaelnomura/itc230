const express = require("express");
const bodyParser = require("body-parser")
const app = express();
var music = require('./music.js');

var albumMethods = require("./albumMethods.js");
var Album = require("./models/Albums.js");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.use('/api', require('cors')());

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

app.get('/api/v1/album/:name',(req,res,next) => {
    albumMethods.get(req.params.name.toLowerCase()).then((item) => {
        //console.log(req.params.name);
        if (!item){
            //insert error via json
            var erMsg = [
                {"found":false}
            ]
            res.json(erMsg);
        }else{
            res.json(item);
        }
        
        
    }).catch((err) => {
    return next(err);
    })   
})

app.get('/', (req, res, next) => {
    albumMethods.getAll().then((items) => {
        
        res.render('home_react', {albums: JSON.stringify(items) }); 
        
    }).catch((err) =>{
        return next(err);
    });
});

app.get('/test', (req, res, next) => {
    albumMethods.getAll().then((items) => {
        
        res.render('home_react', {albums: JSON.stringify(items) }); 
        
    }).catch((err) =>{
        return next(err);
    });
});

app.get('/api/v1/albums',(req,res,next) => {
    albumMethods.getAll().then((items) => {
        if (!items){
            //insert error via json
            var erMsg = [
                {"found":false}
            ]
            res.json(erMsg);
        }else{
            console.log(JSON.stringify(items));
            res.json(items);
        }      
    }).catch((err) => {
        return next(err);
    })
})

app.get('/delete', (req, res) => {
    albumMethods.delete(req.query.name.toLowerCase()).then((item) => {
        //console.log(item);
        res.render('delete', {title: req.query.name, result:item }); 
    }).catch((err) =>{
    return next(err);
    });
});

app.get('/api/v1/album/delete/:name',(req,res,next) => {
    albumMethods.delete(req.params.name.toLowerCase()).then((item) => {
        if (!item){
            //insert error via json
            var erMsg = [
                {"found":false},
                //{"total items":Album.length+1}
            ]
            res.json(erMsg);
        }else{
            console.log(item);
            res.json(item);
        }
        //console.log(req.params.name);
        //res.json(item);
    }).catch((err) => {
    return next(err);
    })   
})

app.post('/api/v1/new_album', (req, res, next) => {
    albumMethods.addAlbum(req.body).then((result) => {
        //console.log(result);    
        res.json(result);
        
    }).catch((err) =>{
        return next(err);
    });
});

app.post('/api/v1/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let album = new Album({title:req.body.title,author:req.body.author,year:req.body.year});
        album.save((err,newAlbum) => {
            if (err) return next(err);
            console.log(newAlbum)
            res.json({updated: 0, _id: newAlbum._id});
        });
    } else { // update existing document
        Album.updateOne({ _id: req.body._id}, {title:req.body.title, author: req.body.author, year: req.body.year }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
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