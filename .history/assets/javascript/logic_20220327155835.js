// global variables for html elements
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var icon = document.querySelector('.icon');


button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=1057c30581fce41e7df886393bc1cbde&units=imperial')
        .then(response => response.json())
        .then(data => {
            var nameValue = data['name'];
            var tempValue = data['main']['temp'];
            var descValue = data['weather'][0]['description'];
            var iconValue = data['weather'][0]['icon'];

            name.innerHTML = nameValue;
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;
            icon.innerHTML = iconValue;
        })
        .catch(err => alert("wrong city name"))
})
// fetch('https://api.openweathermap.org/data/2.5/onecall?q=' + inputValue.value + ' &appid=1057c30581fce41e7df886393bc1cbde')
//     .then(response => response.json())
//     .then(data => console.log(data))

//     .catch(err => alert("wrong city name"))





// // function to get weather data
// const getWeather = function () {
//     // makes call to weather api
//     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=` + inputValue.value + `& appid=1057c30581fce41e7df886393bc1cbde`).then(function (response) {
//         // converts response to json
//         response.json().then(function (data) {
//             // sets current weather data to variable
//             const currentWeather = data.current;
//             // sets current weather data to html
//             currentWeatherEl.innerHTML = '<h2>Current Weather</h2>' + '<p>Temperature: ' + currentWeather.temp + '&deg;F</p>' + '<p>Humidity: ' + currentWeather.humidity + '%</p>' + '<p>Wind Speed: ' + currentWeather.wind_speed + 'mph</p>' + '<p>uv index: ' + currentWeather.uvi + '</p>';

//         });
//     })
// }
// getWeather();