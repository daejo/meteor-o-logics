var apiKey = "cd7fcf2b24666d2644afde8dd6cfcd12"; // My Openweather API key.
var findCityEl = document.querySelector("#Submit");
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.getElementById("city-search");
var submitBtn = document.getElementById("Submit");
var cityNameEl = document.getElementById("city-name");
var uvDisplayEl = document.getElementById("uvColor");
var firstDayEl = document.getElementById("first-day");
var secondDayEl = document.getElementById("second-day");
var thirdDayEl = document.getElementById("third-day");
var fourthDayEl = document.getElementById("fourth-day");
var fifthDayEl = document.getElementById("fifth-day");
var searchListEl = document.getElementById("search-list");
var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&q="; //Weather API
var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&q="; //5-day Weather Forecast
var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?"; // UV API
var citySave = [];

var formSubmit = function(event) {
    event.preventDefault();
    cityNameEl.innerText = cityInputEl.value
    var city = cityInputEl.value;
    
    var newCity = city //Link city input to new variable

    if (newCity) { //Creates list element and saves to storage
        cityList = document.createElement("li");
        cityList.innerHTML="<a href='#' class='list-group-item'><span data-feather='file'></span>"+newCity+"</a>";
        
        searchListEl.appendChild(cityList);
        citySave.push(newCity);

        localStorage.setItem("cityName", JSON.stringify(citySave));

        searchCity(newCity);
        inputValue.value = "";

    } else {
        alert("Please enter a city.");
    }

};

var loadCity = function () {
   var cityName = JSON.parse(localStorage.getItem("cityName"));
   
   if (cityName === null) {
       return;
   }
   else {
       for (var i = 0; i < cityName.length; i++) {
           cityList = document.createElement("li");
           cityList.innerHTML="<a href='#' class='list-group-item'><span data-feather='file'></span>"+cityName[i]+"</a>";
           searchListEl.appendChild(cityList);
       }
   }
};




