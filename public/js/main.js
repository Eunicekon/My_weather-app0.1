const request = require('request');

const cities = [{name: 'Dubai', value: 'Dubai'}, {name: 'London', value: 'London'}, {name: 'Paris', value: 'Paris'},
{name: 'Brisbane', value: 'Brisbane'}, {name: 'Berlin', value: 'Berlin'}, {name: 'Barcelona', value: 'Barcelona'}, 
{name: 'New York', value: 'New York'}, {name: 'Accra', value: 'Accra'}, {name: 'Cape Town', value: 'Cape Town'}];


//get modal element
var modal = document.getElementById('simpleModal');
//get open modal button
var modalBtn = document.getElementById('modalBtn');
//get close button
var closeBtn = document.getElementsByClassName('closeBtn');

//Listen for open click
modalBtn.addEventListener('click', openModal);
//Listen for close click
closeBtn.addEventListener('click', closeModal);
//Listen for outside click
window.addEventListener('click', outsideClick);

//function to open modal
function openModal(){
    modal.style.display = 'block';
}

//function to close modal
function closeModal(){
    modal.style.display = 'none';
}

//function to close modal if outside click
function outsideClick(e){
    if(e.target == modal){
    modal.style.display = 'none';
    }
}
    

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
    const api_Key = process.env.api_Key;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_Key}`;
    request(url, function (err, response, body) {
      if(err) console.log('Error: ', err);
      const weatherData = JSON.parse(body)

      const get_temp = document.getElementById("temperature");
      get_temp.textContent = `It's currently ${weatherData.main.temp} °F`  
      console.log(JSON.parse(body));
      const icon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      const get_icon = document.getElementById("weatherIcon") ;
      get_icon.src= icon;
    });
    
}

buildDropdown();
