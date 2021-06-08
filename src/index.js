// Search engine

function displayWeatherCondition(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
}

function searchCity(city) {
  let apiKey = "2d28dad272ae6560bc7be5816c6e997c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "2d28dad272ae6560bc7be5816c6e997c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showWeatherCurrentPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Hamburg");

// Day + time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#day");
currentDay.innerHTML = `${day}`;

let hours = now.getHours();
if (hours < 10) {
  let currentHour = document.querySelector("#hour");
  currentHour.innerHTML = `0${hours}`;
} else {
  let currentHour = document.querySelector("#hour");
  currentHour.innerHTML = `${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  let currentMinutes = document.querySelector("#minutes");
  currentMinutes.innerHTML = `0${minutes}`;
} else {
  let currentMinutes = document.querySelector("#minutes");
  currentMinutes.innerHTML = `${minutes}`;
}
