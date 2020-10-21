import { formatAddress, getWeather } from './google-api.js';
const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    let search = document.forms[0];
    search.addEventListener("submit", async function(e){
        e.preventDefault();
        let address = search.querySelector('input[type="text"]').value;
        let addressFormatted = formatAddress(address);
        let weather = await getWeather(addressFormatted);
        let weatherData = weather.data.properties.periods

        for (let i = 0; i < weatherData.length; i += 2 ) {
            let header1 = weatherData[i].name;
            let shortForecast = weatherData[i].shortForecast;
            let temp = weatherData[i].temperature;
            let windDirection = weatherData[i].windDirection;
            let windSpeed = weatherData[i].windSpeed;
            let newItem = document.createElement("div");
            newItem.id = "weather-data";
            newItem.innerHTML = `<h1 class="weather-input">${header1}:</h1>
                                <h3 class="weather-input-temp">${shortForecast}</h3>
                                <h3 class="weather-input-h3">Temp ${temp}°</h3>
                                <h3 class="weather-input-windDir">Wind Direction: ${windDirection}</h3>
                                <h3 class="weather-input-windSpd">Wind Speed: ${windSpeed}</h3>
                                `;
            let list = document.getElementById('weather-info');
            list.append(newItem);
        }
    });
});