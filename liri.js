

var axios = require ("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");

var spotify = new Spotify({
  id: "238f23359ac4479fb1724ab3184f120e",
  secret: "23b34a56849c4357b7df436616a4c2b2"
});

    //others
      // require("dotenv").config();
      // var keys = require("./keys.js");

var expression = process.argv[2];   //Search song, concert. or movie
//var mediaSubject = process.argv[3];  //Search subject

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

        if (response.data === null){
            console.log("Sorry, No results...")// not working
          } else {
            for (i=0; i<response.data.length; i++){
              console.log("Venue: \n" + response.data[i].venue.name);
              console.log("Loctation: \n" + response.data[i].venue.city + ", " + response.data[i].venue.country);
              console.log("Date: \n" + moment(response.data[i].datetime).format("L") + "\n"); // need to use moment.js
              }
          }
        }
    );
};

//Spotify
//-----------------------------------------------------------------------

function spotiftySearch(mediaSubject) {

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

  if (mediaSubject === undefined){ 
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

//Switch
//-----------------------------------------------------------------------

switch (expression) {
        case "song":
          spotiftySearch(mediaSubject);
          break;
        case "movie":
          omdb(mediaSubject);
          break;
        case "concert":
          bandsInTown(mediaSubject);
          break;
        default:
          console.log("\n Hi! Welcome to Liri. Search for music, concerts, and movies.");
          console.log("To search simply type 'song', 'concert', or 'movie' followed by what your are looking for.");
          console.log("Party On!");
};