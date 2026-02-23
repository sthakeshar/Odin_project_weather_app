/* eslint-disable no-unused-vars */
import './style.css'
import { getCleanWeather } from './weather.js';
import { updateWeatherDisplay, toggleLoading } from './display.js';

const apiKey = '2db2d6871071df2785191d5a1e15339c';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

async function handleWeatherRequest(city) {
    if (!city) return;
    
    toggleLoading(true);
    try {
        const cleanData = await getCleanWeather(city, apiKey);
        updateWeatherDisplay(cleanData);
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