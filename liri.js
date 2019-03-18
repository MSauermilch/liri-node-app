
console.log(" \n Hi! Welcome to Liri. Search For Music, Concerts, and Movies. \n To search simply type 'song', 'concert', or 'movie' followed by what your looking for. \n Party On! \n");

var axios = require ("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");

    // var spotify = new spotify(keys.spotify);

    //others
      // require("dotenv").config();
      // var keys = require("./keys.js");

var expression = process.argv[2];   //Search song, concert. or movie
var mediaSubject = "";  //Search subject
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

  console.log("Your looking for: " + mediaSubject + "\n")

  var queryUrl = "https://rest.bandsintown.com/artists/" + mediaSubject + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
      function (response){

        if (response.data === null){
            console.log("Sorry, No results...")// not working
          } else {
            for (i=0; i<response.data.length; i++){
              console.log("Venue: \n" + response.data[i].venue.name);
              console.log("Loctation: \n" + response.data[i].venue.city + ", " + response.data[i].venue.country);
              console.log("Date: \n" + response.data[i].datetime + "\n"); // need to use moment.js
              }
          }
        }
    );
};

//Spotify
//-----------------------------------------------------------------------

function spotify(mediaSearch){
  spotify.search({ type: 'track', query: mediaSubject }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
  console.log(data); 
  });
};

//OMDB
//-----------------------------------------------------------------------

function omdb(mediaSubject){

  console.log("Your looking for: " + mediaSubject + "\n")

  if (mediaSubject === undefined){  //does not work
      var mediaSubject = "Mr. Nobody";
      console.log("mr. Nobody");
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + mediaSubject + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
      function(response) {
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

//Switch
//-----------------------------------------------------------------------

switch (expression) {
        case "song":
          spotify(mediaSubject);
          break;
        case "movie":
          omdb(mediaSubject);
          break;
        case "concerts":
          bandsInTown(mediaSubject);
          break;
        default:
          console.log("NO ES BUENO!")
};