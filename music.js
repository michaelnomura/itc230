//a data array of at least 5 items, where each item has at least 3 attributes (key:value pairs). 
//Determine which attribute will serve as a unique key (e.g. book title) to prevent duplicates,
var music = [
{ name : "Sublime", album : "Sublime", year : 1996 },
{ name : "Misfits", album : "Walk Among Us", year : 1982 },
{ name : "Ramones", album : "Road to Ruin", year : 1978 },
{ name : "The Clash", album : "London Calling", year : 1979 },
{ name : "The Specials", album : "The Specials", year : 1979 }
];

//a getAll method that returns all array items, 
exports.getAllAlbums = () => {
    return music; 
    }
//a get method to return the requested array item,  
exports.get = (name) => { 
    return music.find((album) => {
        return album.name.toLowerCase() == name;
        });
}

//a delete method to delete the requested item from your array.
exports.delete = (name) => {
    var found = music.findIndex((album) => {
        return album.name.toLowerCase() == name.toLowerCase() ;
        });
    if (found>-1) {
        music.splice(found,1);
        return true;
    } 
    return false;
}


