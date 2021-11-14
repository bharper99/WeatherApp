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
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri,", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
 <div class="weather-forecast-date">${day}</div>
<img
src="http://openweathermap.org/img/wn/04d@2x.png"
alt=""
width="42"/>
<div class="weather-forecast-temperature">
<span class="weather-forecast-temperature-max"> 12° </span>
<span class="weather-forecast-temperature-min"> 8° </span>
 </div>
 </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
displayForecast();
