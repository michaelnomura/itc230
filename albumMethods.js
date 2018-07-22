var Album = require("./models/Albums.js");
exports.getAll = () => {
  return Album.find({}, (err, result) => {
    if (err) {
      return err;
    } 
    return result;
  });
};

// return a single record
exports.get = (title) => {
    return Album.findOne({'title':title},(err, item) => {
      if (err) {
          return err;
      }
    return item;
    }); 
    };

// return a single record
/*exports.delete = (title) => {
    return Album.find({'title':title},(err, item) => {
        if (err) throw err;
        item.remove(function(err) {
            if (err) throw err;
            });
        }); 
    };*/

exports.delete = (title) => {    
    return Album.findOneAndRemove({'title':title}, function(err) {
        if (err) throw err;

        // we have deleted the user
        console.log('User deleted!');
    });
};

/*exports.delete = (title) => {
    return Album.remove({'title':title},(err, item) => {
      if (err) {
          return err;
      }
    return true;
    }); 
    };*/


