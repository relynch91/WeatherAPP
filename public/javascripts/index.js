import { formatAddress, getWeather } from './google-api.js';
const d3 = require('d3');
import { forceCenter } from 'd3';

document.addEventListener('DOMContentLoaded', () => {
    const graphDataPoints = []; 
    if (graphDataPoints.length > 0) {
        let button0 = document.forms[1]
        button0.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log('here');
        })
    }
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
        // let graphDatapoints = [];
        for (let k = 0; k < theGoods.length; k++) {
            if (k === 3) {
                let answer = buildDataTemp(theGoods[k]);
                graphDataPoints.push(answer);
            }
            let answer = buildData(theGoods[k]);
            graphDataPoints.push(answer);
        }
        console.log(graphDataPoints)
        update(graphDataPoints, 4)
        return true;
    }

    let buildDataTemp = (data) => {
        let answer = [];
        for (let i = 0; i < data.length; i++) {
            let timeData = data[i]['validTime'];
            let timeValue = ((timeData.split("/")[0]).split("+")[0]);
            let dataValue = (data[i]['value']) * (9.00/5) + 32.00;
            let forecastDuration = parseInt((timeData.split("/")[1]).split("")[2]);
            if (forecastDuration !== 1) {
                let string = timeValue.split("-");
                let month = parseInt(string[1]);
                let year = parseInt(string[0])
                let day = parseInt(string[2].split("T")[0]);
                let hour = parseInt(string[2].split("T")[1]);
                for (let j = 0; j < forecastDuration; j++) {
                    if (j === 0) {
                        answer.push({ time: timeValue, value: dataValue })
                    } else {
                        if (hour < 10) {
                            let newTime = year.toString() + "-" + month.toString() + "-" + day.toString() + "T" + + "0" + hour.toFixed() + ":00:00";
                            answer.push({ time: newTime, value: dataValue })
                        } else {
                            let newTime = year.toString() + "-" + month.toString() + "-" + day.toString() + "T" + hour.toFixed() + ":00:00";
                            answer.push({ time: newTime, value: dataValue })
                        }
                    }
                    hour += 1;
                    if (hour === 24) {
                        hour = 0;
                        day += 1;
                    } else if (day === 32) {
                        day = 1;
                        month += 1;
                    } else if (month === 13) {
                        month = 1;
                        year += 1;
                    }
                }
            } else {
                answer.push({ time: timeValue, value: dataValue })
            }
        }
        return (answer);
    }

    let buildData = (data) => {
        let answer = [];
        for (let i = 0; i < data.length; i++){
            let timeData = data[i]['validTime'];
            let timeValue = ((timeData.split("/")[0]).split("+")[0]);
            let dataValue = data[i]['value'];
            let forecastDuration = parseInt((timeData.split("/")[1]).split("")[2]); 
            if (forecastDuration !== 1) {
                let string = timeValue.split("-");
                let month = parseInt(string[1]);
                let year = parseInt(string[0])
                let day = parseInt(string[2].split("T")[0]);
                let hour = parseInt(string[2].split("T")[1]);
                for (let j = 0; j < forecastDuration; j ++) {
                    if (j === 0) {
                        answer.push({ time: timeValue, value: dataValue })
                    } else {
                        if (hour < 10) {
                            let newTime = year.toString() + "-" + month.toString() + "-" + day.toString() + "T" + + "0" + hour.toFixed() + ":00:00";
                            answer.push({ time: newTime, value: dataValue })
                        } else {
                            let newTime = year.toString() + "-" + month.toString() + "-" + day.toString() + "T" + hour.toFixed()+ ":00:00";
                            answer.push({ time: newTime, value: dataValue })
                        }   
                    }
                    hour += 1;
                    if (hour === 24) {
                        hour = 0;
                        day += 1;
                    } else if (day === 32) {
                        day = 1;
                        month += 1;
                    } else if (month === 13) {
                        month = 1;
                        year += 1;
                    }
                }
            } else {
                answer.push({time: timeValue, value: dataValue})
            }
        }
        return(answer);
    }

    let update = (data, value=0) => {

        console.log("I was clicked")
        buildGraph(data[value]);
    }

    let buildGraph = (data) => {
        let dates = [];
        let values = [];
        let dataPackaged = data.map(function(d) {
            let answer = {};
            let key = new Date(d['time']);
            dates.push(key);
            let value = d['value'];
            values.push(value);
            answer['key'], answer['value'];
            answer['key'] = key;
            answer['value'] = value;
            return answer
            }
        )

        let margin = { top: 50, right: 50, bottom: 50, left: 50 }
        let width = 850 - margin.left - margin.right;
        let height = 600 - margin.top - margin.bottom;

        let x = d3.scaleTime()
            .domain(d3.extent(dates))
            .range([0, width]);

        let y = d3.scaleLinear()
            .domain([d3.min(values), d3.max(values)])
            .range([height, 0]);

        let line = d3.line() 
            .x(function (d) { return x(d.key) }) 
            .y(function (d) { return y(d.value) }) 
            .curve(d3.curveMonotoneX) 

        let svg = d3.select("#d3-graph")
            .append("svg")
            .classed("svg-class", true)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

        svg.append("path")
            .datum(dataPackaged) 
            .attr("class", "line") 
            .attr("d", line);
        }
});