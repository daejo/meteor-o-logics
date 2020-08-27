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
