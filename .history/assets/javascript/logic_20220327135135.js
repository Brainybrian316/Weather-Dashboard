// global variables for html elements
const currentWeatherEl = document.getElementById('current-conditions');


// function to get weather data
const getWeather = function () {
    // makes call to weather api
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=Orlando,00,US&limit=5&appid=1057c30581fce41e7df886393bc1cbde").then(function (response) {
        // converts response to json
        response.json().then(function (data) {
            // sets current weather data to variable
            const currentWeather = data.current;
            // sets current weather data to html
            currentWeatherEl.innerHTML = '<h2>Current Weather</h2>' + '<p>Temperature: ' + currentWeather.temp + '&deg;F</p>' + '<p>Humidity: ' + currentWeather.humidity + '%</p>' + '<p>Wind Speed: ' + currentWeather.wind_speed + 'mph</p>' + '<p>uv index: ' + currentWeather.uvi + '</p>';

        });
    })
}
getWeather();