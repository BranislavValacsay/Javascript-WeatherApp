const apiKey = 'GET YOUR API KEY ON OPENWEATHER.ORT';
const city = 'Vienna,AT';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const temperatureElement = document.querySelector('.temperature');
const mainConditionElement = document.querySelector('.main-condition');
const descriptionElement = document.querySelector('.description');
const weatherIconElement = document.querySelector('.weather-icon i');
const tempMinElement = document.querySelector('.temp-min');
const tempMaxElement = document.querySelector('.temp-max');
const feelsLikeElement = document.querySelector('.feels-like');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const pressureElement = document.querySelector('.pressure');

async function getWeatherData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const mainCondition = data.weather[0].main;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const tempMin = Math.round(data.main.temp_min);
        const tempMax = Math.round(data.main.temp_max);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed);
        const pressure = data.main.pressure;

        temperatureElement.textContent = `${temperature}°C`;
        mainConditionElement.textContent = mainCondition;
        descriptionElement.textContent = description;
        tempMinElement.textContent = `${tempMin}°C`;
        tempMaxElement.textContent = `${tempMax}°C`;
        feelsLikeElement.textContent = `${feelsLike}°C`;
        humidityElement.textContent = `${humidity}%`;
        windElement.textContent = `${windSpeed} m/s`;
        pressureElement.textContent = `${pressure} hPa`;
        updateWeatherIcon(iconCode);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        temperatureElement.textContent = 'Error';
        descriptionElement.textContent = 'Failed to load weather data';
    }
}

function updateWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud',
        '04n': 'fa-cloud',
        '09d': 'fa-cloud-showers-heavy',
        '09n': 'fa-cloud-showers-heavy',
        '10d': 'fa-cloud-rain',
        '10n': 'fa-cloud-rain',
        '11d': 'fa-bolt',
        '11n': 'fa-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog'
    };

    const iconClass = iconMap[iconCode] || 'fa-cloud';
    weatherIconElement.className = `fas ${iconClass} fa-5x`;
}

getWeatherData();
setInterval(getWeatherData, 600000); // Update every 10 minutes
