var request = require('request');
var fs = require('fs');

let west = 4.291945;
let east = 4.319143;
let north = 52.074047;
let south = 52.061590;

var latitudeList = [];
var longitudeList = [];

while(west < east){
    var nextLat = west += 0.000730;
    latitudeList.push(nextLat)
};

while(north > south){
    var nextLong = north -= 0.000450;
    longitudeList.push(nextLong);
};

var coordinates = [];

for (var i = 0; i < latitudeList.length; i++){
    for(var j = 0; j < longitudeList.length; j++){
        coordinates.push(`${longitudeList[j]},${latitudeList[i]}`);
    };
};

coordinates.forEach(function(coordinate) {
    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
    }
    download(`https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${coordinate}&fov=90&heading=235&pitch=10&key=APIKEY`, `${coordinate}.jpg`, function(){
    console.log(`${coordinate}`);
    });
});