// Function to clean up the API response
function processWeatherData(data) {
    return {
        city: data.name,
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };
}

// Function to fetch the data
export async function getCleanWeather(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error('City not found');
    
    const rawData = await response.json();
    
    // Return the result of our processing function
    return processWeatherData(rawData);
}