let clockInterval;
export function updateWeatherDisplay(cleanData) {
    const cityName = document.getElementById('cityName');
    const tempValue = document.getElementById('tempValue');
    const weatherDesc = document.getElementById('weatherDesc');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const weatherIcon = document.getElementById('weatherIcon');
    const localTimeDisplay = document.getElementById('localTime');

    // Implement the data into the DOM
    cityName.innerText = cleanData.city; 
    tempValue.innerText = `${cleanData.temp}°C`;
    weatherDesc.innerText = cleanData.description;
    humidity.innerText = `${cleanData.humidity}%`;
    windSpeed.innerText = `${cleanData.windSpeed} km/h`;
    
    weatherIcon.src = cleanData.iconUrl;
    weatherIcon.style.display = "block";

    // 1. Clear any existing clock from a previous search
    clearInterval(clockInterval);
    // 2. Function to calculate and show the CURRENT time in that timezone
    const tick = () => {
        const now = new Date();
        // Calculate city time: Current UTC + city offset
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const cityTime = new Date(utc + (cleanData.timezone * 1000));
        
        const hours = cityTime.getHours().toString().padStart(2, '0');
        const minutes = cityTime.getMinutes().toString().padStart(2, '0');
        
        localTimeDisplay.innerText = `Local Time: ${hours}:${minutes}`;
    };

    // 3. Start the clock immediately and update every 30 seconds
    tick(); 
    clockInterval = setInterval(tick, 30000);
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

export function renderSavedLocations(savedCities, onCityClick, onDeleteClick) {
    const savedLocationsList = document.getElementById('savedLocationsList');
    savedLocationsList.innerHTML = '';
    
    savedCities.forEach((city, index) => {
        const li = document.createElement('li');
        li.classList.add('saved-location-item');

        const citySpan = document.createElement('span');
        citySpan.textContent = city;
        citySpan.style.flex = "1";

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-city-btn');

        // Delete Logic
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onDeleteClick(index); // This calls the function back in index.js
        });

        // Search Logic
        li.addEventListener('click', () => onCityClick(city));

        li.appendChild(citySpan);
        li.appendChild(deleteBtn);
        savedLocationsList.appendChild(li);
    });
}