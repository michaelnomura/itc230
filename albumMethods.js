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


exports.delete = (title) => {

    return Album.findOneAndRemove({'title':title}, (err) => {
        if (err) { 
            return err;
        }
    });
};

exports.add = (title,author,year) => {
    var newAlbum = Album({
        title: {'title':title},
        author: {'author':author},
        year: {'year':year}
    })
    
    newAlbum.save( (err) => {
        if (err) throw err;
        
        return 'success';
    });
}

