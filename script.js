const apiKey = '1f0fa30eb3a334e19b4b15f012fc7ba1'; 
const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const resultBox = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = input.value.trim();
  if (city !== '') {
    getWeather(city);
  }
});

function getWeather(city) {
    console.log("City:", city);
console.log("URL:", `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found!');
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;

      cityName.textContent = data.name;
      temperature.textContent = `Temperature: ${temp} °C`;
      description.textContent = `Condition: ${desc}`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      weatherIcon.alt = desc;

      resultBox.classList.remove('hidden');
    })
    .catch(error => {
      alert(error.message);
      resultBox.classList.add('hidden');
    });
}