
# Welcome to Liri.

## Siri's cousin 

Ever need some info on a song you just heard? Has nostalgia ever hit and made you wonder if
your favorite high school band was on tour? While at a bar have you ever needed to know the 
year Home Alone was release in theaters to win that bet with the guy who won't just let it go? Well, your answer is here!
Liri. Start her up, watch her go, and see what answers you can find.  

## Project's Requirements

This App is a Node server that makes calls to serveral APIs which then returns Song Info, Concert/Tour Information, and Movie Info. 

* "Bands in Town" returns the user requested band info, logging the respones Venue's Name, Location, and Event Date.   

* "Spotify" returns the user requested song's Artist's Name, Song Name, Preview Link, and Album of Song.

* "OMDB" returns the user requested Movie's Tilte, Year, IMDB, Rotten Tomatoes ratings, and a few others...

## Technologies Used
Liri intagrates serval technologies to function. Included are:

* Nodejs - JavaScript runtime built on Chrome's V8 JavaScript 
engine

* Axios - Promise based HTTP client for the browse
* Momentjs - Parses, validates, manipulates, and displays dates and times in Javascript.
* Spotify API

## Explanation of Code
Liri is a node based server that uses client input to search various APIs. Each API is different with its own requirements.

Main files:

    liri.js
    random.txt
    keys.js
    .env *Not included in this repo

All of the meat and potatoes are located in the file:

    liri.js

From here the server functions are run. We have several dependences that load up. Axios makes our requests to Bands-in-town and OMDB while Spotify has its own api. To format some response data from bands-in-town we employ moment.js. Currently we are attemping to use Node's File System to grab our Random txt file (which is corrently a future feature) to randomly search spotify. 

    var axios = require ("axios");
    var Spotify = require("node-spotify-api");
    var fs = require("fs");
    var moment = require("moment");
    var spotify = new Spotify(keys.spotify);

Since Spotify requires a key to make API requests we use two files to store and protect our developement credentials. Variables for our Spotify key are set up in the keys.js and using the dotenv module we pass our .env file in providing the data.

    keys.js
    .env

Well I hope that covers all the bases you might be interested in. Please feel free to copy this play around with it. You will need your get credientials from spotify to run the server properly. Party On!
