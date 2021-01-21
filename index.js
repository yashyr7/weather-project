const { TIMEOUT } = require("dns");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const apiKey = "c1640f392775737bdfc82ad81314ece3"

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
  city = req.body.city;
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;
  https.get(url, (response) => {
    response.on("data", (d) => {
      const weatherData = JSON.parse(d);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const image = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      res.write("<p>Todays weather forceast is: " + description + "</p>");
      res.write("<h1>Temperature in " + city + " is: " + temp + "C</h1>");
      res.write("<img src = '" + image + "'></img>");
      res.send();
    });
  });
})

/*
var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;
https.get(url, (response) => {
  response.on("data", (d) => {
    const weatherData = JSON.parse(d);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const image = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
    res.write("<p>Todays weather forceast is: " + description + "</p>");
    res.write("<h1>Temperature in the 6ix is: " + temp + "C</h1>");
    res.write("<img src = '" + image + "'></img>");
    res.send();
  });
});
*/
app.listen(3000);
