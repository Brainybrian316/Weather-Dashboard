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
    const cityTemp = document.createElement('h5');
    const cityWind = document.createElement('h5');
    const cityHumidity = document.createElement('h5');
    const uvIndex = document.createElement('h5');

    cityName.textContent = inputValue.value;
    cityTemp.textContent = current.temp;
    cityWind.textContent = current.wind_speed;
    cityHumidity.textContent = current.humidity;
    uvIndex.textContent = current.uvi;

    const weatherContainer = document.querySelector(elementId);
    weatherContainer.appendChild(cityName);
    weatherContainer.appendChild(cityTemp);
    weatherContainer.appendChild(cityWind);
    weatherContainer.appendChild(cityHumidity);
    weatherContainer.appendChild(uvIndex);


}