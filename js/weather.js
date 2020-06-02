// Getting the Weather part One Geolocation
// Getting the Weather part Two API
const weather = document.querySelector(".js-weather");

const API_KEY = "f11c78a47ae24e65129e5df79d01c0fd";
const COORDS = "coords";

function getWeather(lat, lng){
  // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(json){
  //   console.log(json);
  // });
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
   return response.json();
  })
    .then(function(json){
    // console.log(json);
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${Math.floor(temperature)}° @ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  // console.log(position.coords.latitude);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // latitude: latitude,
    // longitude: longitude
    latitude,
    longitude 
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("Cant access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    // getWeather
    const parsedCoords = JSON.parse(loadedCoords);
    // console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function weatherInit(){
  loadCoords();
}

weatherInit();