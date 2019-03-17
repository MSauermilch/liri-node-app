
console.log("Radio Check")
console.log("Hello, Over!")

var axios = require ("axios");
    // var spotify = new spotify(keys.spotify);
    //var bands in town

    //others
      // require("dotenv").config();
      // var keys = require("./keys.js");

var expression = process.argv[2];   //switch
var mediaSubject = process.argv[3];   //concert, song, movie
console.log("Your looking for: " + mediaSubject)

    // ?? node file api "mediaSubject" ??

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

//axous request
//-----------------------------------------------------------------------

function omdb(mediaSubject){
var queryUrl = "http://www.omdbapi.com/?t=" + mediaSubject + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);// delete

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  }
);
};

//switch
//-----------------------------------------------------------------------

switch (expression) {
        case "omdb":
          omdb(mediaSubject);
          console.log("omdb search");
          break;
        // case Y:
        //   function();
        //   break;
        // case Z:
        //   function(); // 
        //   break;
        default:
          console.log("no es bueno")
}
