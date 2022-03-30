// global variables for html elements
const apiKey = '1057c30581fce41e7df886393bc1cbde'
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');

//  function to get city data and call other functions
geoCodeApi = event => {
    event.preventDefault();

    // fetches geo location
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + inputValue.value + '&limit=1&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {

            // calls oneCall api
            oneCallApi(data);

            // call five day forecast api
            fiveDayForecast(data);
        })
};

//  button event listener for city search
button.addEventListener('click', geoCodeApi);

//  function to get the city via longitude and latitude
oneCallApi = data => {

    //   access's  the object in the api array 
    let cityObj = data[0];
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {

            //  calls current current weather for the searched city. 
            currentContainer(data.current, '#current');
        })
}

// function to get weather conditions for the current day
currentContainer = (current, elementId) => {

    // variables that create the current weather in the html div container 
    const cityName = document.createElement('h1');
    const cityTemp = document.createElement('p');
    const cityWind = document.createElement('p');
    const cityHumidity = document.createElement('p');
    const uvIndex = document.createElement('span');

    //  variable to get the current date
    const cityDate = luxon.DateTime.local().toFormat('MM/dd/yyyy');

    //  converts the created elements  into weather conditions based on the data in the objects api named "current"
    cityName.textContent = inputValue.value + ' ( ' + cityDate + ' )';
    cityTemp.textContent = 'Temp: ' + current.temp;
    cityWind.textContent = 'Wind: ' + current.wind_speed;
    cityHumidity.textContent = 'Humidity: ' + current.humidity;
    uvIndex.textContent = 'UV Index: ' + current.uvi;

    //  appends the elements to the html div container
    const weatherContainer = document.querySelector(elementId);
    weatherContainer.appendChild(cityName);
    weatherContainer.appendChild(cityTemp);
    weatherContainer.appendChild(cityWind);
    weatherContainer.appendChild(cityHumidity);
    weatherContainer.appendChild(uvIndex);

    //  uv index if statement to change the color of the uv index based on the value
    switch (current.uvi) {
        case current.uvi < 3:
            uvIndex.setAttribute('style', 'color: white; background-color: green;');
            break;
        case current.uvi < 6:
            uvIndex.setAttribute('style', 'color: white; background-color: yellow;');
            break;
        case current.uvi < 8:
            uvIndex.setAttribute('style', 'color: white; background-color: orange;');
            break;
        case current.uvi < 11:
            uvIndex.setAttribute('style', 'color: white; background-color: red;');
            break;
        case current.uvi > 11:
            uvIndex.setAttribute('style', 'color: white; background-color: purple;');
        default:
            break;
    }
};


//  function to get the five day forecast  using oneCall API
fiveDayForecast = data => {
    var cityObj = data[0];
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey).then(response => response.json())
        .then(data => {

            // calling the five day forecast for the searched city
            fiveDayContainer(data.daily, '#fiveDay');
        })
}

// function to get the five day forecast for the searched city
fiveDayContainer = (daily, elementId) => {

    //  variables to create the five day forecast in the html div container
    const fiveDay = document.querySelector(elementId);
    const header = document.createElement('h1');
    header.setAttribute('style', 'padding-bottom: 10px, padding-top: 10px');
    header.textContent = '5 Day Forecast: ';
    fiveDay.appendChild(header);

    //  variable for the loop to convert the 8 day forecast into a 5 day forecast
    const dailyIndex = daily.length - 3;

    //  loop to create the five day forecast
    for (let i = 0; i < dailyIndex; i++) {

        //  variables to create the elements for the five day forecast weather conditions
        const date = document.createElement('h5');
        const dayTemp = document.createElement('p');
        const dayWind = document.createElement('p');
        const dayHumidity = document.createElement('p');

        //  variable to display the future dates plus one. 
        const dateFuture = luxon.DateTime.local().plus({
            days: i + 1
        }).toFormat('MM/dd/yyyy');

        //  converts the created elements into weather conditions based on the data in the objects api named "daily"
        date.textContent = dateFuture
        dayTemp.textContent = 'Temp: ' + daily[i].temp.day;
        dayWind.textContent = 'Wind: ' + daily[i].wind_speed;
        dayHumidity.textContent = 'Humidity: ' + daily[i].humidity;

        //  appends the elements to the html div container
        fiveDay.appendChild(date);
        fiveDay.appendChild(dayTemp);
        fiveDay.appendChild(dayWind);
        fiveDay.appendChild(dayHumidity);
    }
}