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

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;

  if(date){
    if (/\d{5,}/.test(date)) {
      res.json({ unix : Number(date), utc : new Date(Number(date)).toUTCString() });
    } else {
      let date2 = new Date(date);
      if(date2.toString() === 'Invalid Date')
        res.json({ error : "Invalid Date" });
      else
        res.json({ unix : date2.valueOf(), utc : date2.toUTCString() });
    }
  } else {
    res.json({ unix : new Date().valueOf(), utc : new Date().toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
