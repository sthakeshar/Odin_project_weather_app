/* eslint-disable no-unused-vars */
import './style.css'

const apiKey = '2db2d6871071df2785191d5a1e15339c';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Elements to update
const cityName = document.getElementById('cityName');
const tempValue = document.getElementById('tempValue');
const weatherDesc = document.getElementById('weatherDesc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherIcon = document.getElementById('weatherIcon');
const dateText = document.getElementById('dateText');

// Set current date
dateText.innerText = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
});

async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();

        // Update UI with Data
        cityName.innerText = data.name;
        tempValue.innerText = Math.round(data.main.temp) + "°C";
        weatherDesc.innerText = data.weather[0].description;
        humidity.innerText = data.main.humidity + "%";
        windSpeed.innerText = data.wind.speed + " km/h";
        
        // Update Icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.style.display = "block";

    } catch (error) {
        alert(error.message);
    }
}

searchBtn.addEventListener('click', () => {
    if (cityInput.value) checkWeather(cityInput.value);
});

// Allow "Enter" key to trigger search
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkWeather(cityInput.value);
});