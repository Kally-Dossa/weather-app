import React, { useState } from "react";
import MainPage from "./components/MainPage";
import SearchWeather from "./components/SearchWeather";
import ChartWeather from "./components/ChartWeather";
import Sidebar from "./components/Sidebar";
import ForecastPage from "./components/ForecastPage";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("main-page");

  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
        src="/sky.mp4"
        type="video/mp4"
      />
      <div className="app-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="main-content">
          {activeTab === "main-page" && <MainPage />}
          {activeTab === "search-weather" && <SearchWeather />}
          {activeTab === "chart-weather" && <ChartWeather />}
          {activeTab === "forecast-page" && <ForecastPage />}
        </div>
      </div>
    </>
  );
}

export default App;
