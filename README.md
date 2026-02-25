# KnsCast Weather App ☁️

**KnsCast** is a modern, responsive weather dashboard that provides real-time weather data and 5-day forecasts. It features automatic location detection, a "live" local time clock for any searched city, and a persistent sidebar for saved locations.



## ✨ Features

* **Real-time Weather:** Fetches current temperature, humidity, wind speed, and conditions via OpenWeatherMap API.
* **Geolocation:** Automatically detects the user's current location on startup using the browser's Geolocation API.
* **Live Local Time:** Displays a ticking clock adjusted to the specific timezone offset of the city being viewed.
* **Adaptive UI (Day/Night):** Automatically switches themes based on the target city's sunrise and sunset data.
* **Saved Locations:** Sidebar allows users to pin favorite cities; data persists using `localStorage`.
* **Responsive Design:** Fully functional across mobile, tablet, and desktop views.

## 🛠️ Tech Stack

* **Language:** JavaScript (ES6+ Modules)
* **Styling:** CSS3 (Flexbox, Grid, Custom Variables)
* **Bundler:** Webpack 5
* **Environment:** Dotenv (for API Key security)
* **Deployment:** GitHub Actions & GitHub Pages
