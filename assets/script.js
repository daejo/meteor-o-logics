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


$(document).ready(function() {

    var citySearchTerm = document.getElementById("city-search-term");
    var cityFormEl = document.getElementById("city-form");
  
   

    $("#Submit").on("click", function() {
        var cityInputEl = $("#city-search").val();

        var apiKey = "cd7fcf2b24666d2644afde8dd6cfcd12"; // My Openweather API key.
        
        var weatherURL = "api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&appid=" + apiKey; // Current Weather API URL.
       
        var forecastURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl + "&appid=" + apiKey; //Forecast API URL.
        
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function(res) {
            console.log(res);

            var lat = res.coord.lat;
            var long = res.coord.long;

            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function(res) {
                console.log(res);
    
                var lat = res.coord.lat;
                var long = res.coord.long;
            })

        })
        
    })


})