//CITY SEARCH - REPLACES H1 WITH SEARCHED CITY
function cityName(event) {
  event.preventDefault();
  let formInput = document.querySelector("#city-name-search");
  h1.innerHTML = `${formInput.value}`;
}
let h1 = document.querySelector("#city");
let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);

// DATE AND TIME FUNCTION
function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day}, ${hour}:${minute}`;
}

let dayAndTime = document.querySelector("#date");
dayAndTime.innerHTML = formatDate();

//DAILY FORECAST
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
 <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
<img
src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
alt=""
width="42"/>
<div class="weather-forecast-temperature">
<span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° 
        </span>
<span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
 </div>
 </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//CHANGES UNIT OF CURRENT TEMP
function changeCelsius(event) {
  event.preventDefault();
  todayTemp.innerHTML = "15°";
}
function changeFarenheit(event) {
  event.preventDefault();
  todayTemp.innerHTML = "59°";
}
let todayTemp = document.querySelector("#current-temp");

//API LOCATION AND TEMP
function displayTemperature(response) {
  getForecast(response.data.coord);
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#today-weather");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
}
function search(city) {
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function searchSubmit(event) {
  event.preventDefault;
  let cityElementSearch = document.querySelector("#city-name-search");
  search(cityElementSearch.value);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchSubmit);

search("London");
