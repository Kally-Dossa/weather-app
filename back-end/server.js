import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    // 1. City -> lat/long
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    const { latitude, longitude } = geoData.results[0];

    // 2. Forecast
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&daily=weather_code&hourly=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    res.json({ city, latitude, longitude, weather: weatherData });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
