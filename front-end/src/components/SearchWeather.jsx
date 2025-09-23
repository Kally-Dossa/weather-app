import { useState } from "react";
import axios from "axios";
import "../Css/SearchWeather.css";
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

const SearchWeather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const getWeather = async () => {
    try {
      const res = await axios.get("http://localhost:5000/weather", {
        params: { city },
      });
      setData(res.data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
        <button onClick={getWeather}>Search</button>
        {data && data.weather?.current_weather && (
          <div className="current-weather">
            <h2>{data.city.charAt(0).toUpperCase() + data.city.slice(1)}</h2>
            <h3>
              {(() => {
                const d = new Date(data.weather.hourly.time[0]);
                const weekday = d.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                const month = d.toLocaleDateString("en-US", { month: "long" });
                const day = d.getDate();
                const year = d.getFullYear();
                return `${weekday} ${month} ${day} ${year}`;
              })()}
            </h3>
            <div className="current-weather-row">
              <span className="temperature">
                {data.weather.current_weather.temperature}°C
              </span>
              <img
                src={weatherIconMap[data.weather.current_weather.weathercode]}
                alt="Weather icon"
                className="weather-icon"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWeather;
