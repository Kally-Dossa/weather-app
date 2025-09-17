import React, { useState } from "react";
import SearchWeather from "./components/SearchWeather";
import ChartWeather from "./components/ChartWeather";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("search-weather");

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        {activeTab === "search-weather" && <SearchWeather />}
        {activeTab === "chart-weather" && <ChartWeather />}
      </div>
    </div>
  );
}

export default App;
