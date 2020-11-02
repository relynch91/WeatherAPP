const buildHtml = (weather1) => {
    for (let i = 0; i < weather1.length; i += 2) {
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
    buttons.innerHTML = "<button id='graph-button' type='button'>DewPoint</button>"
    buttons.innerHTML += "<button id='graph-button' type='button'>Humidity</button>"
    buttons.innerHTML += "<button id='graph-button' type='button'>Skycover</button>"
    buttons.innerHTML += "<button id='graph-button' type='button'>Temperature</button>"
    buttons.innerHTML += "<button id='graph-button' type='button'>Wind Speed</button>"
    buttons.innerHTML += "<button id='graph-button' type='button'>Wind Direction</button>"
    return true;
}

export default buildHtml