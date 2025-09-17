import { useState } from "react";
import axios from "axios";
import React from "react";
import TemperatureChart from "./TemperatureChart";
import "../Css/ChartWeather.css";

const ChartWeather = () => {
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
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
      />
      <button onClick={getWeather}>Search</button>

      {data && (
        <div>
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
          <TemperatureChart hourlyData={data.weather.hourly.temperature_2m} />
        </div>
      )}
    </div>
  );
};

export default ChartWeather;
