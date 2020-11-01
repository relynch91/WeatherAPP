import { formatAddress, getWeather } from './google-api.js';
const d3 = require('d3');
import buildData from "./build-data";
import buildGraph from "./build-graph";

document.addEventListener('DOMContentLoaded', () => {
    const graphDataPoints = [];
    let search = document.forms[0];

    search.addEventListener("submit", async function(e){
        e.preventDefault();
        let address = search.querySelector('input[type="text"]').value;
        let addressFormatted = formatAddress(address);
        let weatherRes = await getWeather(addressFormatted);
        let weather1 = weatherRes.short.data.properties.periods;

        for (let i = 0; i < weather1.length; i += 2 ) {
            let header1 = weather1[i].name;
            let shortForecast = weather1[i].shortForecast;
            let temp = weather1[i].temperature;
            let windDirection = weather1[i].windDirection;
            let windSpeed = weather1[i].windSpeed;
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
        let buttons = document.getElementById('weather-buttons');
        buttons.innerHTML = 'Dewpoint Humidity Skycover Temperature WindSpeed WindDirection'.split(" ").map((ele) => {
            return (
                `<button id="graph-button" type="button" value=${ele}>${ele}</button>
                `)
            })
        let buttonListener = document.getElementById("weather-buttons").querySelectorAll("#graph-button");
        for(let a = 0; a < buttonListener.length; a ++) {
            buttonListener[a].onclick = function (e) {
                e.preventDefault();
                d3.selectAll("#d3-graph > *").remove();
                formatGraphData(weatherRes['long'], a);
            }
        }
        formatGraphData(weatherRes['long']);
    });

    let formatGraphData = (data, value = 4) => {
        let dewPoint = data.data.properties.dewpoint.values;
        let relativeHumidity = data.data.properties.relativeHumidity.values;
        let skyCover = data.data.properties.skyCover.values;
        let temperature = data.data.properties.temperature.values;
        let windSpeed = data.data.properties.windSpeed.values;
        let windDirection = data.data.properties.windDirection.values;
        let theGoods = [dewPoint, relativeHumidity, skyCover, temperature, 
                        windSpeed, windDirection]
        for (let k = 0; k < theGoods.length; k++) {
            let answer = buildData(theGoods[k]);
            graphDataPoints.push(answer);
        }
        update(graphDataPoints, value);
    }

    function update(data, value) {
        buildGraph(data[value], value);
    }
});