const request = require('request');

const cities = [{name: 'London', value: 'London'}, {name: 'Paris', value: 'Paris'},
{name: 'Milan', value: 'Milan'}, {name: 'Berlin', value: 'Berlin'}, {name: 'Barcelona', value: 'Barcelona'}, 
{name: 'Chapel Row', value: 'Chapel Row'}, {name: 'Como', value: 'Como'}, {name: 'Cape Town', value: 'Cape Town'}];
    

function buildDropdown(){
    const selectElement = document.getElementById("select");
    console.log(document);
    
    // Iterate over cities
    
    cities.forEach(function(city){
        // Create an <option> element
        let opt = document.createElement('option');
        // Update the element properties
        opt.value = city.value;
        opt.innerHTML = city.name;
        // Add the option as a child of the <select> elemeent
        selectElement.appendChild(opt);
    });
        
    selectElement.onchange = function(e) {
        const city = e.target.value;
        // Write a function which prints the selected city on the page
        const selected_city_element = document.getElementById("selected_city");
        selected_city_element.textContent = `Selected City is ${city}`;
        console.log(city);
        fetchWeather(city);
    }
}

function fetchWeather(city) {
    const API_KEY = process.env.API_KEY;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;
    request(url, function (err, response, body) {
      if(err) console.log('Error: ', err);
      const weatherData = JSON.parse(body)

      const get_temp = document.getElementById("temperature");
      get_temp.textContent = `It's currently ${weatherData.main.temp} °F`  
      console.log(JSON.parse(body));
    //   const icon = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
      const icon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      const get_icon = document.getElementById("weatherIcon") ;
      get_icon.src= icon;
    });
    

}

buildDropdown();

