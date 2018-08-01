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
    return Album.findOneAndRemove({'title':title},(err, item) => {
        if (err) {
            return err;
        }
        return item;
    })
}


exports.addAlbum = (newAlbum) => {
    return Album.update({'title':newAlbum.title}, newAlbum, {upsert:true}, (err,result) => {
        if (err) {
            return err;
        }
        return newAlbum;
    })
}

exports.countAlbums = () => {
    return Album.count();
    console.log(Album);
}
    

