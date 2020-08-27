/*  CREATE A WEATHER APP

    * Search for a city's weather conditions
        - Create framework and flow.
        - Add form for text to be inputed in.
        - Add search function to look for cities.
        - Present current and future conditions for that city and that city is added to the search history.
    
    * Display current weather conditions for that city
        - Display name of city searched.
        - Display date
        - Display an icon for weather condition representation.
        - Display temperature, humidity, wind speed, and UV index.

    * UV index and future weather conditions
        - Display color that indicates weather conditions as favorable, moderate, or severe.
        - Present a 5-day forecast that displays date, icon of weather conditions, temperature, and humidity.

    * Search history search
        - Use stored local data city names
        - Display the current and future conditions of a city upon clicking a it's name in the search history.

*/

var cityInputEl = document.querySelector ("#city-search");
var citySearchTerm = document.querySelector("#city-search-term");
var cityFormEl = document.querySelector("#city-form");
var apiUrl = "pro.openweathermap.org/data/2.5/forecast/hourly?"; // Open Weather API URL
var apiKey = "cd7fcf2b24666d2644afde8dd6cfcd12"; // My Openweather API key.


function convertCtoF (temperature) {
    (temperature * 9/5) + 32;
};

tempEl.addEventListener("click" function() { // Convert C to F and F to C with click.
    if(weather.temperatue.value === undefined) return;
    if(weather.temperature.unit === "celsius") {
        var fahrenheit = convertCtoF(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempEl.innerHTML = "${fahrenheit} <span>F</span>";
        weather.temperature.unit = "fahrenheit";
    } else {
        tempEl.innerHTML = "${weather.temperature.value} <span>C</span>";
        weather.temperature.unit = "celsius";
    }
});


cityFormEl.addEventListener("submit", formSubmitHandler);