function cityName(event) {
  event.preventDefault();
  let formInput = document.querySelector("#city-name-search");
  h1.innerHTML = `${formInput.value}`;
}
let h1 = document.querySelector("#city");
let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);

function formatDate() {
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

function changeCelsius(event) {
  event.preventDefault();
  todayTemp.innerHTML = "15°";
}
function changeFarenheit(event) {
  event.preventDefault();
  todayTemp.innerHTML = "59°";
}
let todayTemp = document.querySelector("#current-temp");

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", changeCelsius);

let farenheitTemp = document.querySelector("#farenheit");
farenheitTemp.addEventListener("click", changeFarenheit);

//API location and temp

function showTemp(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
function searchEvent(event) {
  event.preventDefault();
  let apiKey = "19505ac2dee50f78aaede9546c1684d2";
  let city = document.querySelector("#city-name-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchEvent);
