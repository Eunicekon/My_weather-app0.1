const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require ('request');
const hbs = require( 'express-handlebars');
const api_Key = process.env.api_Key;

require('dotenv').config({path: __dirname + '/.env'});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'index',
  defaultLayout: null,
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
}));


app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  });

  app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_Key}`

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
  
app.listen(port, () => console.log(`App is listening on port ${port}!`));