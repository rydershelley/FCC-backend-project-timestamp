// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//////////////////////

//output format
let resultTemplate = (validDate) => {
  return {
    unix: validDate.getTime(),
    utc: validDate.toUTCString()
  }
}

//process get requests
app.get("/api/:date?", (req, res) => {
  //catchall current time for empty input param
  let date = new Date();
  date = date.getTime(); //convert to milliseconds
  

  
  if (!isNaN(req.params.date)) {
    //if input is string of numbers convert to date as number
    date = new Date(Number(req.params.date))
  } else {
    //otherwise return date as regular date format
    date = new Date(req.params.date)
  };

  //if no input date leave output as current time
  if (!req.params.date) {
    date = new Date()
  };
  
  //if input date is invalid format catch it and return 'invalid'
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" })
  };

  res.send(resultTemplate(date));
  });


////////////////////////

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
