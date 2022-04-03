// global variables for html elements
const apiKey = '1057c30581fce41e7df886393bc1cbde'
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');

//  function to get city data and call other functions
geoCodeApi = event => {
    event.preventDefault();

    // fetches geo location
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + inputValue.value + '&limit=1&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {

            // calls oneCall api
            oneCallApi(data);

            // call five day forecast api
            fiveDayForecast(data);

            // calls store history function
            storeHistory(inputValue.value);
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
            currentContainer(data.current, '#current', cityObj.name);

            displayHistory(data.current, '#current');
        })
}

// function to get weather conditions for the current day
currentContainer = (current, elementId, city) => {

    // variables that create the current weather in the html div container 
    const cityName = document.createElement('h1');
    cityName.setAttribute('id', 'cityName');
    const icon = document.createElement('img')
    const cityTemp = document.createElement('p');
    const cityWind = document.createElement('p');
    const cityHumidity = document.createElement('p');
    const uvIndex = document.createElement('span');

    //  variable to get the current date
    const cityDate = luxon.DateTime.local().toFormat('MM/dd/yyyy');
    //  reference icon image based on the weather condition
    icon.src = 'http://openweathermap.org/img/wn/' + current.weather[0].icon + '@2x.png';


    //  converts the created elements  into weather conditions based on the data in the objects api named "current"
    cityName.textContent = city + ' ( ' + cityDate + ' )';
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
    };

    // Replaces the searched city with the new city searched when the user searches for a different city
    weatherContainer.textContent = '';
    weatherContainer.appendChild(cityName).appendChild(icon);
    weatherContainer.appendChild(cityTemp);
    weatherContainer.appendChild(cityWind);
    weatherContainer.appendChild(cityHumidity);
    weatherContainer.appendChild(uvIndex);

};


//  function to get the five day forecast  using oneCall API
fiveDayForecast = data => {
    var cityObj = data[0];
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObj.lat + '&lon=' + cityObj.lon + '&units=imperial&appid=' + apiKey).then(response => response.json())
        .then(data => {

            // calling the five day forecast for the searched city
            fiveDayContainer(data.daily, '#fiveDay');

            displayHistory(data.daily, '#fiveDay');
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
    };
    // Replaces the 1st searched 5day forecast with the new 5day forecast when the user searches for a different city
    fiveDay.textContent = '';
    fiveDay.appendChild(header);
    // loop to replace the old days with the new 
    for (let i = 0; i < dailyIndex; i++) {

        //  recreating variables from first loop to create the new looped elements
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

    };
}

//  creates history object to store the searched cities
const history = JSON.parse(localStorage.getItem('history')) || {
    cities: []
};

// function to store the searched cities in the history object
storeHistory = (city) => {

    //  pushes the searched city into the history object
    history.cities.unshift(city);

    // saves the history object to local storage
    localStorage.setItem('history', JSON.stringify(history));

    displayHistory();

};

// function to display the searched cities in the history object
displayHistory = () => {

    // variable to get the history object from local storage
    const historyList = document.querySelector('#history');
    historyList.textContent = '';

    // variable to 
    let length = history.cities.length

    if (history.cities.length > 3) {
        length = 3;
    } else {
        length = history.cities.length;
    }

    // loop to show the searched cities as buttons
    for (let i = 0; i < length; i++) {

        //  variable for the cities in the array
        const city = history.cities[i];

        //  variable to create the button for the searched cities
        const historyButton = document.createElement('button');
        historyButton.setAttribute('class', 'btn btn-primary');
        historyButton.textContent = city;
        historyList.appendChild(historyButton);

        // event listener to get item from local storage and display the searched city
        historyButton.addEventListener('click', () => {
            fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + historyButton.textContent + '&limit=1&appid=' + apiKey)
                .then(response => response.json())
                .then(data => {

                    //   calling current weather function for previously searched city
                    oneCallApi(data);
                    // calling the five day forecast for previously searched city
                    fiveDayForecast(data);

                });

        })

    };
};

displayHistory();