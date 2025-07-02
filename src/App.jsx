import React, { useState, useEffect } from 'react';
import "./App.css";

const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = "4e4cf52c9ea042ecad3184004250107";

    // Function to fetch weather data
    const fetchWeatherData = async () => {
        setLoading(true);
        setWeatherData(null);
        setError('');

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);

            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearchClick = () => {
        if (city.trim()) { 
            fetchWeatherData();
            // setCity('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className="app-container">
            <div className="search-section">
                <input
                    type="text"
                    className="city-input"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <button className="search-button" onClick={handleSearchClick}>
                    Search
                </button>
            </div>

            {loading && <p className="loading-message">Loading data...</p>}

            {weatherData && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <h3>Temperature</h3>
                        <p>{weatherData.current.temp_c}°C</p>
                    </div>
                    <div className="weather-card">
                        <h3>Humidity</h3>
                        <p>{weatherData.current.humidity}%</p>
                    </div>
                    <div className="weather-card">
                        <h3>Condition</h3>
                        <p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="weather-card">
                        <h3>Wind Speed</h3>
                        <p>{weatherData.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;