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
var submitBtn = document.getElementById("Submit")
var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=London"
var sampleUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q=London&appid=cd7fcf2b24666d2644afde8dd6cfcd12";
var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" // UV API
var uvDisplayEl = document.getElementById("uvColor");
var tempColor = document.getElementById("tempColor");

var formSubmit = function(event) {
    event.preventDefault();
    var city = cityInputEl.value;
    searchCity(city);
}

var searchCity = function(city) {

    /* WEATHER API */
    fetch(sampleUrl).then(function(response) {
        return response.json();
        })
        .then(function(response) {
            // console.log(response)

            /* TEMPERATURE */  
            var tempEl = document.getElementById("temp-display");
            tempEl.innerHTML = response.main.temp + "&deg;F"; 
            if (response.main.tempp < 70){            
                tempColor.classList.add("bg-gradient-primary");
            } else if (response.main.temp < 90){
                tempColor.classList.add("bg-gradient-warning");
            } else if (response.main.temp > 90){
                tempColor.classList.add("bg-gradient-danger");
            };

            /* HUMIDITY */  
            var humidEl = document.getElementById("humid-display"); 
            humidEl.innerText = response.main.humidity + "%";
            
            /* WIND SPEED */  
            var windEl = document.getElementById("wind-display"); 
            windEl.innerText = response.wind.speed + "mph";
            
            var lon = response.coord.lon;
            var lat = response.coord.lat;
            var coord = "&lat=" + lat + "&lon=" + lon;

            /* UV API */
            fetch(uvUrl + apiKey + coord).then(function(response) {
                return response.json();
            })
                .then(function(response) {
                    var uvEl =  document.getElementById("uv-display");
                    uvEl.innerText = response.value
                    if (response.value < 5){
                        uvDisplayEl.classList.add("bg-gradient-primary");
                    } else if (response.value > 4){
                        uvDisplayEl.classList.add("bg-gradient-warning");
                    } else if (response.value > 9){
                        uvDisplayEl.classList.add("bg-gradient-danger");
                    };
                
            });

            /* FORECAST API */
            fetch(forecastUrl + "&appid=" + apiKey).then(function(response) {
                return response.json();
            })
                .then(function(response) {
                    console.log(response);
                    /* FIRSTDAY */
                    var firstDateEl = document.getElementById("first-date");
                    var dateOne = response.list[3].dt_txt;
                    firstDateEl.innerText = dateOne.substr(5,6); // .substr(string start, # of characters included)

                    var firstTempEl =  document.getElementById("first-temp");
                    firstTempEl.innerHTML = response.list[3].main.temp + "&deg;F";

                    var firstHumidEl = document.getElementById("first-humid");
                    firstHumidEl.innerText = response.list[3].main.humidity + "%";
                    
                    /* SECONDDAY */
                    var secondDateEl = document.getElementById("second-date");
                    var dateTwo = response.list[11].dt_txt;
                    secondDateEl.innerText = dateTwo.substr(5,6);

                    var secondTempEl =  document.getElementById("second-temp");
                    secondTempEl.innerHTML = response.list[11].main.temp + "&deg;F";

                    var secondHumidEl = document.getElementById("second-humid");
                    secondHumidEl.innerText = response.list[11].main.humidity + "%";
                    
                    /* THIRDDAY */
                    var thirdDateEl = document.getElementById("third-date");
                    var dateThree = response.list[19].dt_txt;
                    thirdDateEl.innerText = dateThree.substr(5,6);
                    
                    var thirdTempEl =  document.getElementById("third-temp");
                    thirdTempEl.innerHTML = response.list[19].main.temp + "&deg;F";
                    
                    var thirdHumidEl = document.getElementById("third-humid");
                    thirdHumidEl.innerText = response.list[19].main.humidity + "%";
                    
                    /* FOURTHDAY */
                    var fourthDateEl = document.getElementById("fourth-date");
                    var dateFour = response.list[19].dt_txt;
                    fourthDateEl.innerText = dateFour.substr(5,6);
                    
                    var fourthTempEl =  document.getElementById("fourth-temp");
                    fourthTempEl.innerHTML = response.list[27].main.temp + "&deg;F";
                    
                    var fourthHumidEl = document.getElementById("fourth-humid");
                    fourthHumidEl.innerText = response.list[27].main.humidity + "%";
                    
                    /* FIFTHDAY */
                    var fifthDateEl = document.getElementById("fifth-date");
                    var dateFive = response.list[35].dt_txt;
                    fifthDateEl.innerText = dateFive.substr(5,6);
                    
                    var fifthTempEl =  document.getElementById("fifth-temp");
                    fifthTempEl.innerHTML = response.list[35].main.temp + "&deg;F";
                    
                    var fifthHumidEl = document.getElementById("fifth-humid");
                    fifthHumidEl.innerText = response.list[35].main.humidity + "%";
            
            });

    });

};

submitBtn.addEventListener("click", formSubmit);



            







