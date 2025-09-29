import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import React from "react";
import "../Css/MainPage.css";
import clear from "../images/clear.png";
import clouds from "../images/clouds.png";
import drizzle from "../images/drizzle.png";
import mist from "../images/mist.png";
import rain from "../images/rain.png";
import snow from "../images/snow.png";
import wind from "../images/wind.png";

const weatherIconMap = {
  0: clear,
  1: clouds,
  2: clouds,
  3: clouds,
  45: mist,
  48: mist,
  51: drizzle,
  53: drizzle,
  55: drizzle,
  61: rain,
  63: rain,
  65: rain,
  71: snow,
  73: snow,
  75: snow,
  80: rain,
  81: rain,
  82: rain,
  95: wind,
  96: wind,
  99: wind,
};

const cities = [
  "Athens",
  "Thessaloniki",
  "Paris",
  "Brussels",
  "Madrid",
  "Amsterdam",
];

const MainPage = () => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherResults = {};
        for (let city of cities) {
          const res = await axios.get("http://localhost:5000/weather", {
            params: { city },
          });
          weatherResults[city] = res.data.weather?.current_weather || {};
        }
        setWeatherData(weatherResults);
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="main-page">
      <div className="main-container">
        <div className="cities">
          {cities.map((city) => (
            <div key={city} className="city-card">
              <h2>{city}</h2>
              {weatherData[city] ? (
                <div className="current-weather">
                  <h3>{weatherData[city].temperature}°C</h3>
                  <img
                    src={weatherIconMap[weatherData[city].weathercode]}
                    alt="Weather icon"
                    className="weather-icon"
                  />
                </div>
              ) : (
                <ClipLoader color="#01579b" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
