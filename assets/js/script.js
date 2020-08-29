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
var apiKey = "cd7fcf2b24666d2644afde8dd6cfcd12"; // My Openweather API key.
// var weatherURL = "api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&appid=" + apiKey; // Current Weather API URL.
// var forecastURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl + "&appid=" + apiKey; //Forecast API URL.
var findCityEl = document.querySelector("#Submit");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.getElementById("city-search");
var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
var sampleUrl = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=cd7fcf2b24666d2644afde8dd6cfcd12";


// fetch(sampleUrl).then((data) => { 
//     console.log("response", data.json())

// });

fetch(sampleUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        console.log(response)
        /* DATE */
        // var dateEl = document.getElementById("date-display");
        // dateEl.innerHTML = response.list[0].dt_txt;

        /* TEMPERATURE */  
        var tempEl = document.getElementById("temp-display"); 
        tempEl.innerHTML = (Math.floor((response.main.temp - 273.15) * 9/5 + 32)) + "&deg;F"; //Converts, Rounds off and displays Temperature from K to F.

        /* HUMIDITY */  
        var humidEl = document.getElementById("humid-display"); 
        humidEl.innerHTML = response.main.humidity + "%";
        
        /* WIND SPEED */  
        var windEl = document.getElementById("wind-display"); 
        windEl.innerHTML = response.wind.speed + "mph";
        
        /* UV */  
        var uvEl = document.getElementById("uv-display"); 
        uvEl.innerHTML = response.list[0].wind.speed + "mph";
        
        var coord = document.getElementById("uv-display");
    });







