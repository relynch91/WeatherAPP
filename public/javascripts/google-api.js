const axios = require('axios');
// const googleKey = process.env.GOOGLE_GEO_CODING;
// import googleKey from '../../configKeys/config-keys.js';

export function formatAddress(address) {
    let words = address.split(",").map(x => {
        let newWord = x.replace(" ", "");
        return newWord;
    })
    return words.join(",+")
}

export async function getWeather(formatted) {
    let latLong = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted}&key=AIzaSyDspsYjXNcK4ISYOm6BXBg9xqeggV1Td5I`);
    let lat = latLong.data.results[0].geometry.location['lat'];
    let long = latLong.data.results[0].geometry.location['lng'];
    let govMetaData = await axios.get(`https://api.weather.gov/points/${lat},${long}`);
    let forecast = await axios.get(govMetaData.data.properties.forecast);
    let forecastProper = await axios.get(govMetaData.data.properties.forecastGridData)
    return {
        short: forecast,
        long: forecastProper
    }
}