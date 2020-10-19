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
        console.log(weather.data.properties.periods);
    }) 
});