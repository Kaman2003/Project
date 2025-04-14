import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faSync,
  faSearchLocation,
} from "@fortawesome/free-solid-svg-icons";

const OpenAQDataSection = () => {
  const [openaqData, setOpenaqData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("New York"); // Default city
  const [userInput, setUserInput] = useState("");

  // Fetch OpenAQ Air and Water Quality Data
  const fetchOpenaqData = async (location) => { 
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/openaq/latest?lat=40.7128&lon=-74.0060&limit=10`);
      if (!response.ok) {
        throw new Error("Failed to fetch OpenAQ data");
      }
      const data = await response.json();
      setOpenaqData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenaqData(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setCity(userInput.trim());
    }
  };

  return (
    <section className="openaq-data-section">
      <div className="openaq-header">
        <h2>
          <FontAwesomeIcon icon={faCloud} /> Air and Water Quality Data (OpenAQ)
        </h2>
        <form className="openaq-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter City (e.g., New York)"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearchLocation} />
          </button>
        </form>
      </div>
      {loading ? (
        <div className="openaq-loading">
          <FontAwesomeIcon icon={faSync} spin /> Loading OpenAQ data...
        </div>
      ) : error ? (
        <div className="openaq-error">Error: {error}</div>
      ) : (
        <div className="openaq-metrics">
          {openaqData?.results?.map((result, index) => (
            <div key={index} className="openaq-metric">
              <h3>{result.location}</h3>
              <p>
                <span>City:</span> {result.city}
              </p>
              <p>
                <span>Country:</span> {result.country}
              </p>
              <p>
                <span>Last Updated:</span>{" "}
                {new Date(result.lastUpdated).toLocaleString()}
              </p>
              <ul>
                {result.measurements.map((measurement, idx) => (
                  <li key={idx}>
                    <span>{measurement.parameter}:</span> {measurement.value}{" "}
                    {measurement.unit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OpenAQDataSection;