var searchCity = function(value) {

    /* WEATHER API */
    fetch(weatherUrl + value + "&appid=" + apiKey).then(function(response) { //Weather API link with input and appkey
        return response.json();
        })
        .then(function(response) { 
            
            var IconEl = document.getElementById("wicon")
            
            var iconCode = response.weather[0].icon
            IconEl.setAttribute("src", ("http://openweathermap.org/img/w/" + iconCode + ".png"))

            /* TEMPERATURE */  
            var tempEl = document.getElementById("temp-display");
            tempEl.innerHTML = response.main.temp + "&deg;F"; 
            if (response.main.temp < 70){ //Color change parameters        
                tempColor.setAttribute("style", "background-image: linear-gradient(45deg, hsl(231, 100%, 56%) 0%, #2BD2FF 52%, #a8cbff 90%); color: white;");
            } else if (response.main.temp < 90){
                tempColor.setAttribute("style", "background-image: linear-gradient(45deg, hsl(46, 100%, 30%) 0%, #e2c000 52%, #ffd900 90%); color: white;");
            } else {
                tempColor.setAttribute("style", "background-image: linear-gradient(45deg, hsl(0, 100%, 50%) 0%, #e66f00 52%, #ff7c01 90%); color: white;");
            };

            /* HUMIDITY */  
            var humidEl = document.getElementById("humid-display"); 
            humidEl.innerText = response.main.humidity + "%";
            
            /* WIND SPEED */  
            var windEl = document.getElementById("wind-display"); 
            windEl.innerText = response.wind.speed + "mph";

            var coordinates = "&lon=" + response.coord.lon + "&lat=" + response.coord.lat

        /* UV API */
        fetch(uvUrl + coordinates + "&appid=" + apiKey).then(function(response) { //UV API link with coordinates and appkey
            return response.json();
        })
            .then(function(response) {
                var uvEl =  document.getElementById("uv-display");
                uvEl.innerText = response.value
                if (response.value < 4){
                    uvDisplayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(106, 100%, 21%) 0%, #0a9922 52%, #15ff00 90%); color: white;");
                } else if (response.value < 8){
                    uvDisplayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(46, 100%, 30%) 0%, #e2c000 52%, #ffd900 90%); color: white;");
                } else {
                    uvDisplayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(0, 100%, 50%) 0%, #e66f00 52%, #ff7c01 90%); color: white;");
                };
            
            });
        });   

    /* FORECAST API */
    fetch(forecastUrl + value + "&appid=" + apiKey).then(function(response) { //Forecast API link with coordinates and appkey
        return response.json();
    })
    .then(function(response) {
        var firstIconEl = document.getElementById("wicon-one")
        var secondIconEl = document.getElementById("wicon-two")
        var thirdIconEl = document.getElementById("wicon-three")
        var fourthIconEl = document.getElementById("wicon-four")
        var fifthIconEl = document.getElementById("wicon-five")

        /* FIRSTDAY */
        var firstDateEl = document.getElementById("first-date");
        var dateOne = response.list[0].dt_txt;
        firstDateEl.innerText = dateOne.substr(5,6); // .substr(string start, # of characters included)
        
        var iconCodeOne = response.list[0].weather[0].icon // Finds appropriate icon.
        firstIconEl.setAttribute("src", ("http://openweathermap.org/img/w/" + iconCodeOne + ".png")) //Embed's icon into HTML

        var firstTempEl =  document.getElementById("first-temp");
        firstTempEl.innerHTML = response.list[0].main.temp + "&deg;F";
        if (response.list[0].main.temp < 70){            
            firstDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(231, 100%, 56%) 0%, #2BD2FF 52%, #a8cbff 90%); color: white;");
        } else if (response.list[0].main.temp < 90){
            firstDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(46, 100%, 30%) 0%, #e2c000 52%, #ffd900 90%); color: white;");
        } else {
            firstDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(0, 100%, 50%) 0%, #e66f00 52%, #ff7c01 90%); color: white;");
        };

        var firstHumidEl = document.getElementById("first-humid");
        firstHumidEl.innerText = response.list[0].main.humidity + "%";
        
        /* SECONDDAY */
        var secondDateEl = document.getElementById("second-date");
        var dateTwo = response.list[8].dt_txt;
        secondDateEl.innerText = dateTwo.substr(5,6);

        var iconCodeTwo = response.list[8].weather[0].icon
        secondIconEl.setAttribute("src", ("http://openweathermap.org/img/w/" + iconCodeTwo + ".png"))

        var secondTempEl =  document.getElementById("second-temp");
        secondTempEl.innerHTML = response.list[8].main.temp + "&deg;F";
        if (response.list[8].main.temp < 70){            
            secondDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(231, 100%, 56%) 0%, #2BD2FF 52%, #a8cbff 90%); color: white;");
        } else if (response.list[8].main.temp < 90){
            secondDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(46, 100%, 30%) 0%, #e2c000 52%, #ffd900 90%); color: white;");
        } else {
            secondDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(0, 100%, 50%) 0%, #e66f00 52%, #ff7c01 90%); color: white;");
        };

        var secondHumidEl = document.getElementById("second-humid");
        secondHumidEl.innerText = response.list[8].main.humidity + "%";
        
        /* THIRDDAY */
        var thirdDateEl = document.getElementById("third-date");
        var dateThree = response.list[16].dt_txt;
        thirdDateEl.innerText = dateThree.substr(5,6);

        var iconCodeThree = response.list[16].weather[0].icon
        thirdIconEl.setAttribute("src", ("http://openweathermap.org/img/w/" + iconCodeThree + ".png"))
        
        var thirdTempEl =  document.getElementById("third-temp");
        thirdTempEl.innerHTML = response.list[16].main.temp + "&deg;F";
        if (response.list[16].main.temp < 70){            
            thirdDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(231, 100%, 56%) 0%, #2BD2FF 52%, #a8cbff 90%); color: white;");
        } else if (response.list[16].main.temp < 90){
            thirdDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(46, 100%, 30%) 0%, #e2c000 52%, #ffd900 90%); color: white;");
        } else {
            thirdDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(0, 100%, 50%) 0%, #e66f00 52%, #ff7c01 90%); color: white;");
        };
        
        var thirdHumidEl = document.getElementById("third-humid");
        thirdHumidEl.innerText = response.list[16].main.humidity + "%";
        
        /* FOURTHDAY */
        var fourthDateEl = document.getElementById("fourth-date");
        var dateFour = response.list[24].dt_txt;
        fourthDateEl.innerText = dateFour.substr(5,6);

        var iconCodeFour = response.list[24].weather[0].icon
        fourthIconEl.setAttribute("src", ("http://openweathermap.org/img/w/" + iconCodeFour + ".png"))
        
        var fourthTempEl =  document.getElementById("fourth-temp");
        fourthTempEl.innerHTML = response.list[24].main.temp + "&deg;F";
        if (response.list[24].main.temp < 70){            
            fourthDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(231, 100%, 56%) 0%, #2BD2FF 52%, #a8cbff 90%); color: white;");
        } else if (response.list[24].main.temp < 90){
            fourthDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(46, 100%, 30%) 0%, #e2c000 52%, #ffd900 90%); color: white;");
        } else {
            fourthDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(0, 100%, 50%) 0%, #e66f00 52%, #ff7c01 90%); color: white;");
        };
        
        var fourthHumidEl = document.getElementById("fourth-humid");
        fourthHumidEl.innerText = response.list[24].main.humidity + "%";
        
        /* FIFTHDAY */
        var fifthDateEl = document.getElementById("fifth-date");
        var dateFive = response.list[32].dt_txt;
        fifthDateEl.innerText = dateFive.substr(5,6);

        var iconCodeFive = response.list[32].weather[0].icon
        fifthIconEl.setAttribute("src", ("http://openweathermap.org/img/w/" + iconCodeFive + ".png"))
        
        var fifthTempEl =  document.getElementById("fifth-temp");
        fifthTempEl.innerHTML = response.list[32].main.temp + "&deg;F";
        if (response.list[32].main.temp < 70){            
            fifthDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(231, 100%, 56%) 0%, #2BD2FF 52%, #a8cbff 90%); color: white;");
        } else if (response.list[32].main.temp < 90){
            fifthDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(46, 100%, 30%) 0%, #e2c000 52%, #ffd900 90%); color: white;");
        } else {
            fifthDayEl.setAttribute("style", "background-image: linear-gradient(45deg, hsl(0, 100%, 50%) 0%, #e66f00 52%, #ff7c01 90%); color: white;");
        };
        
        var fifthHumidEl = document.getElementById("fifth-humid");
        fifthHumidEl.innerText = response.list[32].main.humidity + "%";     
    });    
};

loadCity();
submitBtn.addEventListener("click", formSubmit);




            







