//dotenv to import .env providing spotify keysnode liri
require("dotenv").config();

//dependences 
//-----------------------------------------------------------------------

var axios = require ("axios");
var Spotify = require("node-spotify-api");
var keys =require("./keys.js")
var fs = require("fs");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

//node search logic
//-----------------------------------------------------------------------

var expression = process.argv[2];   //Search song, concert, or movie

var mediaSubject = "";
var nodeArgs = process.argv;    // creates a string to use if search subject is longer than one word.

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    mediaSubject = mediaSubject + " " + nodeArgs[i];
    mediaSubject.trim();
  }
  else {
    mediaSubject += nodeArgs[i];
  }
}

//Bands In Town
//-----------------------------------------------------------------------

function bandsInTown(mediaSubject){

  var queryUrl = "https://rest.bandsintown.com/artists/" + mediaSubject + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
      function (response){

        if (!response.data.length){
            console.log("Sorry, No results...");
            return;
              };

        for (var i=0; i<response.data.length; i++){

            console.log("Venue: " + response.data[i].show.venue.name + "\n" +
                        "Loctation: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n" +
                        "Date: " + moment(response.data[i].datetime).format("L") + "\n");
              };
        }
    );
};

//Spotify
//-----------------------------------------------------------------------

function spotifySearch(mediaSubject) {

  spotify.search({ type: 'track', query: mediaSubject, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
  console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
  console.log("Song: " + data.tracks.items[0].name);
  console.log("Link: " + data.tracks.items[0].external_urls.spotify);
  console.log("Album: " + data.tracks.items[0].album.name);
  });
};

//OMDB
//-----------------------------------------------------------------------

function omdb(mediaSubject){

  if (mediaSubject === ""){ 
      var mediaSubject = "Mr. Nobody";
      console.log("mr. Nobody");
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + mediaSubject + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
      function(response) {
        console.log("\n");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year)
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomato's Rating: " + response.data.tomatoRating);
        console.log("Produced in: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Cast: " + response.data.Actors);
      }
    );
};

//Do-what-it-says
//-----------------------------------------------------------------------

function doWhat() {
      fs.readFile('random.txt','utf8', function(error, data){
        console.log(data);

        var dataArr = data.split(",");
    
        if (dataArr.length === 2) {
          pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
          pick(dataArr[0]);
        }
    });
  };

//Switch
//-----------------------------------------------------------------------

switch (expression) {
        case "song":
          spotifySearch(mediaSubject);
          break;
        case "movie":
          omdb(mediaSubject);
          break;
        case "concert": //< not functioning
          bandsInTown(mediaSubject);
          break;
        case "do-what-it-says":
          doWhat();
          break;
        default:
          console.log("\n Hi! Welcome to Liri. Search for music, concerts, and movies." + "\n" +
                      "To search simply type 'song', 'concert', or 'movie' followed by what your are looking for."
                      + "\n" +"Party On!");
};