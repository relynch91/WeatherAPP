import { forceCenter } from 'd3';
import { formatAddress, getWeather } from './google-api.js';
const d3 = require('d3');

document.addEventListener('DOMContentLoaded', () => {
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
        formatGraphData(weatherRes['long']);
    });

    let formatGraphData = (data) => {
        let dewPoint = data.data.properties.dewpoint.values;
        let relativeHumidity = data.data.properties.relativeHumidity.values;
        let skyCover = data.data.properties.skyCover.values;
        let temperature = data.data.properties.temperature.values;
        let windSpeed = data.data.properties.windSpeed.values;
        let windDirection = data.data.properties.windDirection.values;
        let theGoods = [dewPoint, relativeHumidity, skyCover, temperature, 
                        windSpeed, windDirection]
        let graphDatapoints = [];

        for (let k = 0; k < theGoods.length; k++) {
            let answer = buildData(theGoods[k]);
            graphDatapoints.push(answer);
        }
        buildGraph(graphDatapoints);
        return true;
    }

    let buildData = (data) => {
        let answer = [];
        for (let i = 0; i < data.length; i++){
            let timeData = data[i]['validTime'];
            let timeValue = ((timeData.split("/")[0]).split("+")[0]).split(":")[0];
            let dataValue = data[i]['value'];
            let forecastDuration = parseInt((timeData.split("/")[1]).split("")[2]); 
            if (forecastDuration !== 1) {
                let string = timeValue.split("-");
                let month = parseInt(string[1]);
                let year = parseInt(string[0])
                let day = parseInt(string[2].split("T")[0]);
                let hour = parseInt(string[2].split("T")[1]);
         
                for(let j = 0; j < forecastDuration; j ++) {
                    if (j === 0) {
                        answer.push({ time: timeValue, value: dataValue })
                    } else {
                        hour += 1;
                        if (hour === 24) {
                            hour = 0;
                            day += 1;
                        }
                        if (day === 32) {
                            day = 1;
                            month += 1;
                        }
                        if (month === 13) {
                            month = 1;
                            year += 1;
                        }
                        let newTime = year.toString()+"-" + month.toString()+ "-" + day.toString() + "T" + hour.toString();
                        answer.push({time: newTime, value: dataValue })
                    }
                }
            } else {
                answer.push({time: timeValue, value: dataValue})
            }
        }
        return(answer);
    }

    let buildGraph = (data) => {
        console.log(data);
        let margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = 800 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

        let svg = d3.select("#d3-graph")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        // // Add X axis --> it is a date format
        // let x = d3.scaleLinear()
        //     .domain(d3.extent(data, function (d) { return d.year; }))
        //     .range([0, width]);
        // svg.append("g")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x).ticks(5));
        // // Add Y axis
        // let y = d3.scaleLinear()
        //     .domain([0, d3.max(data, function (d) { return +d.n; })])
        //     .range([height, 0]);
        // svg.append("g")
        //     .call(d3.axisLeft(y));
    }
});