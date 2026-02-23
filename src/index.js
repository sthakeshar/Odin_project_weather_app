/* eslint-disable no-unused-vars */
import './style.css'
import { getCleanWeather, getForecast } from './weather.js';
import { updateWeatherDisplay, toggleLoading ,updateForecastDisplay } from './display.js';

const apiKey = process.env.WEATHER_API_KEY;

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

async function handleWeatherRequest(city) {
    if (!city) return;
    
    toggleLoading(true);
    try {
        const [currentData, forecastData] = await Promise.all([
            getCleanWeather(city, apiKey),
            getForecast(city, apiKey)
        ]);
        updateWeatherDisplay(currentData);
        updateForecastDisplay(forecastData);
    } catch (error) {
        alert(error.message);
    } finally {
        toggleLoading(false);
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    handleWeatherRequest(cityInput.value.trim());
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleWeatherRequest(cityInput.value.trim());
});

// Initial Load
handleWeatherRequest('tokyo');