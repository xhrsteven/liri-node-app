

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

//Grab data from key.js
var keys = require('./key.js');
var request = require('request');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var fs = require('fs');
var dotenv = require('dotenv').config();

//store array
var nodeArg = process.argv;
var functions = process.argv[2];

//set empty variable
var input ='';

//loop through all word in argument
for(var i=3; i<nodeArg.length; i++){
    if(i>3 && i<nodeArg.length){
        input = input+ '+'+nodeArg[i];
    }else{
        input += nodeArg;
    }
}

//switch case
switch (functions) {
    case 'my-tweets': 
        showtweets();  
        break;
    case 'spotify-this-song':
        spotifysong();
        break;
    case 'movie-this':
        omdb();
        break;
    case 'do-what-it-says':
        doThing();
        break;
    default: 
        console.log('Please enter one function: my-tweets, spotify-this-song, movie-this, do-what-it-says');
        break;
}
//create functions
function showtweets() {
    var params = {screen_name: 'node.js'};
    client.get('status/user_timeline', params, function (error, tweets,response) {
        if(!error){
            console.log(tweets);
        }
    });
}

function spotifysong(song) {
    spotify.search({type:'track',query: song}, function (err,data) {
        if(error){
            return console.log('Error Occurred: '+err);
        }
        console.log(data);
    })
}

function omdb(movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (err, response,body) {
        if(!err){
            var movieBody = JSON.parse(body);
            console.log(movieBody);
            console.log(movieBody.Title);
            console.log(movieBody.Year);
            console.log(JSON.stringify(body).rating);
            console.log()
        }
    })
}

function doThing() {
    fs.readFile('random.txt', utf8, function (err,data) {
        var txt =data.split(',');
        spotifysong(txt[1]);
    })
}

