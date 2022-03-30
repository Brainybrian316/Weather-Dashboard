// global variables for html elements
const apiKey = '1057c30581fce41e7df886393bc1cbde'
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');


geoCodeApi = event => {
    event.preventDefault();
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + inputValue.value + '&limit=1&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
            oneCallApi(data);
            // call five day forecast api
            fiveDayForecast(data);
        })
};

button.addEventListener('click', geoCodeApi);

oneCallApi = data => {
    var cityObj = data[0];
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
            currentContainer(data.current, '#current');
        })
}

currentContainer = (current, elementId) => {
    const cityName = document.createElement('h1');
    const cityTemp = document.createElement('p');
    const cityWind = document.createElement('p');
    const cityHumidity = document.createElement('p');
    const uvIndex = document.createElement('p');

    cityName.textContent = inputValue.value;
    cityTemp.textContent = 'Temp: ' + current.temp;
    cityWind.textContent = 'Wind: ' + current.wind_speed;
    cityHumidity.textContent = 'Humidity: ' + current.humidity;
    uvIndex.textContent = 'UV Index: ' + current.uvi;

    const weatherContainer = document.querySelector(elementId);
    weatherContainer.appendChild(cityName);
    weatherContainer.appendChild(cityTemp);
    weatherContainer.appendChild(cityWind);
    weatherContainer.appendChild(cityHumidity);
    weatherContainer.appendChild(uvIndex);
};

//  five day forecast oneCall API
fiveDayForecast = data => {
    var cityObj = data[0];
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey).then(response => response.json())
        .then(data => {
            fiveDayContainer(data.daily, '#fiveDay');

        })
}

// five day forecast container
fiveDayContainer = (daily, elementId) => {
    const fiveDay = document.querySelector(elementId);
    const dailyIndex = daily.length - 3;
    for (let i = 0; i < dailyIndex; i++) {

        const date = document.createElement('h3');
        const dayTemp = document.createElement('p');
        const dayWind = document.createElement('p');
        const dayHumidity = document.createElement('p');
        const dateFuture = luxon.DateTime.local().plus({
            days: i + 1
        });
        date.textContent = dateFuture
        // date.textContent = luxon.DateTime.fromSeconds(daily[i].dt).toFormat('MM-dd-yyyy');
        dayTemp.textContent = 'Temp: ' + daily[i].temp.day;
        dayWind.textContent = 'Wind: ' + daily[i].wind_speed;
        dayHumidity.textContent = 'Humidity: ' + daily[i].humidity;

        fiveDay.appendChild(date);
        fiveDay.appendChild(dayTemp);
        fiveDay.appendChild(dayWind);
        fiveDay.appendChild(dayHumidity);
    }
}