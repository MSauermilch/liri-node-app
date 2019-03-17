
console.log("Radio Check")
console.log("Hello, Over!")

var axios = require ("axios");
var Spotify = require('node-spotify-api');

    // var spotify = new spotify(keys.spotify);
    //var bands in town

    //others
      // require("dotenv").config();
      // var keys = require("./keys.js");

var expression = process.argv[2];   //switch
var mediaSubject = process.argv[3];   //concert, song, movie
console.log("Your looking for: " + mediaSubject)

// var nodeArgs = process.argv;    // is an array.....?! will need to be moved to argv4, agrv 3 will deseziate an apit bands/spot/omdb
// var movieName = "";
//   for (var i = 3; i < nodeArgs.length; i++) {
//     if (i > 2 && i < nodeArgs.length) {
//       movieName = movieName + "+" + nodeArgs[i];
//     }
//     else {
//       movieName += nodeArgs[i];
//     }
//   }

// console.log("line29; Movie Name:" + movieName);

//Spotify
//-----------------------------------------------------------------------

function bandsInTown(mediaSubject){

  var queryUrl = "https://rest.bandsintown.com/artists/" + mediaSubject + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
      console.log(response);
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

  if (mediaSubject === ""){  //does not work
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
        case "spotify":
          spotify(mediaSubject);
          break;
        case "omdb":
          omdb(mediaSubject);
          break;
        case "concerts":
          bandsInTown(mediaSubject);
          break;
        default:
          console.log("no es bueno")
};
