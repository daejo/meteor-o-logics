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


// fetch(weatherURL)
//     .then(function((data) {
//         console.log("response", data)
//     });
//         // request was successful

// button.addEventListener("submit", formSubmitHandler);


// $(document).ready(function() {

//     var citySearchTerm = document.getElementById("city-search-term");
//     var cityFormEl = document.getElementById("city-form");
    
   

//     $("#Submit").on("click", function() {
//         var cityInputEl = $("#city-search").val();
//         cityInputEl = citySearchTerm.textContent;

//         var apiKey = "cd7fcf2b24666d2644afde8dd6cfcd12"; // My Openweather API key.
        
//         var weatherURL = "api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&appid=" + apiKey; // Current Weather API URL.
       
//         var forecastURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl + "&appid=" + apiKey; //Forecast API URL.
        
//         $.ajax({
//             url: weatherURL,
//             method: "GET"
//         }).then(function(res) {
//             console.log(res);

//             var lat = res.coord.lat;
//             var long = res.coord.long;

//             $.ajax({
//                 url: forecastURL,
//                 method: "GET"
//             }).then(function(res) {
//                 console.log(res);
    
//                 var lat = res.coord.lat;
//                 var long = res.coord.long;
//             })

//         })
        
//     })


// })