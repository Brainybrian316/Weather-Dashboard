// global variables for html elements
const currentWeatherEl = document.getElementById('current-conditions');


// function to search for city
const searchCity = function () {
    // gets city input
    const city = document.getElementById('city-input').value;
    // makes call to weather api
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1057c30581fce41e7df886393bc1cbde").then(function (response) {
        return response.json();
    });
}



// function to get weather data
const getWeather = function () {
    // makes call to weather api
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=1057c30581fce41e7df886393bc1cbde").then(function (response) {
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