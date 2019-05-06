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
    mediaSubject = mediaSubject.trim();
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
            console.log("Sorry, Nothing turned up for " + mediaSubject);
            return;
        }; 
        
        for (var i=0; i<response.data.length; i++){
          
            var showInfo = response.data[i];

            console.log("Venue: " + showInfo.venue.name + "\n" +
                        "Loctation: " + showInfo.venue.city + ", " + showInfo.venue.country + "\n" +
                        "Date: " + moment(showInfo.datetime).format("L") + "\n");
              };
        }
    ).catch((err) => {
      console.error(err);
    });
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
        console.log("\n" +
                    "Title: " + response.data.Title + "\n" +
                    "Year: " + response.data.Year + "\n" +
                    "IMDB Rating: " + response.data.imdbRating + "\n" +
                    "Rotten Tomato's Rating: " + response.data.tomatoRating + "\n" +
                    "Produced in: " + response.data.Country + "\n" +
                    "Language: " + response.data.Language + "\n" +
                    "Plot: " + response.data.Plot + "\n" +
                    "Cast: " + response.data.Actors);
      }
    );
};

//Do-what-it-says
//-----------------------------------------------------------------------

// function doWhat() {
//       fs.readFile('random.txt','utf8', function(error, data){
//         console.log(data);

//         var dataArr = data.split(",");
    
//         if (dataArr.length === 2) {
//           pick(dataArr[0], dataArr[1]);
//         } else if (dataArr.length === 1) {
//           pick(dataArr[0]);
//         }
//     });
//   };

//Switch
//-----------------------------------------------------------------------

switch (expression) {
        case "song":
          spotifySearch(mediaSubject);
          break;
        case "movie":
          omdb(mediaSubject);
          break;
        case "concert":
          bandsInTown(mediaSubject);
          break;
        // case "do-what-it-says":
        //   doWhat();
        //   break;
        default:
          console.log("\n" +
                      "Hi! Welcome to Liri." + "\n" +
                      "Search for music, concerts, and movies." + "\n\n" +
                      "To search simply type: " + "\n" +
                      "'song'     --- For information about songs your interested in."  + "\n" + 
                      "'concert'  --- To see if there are any shows coming up you might be interested."  + "\n" +
                      "'movie'    --- For movie information about a specific movie." + "\n\n" + 
                      "Followed by the Name/subject related to your are looking for." + "\n" + 
                      "Party On!");
};