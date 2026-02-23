export function updateWeatherDisplay(cleanData) {
    const cityName = document.getElementById('cityName');
    const tempValue = document.getElementById('tempValue');
    const weatherDesc = document.getElementById('weatherDesc');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const weatherIcon = document.getElementById('weatherIcon');

    // Implement the data into the DOM
    cityName.innerText = cleanData.city; 
    tempValue.innerText = `${cleanData.temp}°C`;
    weatherDesc.innerText = cleanData.description;
    humidity.innerText = `${cleanData.humidity}%`;
    windSpeed.innerText = `${cleanData.windSpeed} km/h`;
    
    weatherIcon.src = cleanData.iconUrl;
    weatherIcon.style.display = "block";
}

export function toggleLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? "block" : "none";
}

export function updateForecastDisplay(forecastArray) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = ""; // Clear old data

    forecastArray.forEach(day => {
        const card = document.createElement('div');
        card.className = 'forecast-item';
        card.innerHTML = `
            <p class="day-name">${day.date}</p>
            <img src="${day.iconUrl}" alt="${day.condition}">
            <p class="day-temp">${day.temp}°C</p>
        `;
        forecastContainer.appendChild(card);
    });
}