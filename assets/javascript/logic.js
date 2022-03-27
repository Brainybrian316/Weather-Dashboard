// make call to weather api
const getWeather = function () {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=1057c30581fce41e7df886393bc1cbde").then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        });
    })
}
getWeather();