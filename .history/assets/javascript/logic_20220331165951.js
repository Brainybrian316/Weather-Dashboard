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
            // calls save city function
            saveCity();
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
    const icon = document.createElement('img');
    const cityTemp = document.createElement('p');
    const cityWind = document.createElement('p');
    const cityHumidity = document.createElement('p');
    const uvIndex = document.createElement('span');

    //  variable to get the current date
    const cityDate = luxon.DateTime.local().toFormat('MM/dd/yyyy');

    //  reference icon image based on the weather condition
    icon.src = 'http://openweathermap.org/img/wn/' + current.weather[0].icon + '@2x.png';

    //  converts the created elements  into weather conditions based on the data in the objects api named "current"
    cityName.textContent = inputValue.value + ' ( ' + cityDate + ' )';
    cityTemp.textContent = 'Temp: ' + current.temp;
    cityWind.textContent = 'Wind: ' + current.wind_speed;
    cityHumidity.textContent = 'Humidity: ' + current.humidity;
    uvIndex.textContent = 'UV Index: ' + current.uvi;

    //  anonymous variable to hold the current weather conditions
    const weatherContainer = document.querySelector(elementId);

    //  appends the elements to the html div container
    weatherContainer.appendChild(cityName).appendChild(icon);
    weatherContainer.appendChild(cityTemp);
    weatherContainer.appendChild(cityWind);
    weatherContainer.appendChild(cityHumidity);
    weatherContainer.appendChild(uvIndex);

    //  uv index if statement to change the color of the uv index based on the value
    switch (current.uvi) {
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
            uvIndex.setAttribute('style', 'color: white; background-color: green;');
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
        const icon = document.createElement('img');
        const dayTemp = document.createElement('p');
        const dayWind = document.createElement('p');
        const dayHumidity = document.createElement('p');

        //  variable to display the future dates plus one. 
        const dateFuture = luxon.DateTime.local().plus({
            days: i + 1
        }).toFormat('MM/dd/yyyy');

        //  reference icon image based on the weather condition
        icon.src = 'http://openweathermap.org/img/wn/' + daily[i].weather[0].icon + '@2x.png';
        icon.style.width = '75px';

        //  converts the created elements into weather conditions based on the data in the objects api named "daily"
        date.textContent = dateFuture
        dayTemp.textContent = 'Temp: ' + daily[i].temp.day;
        dayWind.textContent = 'Wind: ' + daily[i].wind_speed;
        dayHumidity.textContent = 'Humidity: ' + daily[i].humidity;

        //  appends the elements to the html div container
        fiveDay.appendChild(date)
        fiveDay.appendChild(icon);
        fiveDay.appendChild(dayTemp);
        fiveDay.appendChild(dayWind);
        fiveDay.appendChild(dayHumidity);
    }
};

//  function to save the searched city to local storage
saveCity = () => {

    //  variable to set the searched city to local storage
    const city = localStorage.setItem('city', inputValue.value);

    //  to create the elements to append to the search history container
    const cityHistory = document.querySelector('.container');
    const cityButton = document.createElement('button');

    //  set the button text content to the searched city
    cityButton.textContent = inputValue.value;
    //  set attribute to button
    cityButton.setAttribute('class', 'btn btn-primary');

    // append history to container
    cityHistory.appendChild(cityButton);

    //  event listener to remove the current searched city and replace it with the saved city
    cityButton.addEventListener('click', () => {
        inputValue.value = cityButton.textContent
        getWeather();

    })
};

//  get Weather function to get the weather conditions for the searched city
getWeather = () => {

    //  variable to get the searched city from local storage
    const city = localStorage.getItem('city');

    //  fetch the weather conditions for the searched city
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey).then(response => response.json())
        .then(data => {

            //  call the current weather conditions function
            currentWeather(data, '#current');

            //  call the five day forecast function
            fiveDayForecast(data, '#fiveDay');

            //  call the save city function
            saveCity();

            // call the uv index function
            uvIndex(data, '#uvIndex');


        })
};