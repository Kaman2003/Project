import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWater,
  faRulerVertical,
  faWind,
  faChartLine,
  faCircleInfo,
  faDroplet,
  faArrowsUpDown,
  faSmog,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { ref, onValue } from "firebase/database";
import "../../css/sensorreading.css";
import { app, database } from "../../firebase/config";

function SensorReadings() {
  const [sensorData, setSensorData] = useState({
    airQuality: null,
    distance: null,
    touchSlider: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    try {
      const airQualityRef = ref(database, 'CENG355/sensors/air_quality_sensor');
      const distanceRef = ref(database, 'CENG355/sensors/distance_sensor');
      const touchSliderRef = ref(database, 'CENG355/sensors/touch_slider');

      const airQualityUnsub = onValue(airQualityRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData(prev => ({
            ...prev,
            airQuality: lastEntry[1],
            loading: false
          }));
        }
      }, (error) => {
        setSensorData(prev => ({ ...prev, error: "Air quality data error", loading: false }));
      });

      const distanceUnsub = onValue(distanceRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData(prev => ({
            ...prev,
            distance: lastEntry[1],
            loading: false
          }));
        }
      }, (error) => {
        setSensorData(prev => ({ ...prev, error: "Distance data error", loading: false }));
      });

      const touchSliderUnsub = onValue(touchSliderRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData(prev => ({
            ...prev,
            touchSlider: lastEntry[1],
            loading: false
          }));
        }
      }, (error) => {
        setSensorData(prev => ({ ...prev, error: "Touch slider data error", loading: false }));
      });

      return () => {
        airQualityUnsub();
        distanceUnsub();
        touchSliderUnsub();
      };

    } catch (error) {
      setSensorData(prev => ({ ...prev, error: "Connection error", loading: false }));
    }
  }, []);

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Unknown";
    const now = new Date();
    const sensorTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - sensorTime) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    return sensorTime.toLocaleTimeString();
  };

  const getTouchStatus = (touchData) => {
    if (!touchData) return "No data";
    return touchData.is_touched ? "Touched" : "Not touched";
  };

  const getAirQualityLevel = (aqi) => {
    if (!aqi) return { level: "Unknown", color: "#888" };
    if (aqi <= 1) return { level: "Excellent", color: "#4CAF50" };
    if (aqi <= 3) return { level: "Good", color: "#8BC34A" };
    return { level: "Poor", color: "#F44336" };
  };

  if (sensorData.loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading sensor data...</p>
      </div>
    );
  }

  if (sensorData.error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <h2>Connection Error</h2>
        <p>{sensorData.error}</p>
        <button className="retry-button">Retry Connection</button>
      </div>
    );
  }

  const airQuality = getAirQualityLevel(sensorData.airQuality?.aqi);

  return (
    <div className="sensor-dashboard">
      <header className="dashboard-header">
        <h1>
          <FontAwesomeIcon icon={faChartLine} className="header-icon" />
          Sensor Dashboard
        </h1>
        <div className="last-updated">
          Last updated: {formatTimeAgo(
            Math.max(
              sensorData.airQuality?.timestamp || 0,
              sensorData.distance?.timestamp || 0,
              sensorData.touchSlider?.timestamp || 0
            )
          )}
        </div>
      </header>

      <div className="sensor-grid">
        {/* Touch Sensor Panel */}
        <div className={`sensor-panel touch-panel ${sensorData.touchSlider?.is_touched ? 'active' : ''}`}>
          <div className="panel-header">
            <div className="icon-container">
              <FontAwesomeIcon icon={faDroplet} />
            </div>
            <h2>Touch Sensor</h2>
          </div>
          <div className="panel-body">
            <div className="main-value">
              {getTouchStatus(sensorData.touchSlider)}
            </div>
            <div className={`status-indicator ${sensorData.touchSlider?.is_touched ? 'active' : ''}`}>
              {sensorData.touchSlider?.is_touched ? 'ACTIVE' : 'INACTIVE'}
            </div>
            <div className="update-time">
              <FontAwesomeIcon icon={faClock} />
              {formatTimeAgo(sensorData.touchSlider?.timestamp)}
            </div>
          </div>
        </div>

        {/* Distance Sensor Panel */}
        <div className="sensor-panel distance-panel">
          <div className="panel-header">
            <div className="icon-container">
              <FontAwesomeIcon icon={faArrowsUpDown} />
            </div>
            <h2>Distance Measurement</h2>
          </div>
          <div className="panel-body">
            <div className="main-value">
              {sensorData.distance?.distance_cm !== undefined
                ? `${sensorData.distance.distance_cm} cm`
                : "--"}
            </div>
            <div className="distance-visualization">
              <div
                className="distance-bar"
                style={{
                  height: `${Math.min(100, (sensorData.distance?.distance_cm || 0) / 2)}%`,
                  backgroundColor: sensorData.distance?.distance_cm < 50 ? '#FF5722' : '#4CAF50'
                }}
              ></div>
            </div>
            <div className="update-time">
              <FontAwesomeIcon icon={faClock} />
              {formatTimeAgo(sensorData.distance?.timestamp)}
            </div>
          </div>
        </div>

        {/* Air Quality Panel */}
        <div className="sensor-panel air-panel" style={{ borderColor: airQuality.color }}>
          <div className="panel-header">
            <div className="icon-container">
              <FontAwesomeIcon icon={faSmog} />
            </div>
            <h2>Air Quality</h2>
          </div>
          <div className="panel-body">
            <div className="air-quality-metric">
              <div className="aqi-value" style={{ color: airQuality.color }}>
                {sensorData.airQuality?.aqi !== undefined ? sensorData.airQuality.aqi : "--"}
                <span className="aqi-label">AQI</span>
              </div>
              <div className="voc-value">
                {sensorData.airQuality?.tvoc !== undefined ? `${sensorData.airQuality.tvoc} TVOC` : "--"}
              </div>
            </div>
            <div className="air-quality-status" style={{ backgroundColor: airQuality.color }}>
              {airQuality.level}
            </div>
            <div className="update-time">
              <FontAwesomeIcon icon={faClock} />
              {formatTimeAgo(sensorData.airQuality?.timestamp)}
            </div>
          </div>
        </div>

        {/* Combined Status Panel */}
        <div className="status-panel">
          <h3>System Status</h3>
          <div className="status-items">
            {/* Touch Sensor - Online when touched, Offline when not touched */}
            <div className="status-item">
              <div className={`status-icon ${sensorData.touchSlider?.is_touched ? 'active' : 'inactive'
                }`}></div>
              <span>Touch Sensor</span>
              <span className="status-value">
                {sensorData.touchSlider?.is_touched ? "Online" : "Offline"}
              </span>
            </div>

            {/* Distance Sensor - Active when near (distance < 50cm), Inactive when far */}
            <div className="status-item">
              <div className={`status-icon ${sensorData.distance?.distance_cm < 50 ? 'active' : 'inactive'
                }`}></div>
              <span>Distance Sensor</span>
              <span className="status-value">
                {sensorData.distance?.distance_cm < 50 ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Air Quality - Active when AQI ≤ 3, Inactive when AQI > 3 */}
            <div className="status-item">
              <div className={`status-icon ${sensorData.airQuality?.aqi <= 3 ? 'active' : 'inactive'
                }`}></div>
              <span>Air Quality</span>
              <span className="status-value">
                {sensorData.airQuality?.aqi <= 3 ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
          <div className="system-info">
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>
              {sensorData.touchSlider?.is_touched &&
                sensorData.distance?.distance_cm < 50 &&
                sensorData.airQuality?.aqi <= 3
                ? "All systems optimal"
                : "Some systems require attention"}
            </span>
          </div>
        </div>
      </div>
      </div>
  )


     
}
export default SensorReadings;