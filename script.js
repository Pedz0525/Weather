const api = {
  key: "f9a378323a438e6e8dd65f74ba2912ab",
  base: "https://api.openweathermap.org/data/2.5/",
};

const citySelect = document.getElementById("citySelect");
const errorMessage = document.querySelector(".error-message");

citySelect.addEventListener("change", function () {
  const selectedCity = citySelect.value;
  getResults(selectedCity);
});

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((weather) => {
      displayResults(weather);
      errorMessage.style.display = "none";
    })
    .catch((error) => {
      console.error(error);
      errorMessage.style.display = "block";
    });
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  let weatherCondition = weather.weather[0].main.toLowerCase();
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;

  let body = document.body;
  body.classList.remove("clouds", "rain", "sunny", "default-weather");

  if (weatherCondition.includes("clouds")) {
    body.classList.add("clouds");
  } else if (weatherCondition.includes("rain")) {
    body.classList.add("rain");
  } else if (weatherCondition.includes("clear")) {
    body.classList.add("sunny");
  } else {
    body.classList.add("default-weather");
  }
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
