const api = {
  key: "9adf566e1d55340611d88f32042eabdb",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric"
}

const city = document.querySelector('.city p')
const date = document.querySelector('.day-today')
const temp = document.querySelector('.temperature h1')
const img_temp = document.querySelector('.icon')
const weather_t = document.querySelector('.weather')
const humidity_today = document.querySelector('.humidity span')
const wind_status_today = document.querySelector('.wind_status span')
const visibility_today = document.querySelector('.visibility span')
const air_pressure_today = document.querySelector('.air_pressure span')

window.addEventListener('load', () => {
  //if ("geolocation" in navigator)
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, showError);
  }
  else {
      alert('navegador não suporta geolozalicação');
  }
  function setPosition(position) {
      console.log(position)
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      coordResults(lat, long);
  }
  function showError(error) {
      alert(`erro: ${error.message}`);
  }
})

function coordResults(lat, long) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${api.units}&lang=${api.lang}&appid=${api.key}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`http error: status ${response.status}`)
          }
          return response.json();
      })
      .catch(error => {
          alert(error.message)
      })
      .then(response => {
          displayResults(response)
      });
}

function displayResults(weather) {
  console.log(weather)

  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  date.innerText = dateBuilder(now);

  let temperature = `${Math.round(weather.main.temp)}`
  temp.innerHTML = temperature;

  let weather_tempo = weather.weather[0].main;
  weather_t.innerText = weather_tempo

  let iconName = weather_tempo;
  img_temp.innerHTML = `<img class="icon-main"  src="image/${iconName}.png">`;

  let humidity_t = weather.main.humidity;
  humidity_today.innerHTML = humidity_t;

  let visibility_t = weather.visibility / 1000;
  visibility_today.innerHTML = visibility_t;

  let air_pressure_t = weather.main.pressure;
  air_pressure_today.innerHTML = air_pressure_t;

  let wind_status_t = weather.wind.speed * 3.9;
  wind_status_today.innerHTML = Math.ceil(wind_status_t);

  //low_high.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  let day = days[d.getDay()]; //getDay: 0-6
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

