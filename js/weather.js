const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "77366365637ced520d4188028d414297";
// const CITY_ID = "1835847";

function getWeater(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
        .then(function (res) {
            return res.json();
        }) // then을 써야 데이터 받아올때까지 기다리고 실행됨
        .then(function (json) {
            const temp = json.main.temp;
            const place = json.name;
            weather.innerText = `${temp} ℃, ${place}`;
        }); // then을 써야 데이터 받아올때까지 기다리고 실행됨
}

function getWeatherCity(ID) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${ID}&appid=${API_KEY}&units=metric`
    )
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            const temp = json.main.temp;
            const place = json.name;
            weather.innerText = `${temp} ℃, ${place}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeater(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geolocation");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeater(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
    // getWeatherCity(CITY_ID);
}
init();
