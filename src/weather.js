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

export async function getForecast(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url, { mode: 'cors' });
    
    if (!response.ok) throw new Error("Forecast unavailable");
    
    const data = await response.json();
    
    // Filter to get one forecast per day (e.g., at 12:00:00)
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    
    return dailyData.map(day => ({
        date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: Math.round(day.main.temp),
        iconUrl: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
        condition: day.weather[0].main
    }));
}