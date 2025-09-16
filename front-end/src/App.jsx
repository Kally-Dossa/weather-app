import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    alert(`Input Value: ${inputValue}`);
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group flex-column">
              <h2>Find weather!</h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ maxWidth: "100%", width: "100%" }}
              />
              <button
                className="btn btn-primary"
                onClick={handleButtonClick}
                style={{ width: "100%" }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
