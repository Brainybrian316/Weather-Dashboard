// global variables for html elements
const apiKey = '1057c30581fce41e7df886393bc1cbde'
var button = document.querySelector('.btn');
var inputValue = document.querySelector('.inputValue');
var title = document.querySelector('.name');
var icon = document.querySelector('.icon');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var uv = document.querySelector('.uv');
var desc = document.querySelector('.desc');



button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=1057c30581fce41e7df886393bc1cbde&units=imperial')
        .then(response => response.json())
        .then(data => {
            var nameValue = data['name'];
            var iconUrl = 'http://openweathermap.org/img/wn/' + iconUrl + '10d@2x.png';
            var tempValue = data['main']['temp'];
            var humidityValue = data['main']['humidity'];
            var windValue = data['wind']['speed'];
            var uvValue = data['uv'];
            var descValue = data['weather'][0]['description'];

            title.innerHTML = nameValue;
            icon.innerHTML = iconUrl;
            temp.innerHTML = tempValue;
            humidity.innerHTML = humidityValue;
            wind.innerHTML = windValue;
            uv.innerHTML = uvValue;
            desc.innerHTML = descValue;
        })
        .catch(error => alert("wrong city name"));
});