import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import "../Css/ForecastPage.css";
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

const ForecastPage = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [daily, setDaily] = useState([]);

  const getWeather = async () => {
    try {
      const res = await axios.get("http://localhost:5000/weather", {
        params: { city },
      });
      setData(res.data);
      // console.log(res.data);

      const hourly = res.data?.weather?.hourly;
      if (!hourly?.time || !hourly?.temperature_2m) {
        console.log("Unexpected response shape: missing weather.hourly fields");
      }

      const times = hourly.time;
      const temps = hourly.temperature_2m;

      const dailyTemps = {};

      times.forEach((timestamp, index) => {
        const date = timestamp.split("T")[0];
        const temp = temps[index];

        if (!dailyTemps[date]) {
          dailyTemps[date] = {
            min: temp,
            max: temp,
          };
        } else {
          dailyTemps[date].min = Math.min(dailyTemps[date].min, temp);
          dailyTemps[date].max = Math.max(dailyTemps[date].max, temp);
        }
      });

      const result = Object.entries(dailyTemps).map(([date, { min, max }]) => ({
        date,
        min,
        max,
      }));
      result.sort((a, b) => a.date.localeCompare(b.date));

      setDaily(result);

      // console.log(result);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setDaily([]);
    }
  };
  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    const weekday = d.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const month = d.toLocaleDateString("en-US", { month: "long" });
    const day = d.getDate();
    const year = d.getFullYear();
    return `${weekday} ${day} ${month} ${year}`;
  };
  const niceCity = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  return (
    <div className="forecast-page">
      <div className="forecast-container">
        <h1>Weather App</h1>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
        <button onClick={getWeather}>Search</button>
        {data?.city && daily.length > 0 && (
          <h2 style={{ marginTop: "1.5rem" }}>{niceCity(data.city)}</h2>
        )}

        {daily.length > 0 && (
          <div className="daily-list">
            {daily.map((d) => (
              <div key={d.date} className="day-card">
                <div className="day-date">{formatDate(d.date)}</div>
                <div className="day-temps">
                  <div className="minmax">
                    <span className="min">Min: {Math.round(d.min)}°C</span>
                    <span className="max">Max: {Math.round(d.max)}°C</span>
                  </div>
                  <img
                    src={
                      weatherIconMap[data.weather.current_weather.weathercode]
                    }
                    alt="Weather icon"
                    className="weather-icon-forecast"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastPage;
