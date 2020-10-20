import { formatAddress, getWeather } from './google-api.js';
const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
    let search = document.forms[0];
    search.addEventListener("submit", async function(e){
        e.preventDefault();
        let address = search.querySelector('input[type="text"]').value;
        console.log(address)
        let addressFormatted = formatAddress(address);
        let weather = await getWeather(addressFormatted);
        let weatherData = weather.data.properties.periods

        for (let i = 0; i < weatherData.length; i ++ ) {
            console.log(weatherData[i]);
            let header1 = weatherData[i].name;
            let shortForecast = weatherData[i].shortForecast;
            let temp = weatherData[i].temperature;
            let temperatureUnit = weatherData[i].temperatureUnit;
            let windDirection = weatherData[i].windDirection;
            let windSpeed = weatherData[i].windSpeed;
            let icon = weatherData[i].icon
            console.log(icon);
            let newItem = document.createElement("div");
            newItem.id = "weather-data";
            newItem.innerHTML = `<h1 class="weather-input">
                                    ${header1}
                                    <h2>${shortForecast}</h2>
                                    <img src=${icon}</img>
                                    <h3>Temp ${temp} ${temperatureUnit}</h3>
                                    <h3>Wind Direction: ${windDirection}</h3>
                                    <h3>Wind Speed: ${windSpeed}</h3>
                                    
                                </h1>`;
            let list = document.getElementById('weather-info');
            
            list.append(newItem);
        }
    });
});

// detailedForecast: "Sunny. High near 72, with temperatures falling to around 68 in the afternoon. West wind around 12 mph."
// endTime: "2020-10-19T18:00:00-07:00"
// icon: "https://api.weather.gov/icons/land/day/few?size=medium"
// isDaytime: true
// name: "This Afternoon"
// number: 1
// shortForecast: "Sunny"
// startTime: "2020-10-19T15:00:00-07:00"
// temperature: 72
// temperatureTrend: "falling"
// temperatureUnit: "F"
// windDirection: "W"
// windSpeed: "12 mph"