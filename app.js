const express = require('express');
const app = express();
const port = 3000
const bodyParser = require('body-parser');
const request = require ('request');
const API_KEY = process.env.API_KEY;
require('dotenv').config();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  });


  
  app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`

    // creating a working icon using the icon code from the API

    //let icon = "https://openweathermap.org/img/w/" + data.weather[0].icon;

    request(url, function (err, response, body) {
      console.log(document);
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });

  })
  
app.listen(port, () => console.log(`Eunice your weather-app is listening on port ${port}!`));