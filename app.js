const axios = require("axios");
const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

app.use(express.static('public'))

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/location/getHeroku', (request, res) => {
  let gAPIKey = process.env.GOOGLE_GEO_CODING;
  
  return(res.send(JSON.stringify(gAPIKey)));
  // let formattedstuff = request.params.formatted;
  // let latLong = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedstuff}&key=${gAPIKey}`);
  // return res.send(JSON.stringify(latLong)
});


app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
});
