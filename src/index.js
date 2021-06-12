// Search engine

function getForecast(coordinates) {
  let apiKey = "2d28dad272ae6560bc7be5816c6e997c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

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
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
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

//Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
        <h5 class="days-forecast">${formatDay(forecastDay.dt)}</h5>
        <br />
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }.png"
          alt="cloudy"
          class="icons-next-days"
        />
        <br />
        <p class="max-min">
          <span id="min">${Math.round(forecastDay.temp.min)}°</span> - 
          <span id="max"><strong>${Math.round(
            forecastDay.temp.max
          )}°</strong></span>
        </p>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Celsius to Fahrenheit

function displayFarhrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#link-fahrenheit");
fahrenheitLink.addEventListener("click", displayFarhrenheitTemperature);

let celsiusLink = document.querySelector("#link-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Hamburg");
