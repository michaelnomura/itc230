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
        //console.log(result);
        var msg = {};
        if (result.nModified) {
            
            var msg = 
                {"new":false,
                "modified":true
                }
        }else{
            var msg = 
                {"new":true,
                //"id":result.upserted[0]._id
                }
            
            }
        console.log (msg);
        return newAlbum;
        
    })
}

exports.countAlbums = () => {
    return Album.count();
    console.log(Album);
}