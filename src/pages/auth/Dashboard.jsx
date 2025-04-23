import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/dashboard.css";
import {
  faTint,
  faChartLine,
  faBell,
  faServer,
  faDatabase,
  faThermometerHalf,
  faClock,
  faExclamationTriangle,
  faCheckCircle,
  faWater,
  faRulerVertical,
  faWind,
  faBolt,
  faHistory,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ref, onValue, push, set } from "firebase/database";
import { database, app } from "../../firebase/config";
import { useState, useEffect, useRef } from "react";

function Dashboard() {

  // Function to save water consumption data to Firebase
  const saveWaterConsumption = async (amount) => {
    try {
      const waterRef = ref(database, 'CENG355/waterConsumption');
      const newWaterRef = push(waterRef);
      await set(newWaterRef, {
        amount,
        timestamp: new Date().toISOString()
      });
      console.log("Water consumption saved successfully");
    } catch (error) {
      console.error("Error saving water consumption:", error);
    }
  };

  // Function to fetch water consumption history
  const fetchWaterConsumption = () => {
    const waterRef = ref(database, 'CENG355/waterConsumption');
    return new Promise((resolve) => {
      onValue(waterRef, (snapshot) => {
        const data = snapshot.val();
        const history = data ? Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        })) : [];
        resolve(history);
      });
    });
  };

  const { currentUser } = useAuth();
  const [sensorData, setSensorData] = useState({
    airQuality: null,
    distance: null,
    touchSlider: null,
    loading: true,
    error: null,
  });


  const [waterConsumption, setWaterConsumption] = useState({
    dailyTotal: 0,
    currentSession: 0,
    isFilling: false,
    lastFilledTime: null,
    dailyHistory: [],
  });

  // Refs for tracking filling state and intervals
  const fillingInterval = useRef(null);
  const touchStartTime = useRef(null);
  const isFillingRef = useRef(false); // <- Add this


  // Fetch real-time sensor data
  useEffect(() => {
    const loadWaterData = async () => {
      try {
        const history = await fetchWaterConsumption();
        if (history.length > 0) {
          const dailyTotal = history.reduce((sum, entry) => sum + entry.amount, 0);
          setWaterConsumption(prev => ({
            ...prev,
            dailyTotal,
            dailyHistory: history.slice(-10).map(entry => ({
              time: entry.timestamp,
              amount: entry.amount
            }))
          }));
        }
      } catch (error) {
        console.error("Error loading water data:", error);
      }
    };

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
            loading: false,
          }));
        }
      });

      const distanceUnsub = onValue(distanceRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData((prev) => ({
            ...prev,
            distance: lastEntry[1],
            loading: false,
          }));
        }
      });

      const touchSliderUnsub = onValue(touchSliderRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entries = Object.entries(data);
          const lastEntry = entries[entries.length - 1];
          setSensorData((prev) => ({
            ...prev,
            touchSlider: lastEntry[1],
            loading: false,
          }));

          // Handle touch sensor changes for water consumption
          handleTouchSensorChange(lastEntry[1]);
        }
      });


      return () => {
        airQualityUnsub();
        distanceUnsub();
        touchSliderUnsub();
        // Clean up interval on unmount
        if (fillingInterval.current) {
          clearInterval(fillingInterval.current);
        }
      };
    } catch (error) {
      setSensorData((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  }, []);

  // Handle touch sensor changes for water consumption
  const handleTouchSensorChange = (touchData) => {
    console.log("Touch Sensor Update:", touchData);
    if (touchData.is_touched) {
      if (!isFillingRef.current) {
        startFilling();
      }
    } else {
      if (isFillingRef.current) {
        stopFilling();
      }
    }
  };

  // Start filling water
  const startFilling = () => {
    touchStartTime.current = new Date();
    isFillingRef.current = true; // ✅ Keep ref in sync

    setWaterConsumption(prev => ({
      ...prev,
      isFilling: true,
      currentSession: 0,
    }));

    fillingInterval.current = setInterval(() => {
      const now = new Date();
      const secondsElapsed = (now - touchStartTime.current) / 1000;
      const mlFilled = Math.floor(secondsElapsed * 3);

      setWaterConsumption(prev => ({
        ...prev,
        currentSession: mlFilled,
      }));
    }, 1000);
  };

  // Stop filling water and update totals
  const stopFilling = async () => {
    console.log('Attempting to stop filling');

    if (fillingInterval.current) {
      clearInterval(fillingInterval.current);
      fillingInterval.current = null;
    }

    isFillingRef.current = false;

    const now = new Date();
    const fillTime = now.toISOString();

    setWaterConsumption(prev => {
      if (!prev.isFilling) {
        console.log("Skip stop: isFilling was false in state");
        return prev;
      }

      const newTotal = prev.dailyTotal + prev.currentSession;
      const newHistory = [
        ...prev.dailyHistory,
        {
          time: fillTime,
          amount: prev.currentSession,
        }
      ].slice(-10);

      // Save to database
      if (prev.currentSession > 0) {
        saveWaterConsumption(prev.currentSession);
      }

      return {
        ...prev,
        isFilling: false,
        dailyTotal: newTotal,
        lastFilledTime: fillTime,
        dailyHistory: newHistory,
      };
    });
  };

  // Helper functions
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Just now";
    const now = new Date();
    const sensorTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - sensorTime) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    return sensorTime.toLocaleTimeString();
  };

  // Format water amount for display
  const formatWaterAmount = (ml) => {
    if (ml >= 1000) {
      return `${(ml / 1000).toFixed(1)} L`;
    }
    return `${ml} ml`;
  };

  // Calculate daily average (assuming we have 7 days of data for demo)
  const calculateDailyAverage = () => {
    // In a real app, you would get this from historical data
    // For demo purposes, we'll use a fixed value or calculate from today's data
    return waterConsumption.dailyTotal > 0
      ? Math.round(waterConsumption.dailyTotal / 24 * 100) / 100 // Average per hour
      : 250; // Default value
  };

  // System status based on sensor data
  const systemStatus = {
    sensors: sensorData.loading ? "checking..." : sensorData.error ? "offline" : "online",
    database: "online",
    api: "online",
    alerts: sensorData.airQuality?.aqi > 3 ? "1 active" : "none",
  };

  // Recent activity log
  const recentActivity = [
    {
      time: formatTimeAgo(sensorData.airQuality?.timestamp),
      event: `Air quality update: AQI ${sensorData.airQuality?.aqi || '--'}`,
      status: sensorData.airQuality?.aqi > 3 ? "warning" : "info",
    },
    {
      time: formatTimeAgo(sensorData.distance?.timestamp),
      event: `Distance measured: ${sensorData.distance?.distance_cm || '--'} mm`,
      status: sensorData.distance?.distance_cm < 50 ? "warning" : "info",
    },
    {
      time: formatTimeAgo(sensorData.touchSlider?.timestamp),
      event: `Touch sensor: ${sensorData.touchSlider?.is_touched ? 'Touched' : 'Not Touched'}`,
      status: "info",
    },
    ...waterConsumption.dailyHistory.slice().reverse().map((entry, index) => ({
      time: formatTimeAgo(entry.time),
      event: `Water dispensed: ${formatWaterAmount(entry.amount)}`,
      status: "success",
    })).slice(0, 1), // Only show the most recent water activity
    {
      time: "System boot",
      event: "Dashboard initialized",
      status: "success",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>
            <FontAwesomeIcon icon={faChartLine} />
            H2Flow Dashboard
          </h1>
          <p className="welcome-message">
            Welcome back, <strong>{currentUser?.name || "Operator"}</strong>
          </p>
        </div>
        <div className="header-actions">
          <button className="notification-badge">
            <FontAwesomeIcon icon={faBell} />
            {systemStatus.alerts !== "none" && <span className="alert-dot"></span>}
          </button>
        </div>
      </header>

      {/* Real-time Sensor Status Cards */}
      <section className="sensor-grid">
        {/* Air Quality Card */}
        <div className={`sensor-card ${!sensorData.airQuality ? 'loading' : ''}`}>
          <div className="card-header">
            <FontAwesomeIcon icon={faWind} className="card-icon" />
            <h3>Air Quality</h3>
            <span className={`status-badge ${!sensorData.airQuality?.aqi ? 'unknown' :
              sensorData.airQuality.aqi <= 1 ? 'excellent' :
                sensorData.airQuality.aqi <= 3 ? 'good' : 'poor'
              }`}>
              {!sensorData.airQuality?.aqi ? '--' :
                sensorData.airQuality.aqi <= 1 ? 'Excellent' :
                  sensorData.airQuality.aqi <= 3 ? 'Good' : 'Poor'}
            </span>
          </div>
          <div className="card-body">
            <div className="metric">
              <span>AQI</span>
              <strong>{sensorData.airQuality?.aqi || '--'}</strong>
            </div>
            <div className="metric">
              <span>VOC</span>
              <strong>{sensorData.airQuality?.tvoc || '--'} ppm</strong>
            </div>
            <div className="metric">
              <span>Updated</span>
              <strong>{formatTimeAgo(sensorData.airQuality?.timestamp)}</strong>
            </div>
          </div>
        </div>

        {/* Distance Sensor Card */}
        <div className={`sensor-card ${!sensorData.distance ? 'loading' : ''}`}>
          <div className="card-header">
            <FontAwesomeIcon icon={faRulerVertical} className="card-icon" />
            <h3>Distance</h3>
            <span className={`status-badge ${sensorData.distance?.distance_cm < 50 ? 'warning' : 'normal'
              }`}>
              {sensorData.distance?.distance_cm < 50 ? 'Close' : 'Normal'}
            </span>
          </div>
          <div className="card-body">
            <div className="metric">
              <span>Current</span>
              <strong>{sensorData.distance?.distance_cm || '--'} mm</strong>
            </div>
            <div className="metric">
              <span>Status</span>
              <strong>
                {sensorData.distance?.distance_cm < 50 ? 'Object detected' : 'Clear'}
              </strong>
            </div>
            <div className="metric">
              <span>Updated</span>
              <strong>{formatTimeAgo(sensorData.distance?.timestamp)}</strong>
            </div>
          </div>
        </div>

        {/* Touch Sensor Card */}
        <div className={`sensor-card ${!sensorData.touchSlider ? 'loading' : ''}`}>
          <div className="card-header">
            <FontAwesomeIcon icon={faWater} className="card-icon" />
            <h3>Touch Sensor</h3>
            <span className={`status-badge ${sensorData.touchSlider?.is_touched ? 'active' : 'inactive'
              }`}>
              {sensorData.touchSlider?.is_touched ? 'Touched' : 'Not Touched'}
            </span>
          </div>
          <div className="card-body">
            <div className="metric">
              <span>Status</span>
              <strong>{sensorData.touchSlider?.is_touched ? 'Touched' : 'Not Touched'}</strong>
            </div>
            <div className="metric">
              <span>Water Flow</span>
              <strong>
                {waterConsumption.isFilling ?
                  `Dispensing: ${formatWaterAmount(waterConsumption.currentSession)}` :
                  'Idle'}
              </strong>
            </div>
            <div className="metric">
              <span>Updated</span>
              <strong>{formatTimeAgo(sensorData.touchSlider?.timestamp)}</strong>
            </div>
          </div>
        </div>

        {/* System Health Card */}
        <div className="sensor-card system-health">
          <div className="card-header">
            <FontAwesomeIcon icon={faServer} className="card-icon" />
            <h3>System Health</h3>
            <span className="status-badge online">Online</span>
          </div>
          <div className="card-body">
            <div className="health-metric">
              <span>Sensors</span>
              <div className="status-indicator online"></div>
              <strong>{systemStatus.sensors}</strong>
            </div>
            <div className="health-metric">
              <span>Database</span>
              <div className="status-indicator online"></div>
              <strong>{systemStatus.database}</strong>
            </div>
            <div className="health-metric">
              <span>API</span>
              <div className="status-indicator online"></div>
              <strong>{systemStatus.api}</strong>
            </div>
            <div className="health-metric">
              <span>Alerts</span>
              <div className={`status-indicator ${systemStatus.alerts !== "none" ? 'warning' : 'ok'}`}></div>
              <strong>{systemStatus.alerts}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Charts and Activity Section */}
      <section className="dashboard-content">
        {/* Activity Log */}
        <div className="activity-log">
          <div className="section-header">
            <FontAwesomeIcon icon={faHistory} />
            <h2>Recent Activity</h2>
          </div>
          <div className="log-entries">
            {recentActivity.map((activity, index) => (
              <div key={index} className={`log-entry ${activity.status}`}>
                <div className="entry-time">{activity.time}</div>
                <div className="entry-event">{activity.event}</div>
                <div className="entry-icon">
                  {activity.status === "success" ? (
                    <FontAwesomeIcon icon={faCheckCircle} />
                  ) : activity.status === "warning" ? (
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  ) : (
                    <FontAwesomeIcon icon={faInfoCircle} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Consumption Chart */}
        <div className="consumption-chart">
          <div className="section-header">
            <FontAwesomeIcon icon={faTint} />
            <h2>Water Consumption</h2>
          </div>
          <div className="chart-container">
            <div className="water-stats">
              <div className="water-stat">
                <span className="stat-label">Today's Total</span>
                <span className="stat-value">{formatWaterAmount(waterConsumption.dailyTotal)}</span>
              </div>
              <div className="water-stat">
                <span className="stat-label">Current Session</span>
                <span className="stat-value">
                  {waterConsumption.isFilling ?
                    `${formatWaterAmount(waterConsumption.currentSession)} (filling)` :
                    '--'}
                </span>
              </div>
              <div className="water-stat">
                <span className="stat-label">Avg/Hour</span>
                <span className="stat-value">{formatWaterAmount(calculateDailyAverage())}</span>
              </div>
            </div>

            {/* Simple bar chart for visualization */}
            <div className="water-bar-chart">
              <div className="chart-title">Today's Consumption</div>
              <div className="chart-bars">
                {/* For demo, we'll show 6 bars representing usage */}
                {[0, 1, 2, 3, 4, 5].map((hour) => {
                  // In a real app, you would have hourly data
                  // For demo, we'll randomize some values based on today's total
                  const hourValue = hour === new Date().getHours() ?
                    waterConsumption.currentSession :
                    Math.round(waterConsumption.dailyTotal / 6 * Math.random());

                  return (
                    <div key={hour} className="chart-bar-container">
                      <div
                        className="chart-bar"
                        style={{ height: `${Math.min(100, hourValue / 500 * 100)}%` }}
                      ></div>
                      <div className="chart-bar-label">{hour * 4}:00</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="chart-legend">
              <span className="legend-item">
                <span className="color-swatch today"></span>
                Current: {formatWaterAmount(waterConsumption.currentSession)}
              </span>
              <span className="legend-item">
                <span className="color-swatch average"></span>
                Today Total: {formatWaterAmount(waterConsumption.dailyTotal)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* System Metrics */}
      <section className="system-metrics">
        <div className="metric-card">
          <FontAwesomeIcon icon={faBolt} className="metric-icon" />
          <div className="metric-value">24V</div>
          <div className="metric-label">Power Supply</div>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faThermometerHalf} className="metric-icon" />
          <div className="metric-value">
            {sensorData.airQuality?.eco2 || '--'} ppm
          </div>
          <div className="metric-label">CO₂ Levels</div>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faDatabase} className="metric-icon" />
          <div className="metric-value">1.2MB</div>
          <div className="metric-label">Data Today</div>
        </div>
        <div className="metric-card">
          <FontAwesomeIcon icon={faClock} className="metric-icon" />
          <div className="metric-value">
            {sensorData.loading ? '--' : '0.4'}s
          </div>
          <div className="metric-label">Avg Response</div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;