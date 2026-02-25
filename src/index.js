/* eslint-disable no-unused-vars */
import './style.css'
import { getCleanWeather, getForecast,getWeatherByCoords, getForecastByCoords } from './weather.js';
import { updateWeatherDisplay, toggleLoading ,updateForecastDisplay,renderSavedLocations } from './display.js';

let savedCities = JSON.parse(localStorage.getItem('savedCities')) || ['Tokyo', 'London', 'New York'];
const apiKey = process.env.WEATHER_API_KEY;

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const addLocationBtn = document.getElementById('addLocationBtn');

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

async function initWeather() {
    if ("geolocation" in navigator) {
        toggleLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const [currentData, forecastData] = await Promise.all([
                        getWeatherByCoords(latitude, longitude, apiKey),
                        getForecastByCoords(latitude, longitude, apiKey)
                    ]);
                    updateWeatherDisplay(currentData);
                    updateForecastDisplay(forecastData);
                } catch (error) {
                    console.error("Coordinate fetch failed", error);
                    handleWeatherRequest('Tokyo'); // Fallback
                } finally {
                    toggleLoading(false);
                }
            },
            (error) => {
                console.warn("User denied location access");
                handleWeatherRequest('Tokyo'); // Fallback
                toggleLoading(false);
            }
        );
    } else {
        handleWeatherRequest('Tokyo'); // Fallback for old browsers
    }
}
// A central function to handle updating the sidebar
function updateSidebar() {
    renderSavedLocations(
        savedCities, 
        (city) => handleWeatherRequest(city), // The click handler
        (index) => removeCity(index)           // The delete handler
    );
}

function removeCity(index) {
    savedCities.splice(index, 1);
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
    updateSidebar();
}
addLocationBtn.addEventListener('click', () => {
    const currentCity = document.getElementById('cityName').textContent;
    
    if (currentCity && !savedCities.includes(currentCity)) {
        savedCities.push(currentCity);
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
        updateSidebar();
    }
});

initWeather();
updateSidebar();