var mongoose = require('mongoose');

var connectionString = "mongodb://user1:password1@ds141641.mlab.com:41641/projects_mnomura";
mongoose.connect(connectionString,{ useNewUrlParser: true });

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error'));

//define Album model in JSON key/value pairs
var mySchema = mongoose.Schema({
    title: { type: String, require: true },
    year: Number,
    test: String,
    author: String,
    
});

module.exports = mongoose.model('Album', mySchema);
