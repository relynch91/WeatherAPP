# Straight From NOAA


Straight-From-NOAA is a Javascript project that utilizes minimal libraries or packages.
The App utilizes ExpressJS Framework, as well as Axios for API requests and 
uses WebPack as the modular bundler.

A user submits a request in the form of an address or city to search for the weather.
A request is then made to GoogleMaps GeoCoding API, which is responsible for taking in the
adress and then responds with an accurate latitude and longitude position.  Then, 
more api requests are made to NOAA, the National and Oceanic Atmospheric Administration,
for long-term and short-term weather model forecasts. 