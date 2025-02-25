// Import the necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq2a_2dZs5wVwcLb8ENx8f_5eeuNLJPd8",
  authDomain: "h2flow-4ab96.firebaseapp.com",
  projectId: "h2flow-4ab96",
  storageBucket: "h2flow-4ab96.firebasestorage.app",
  messagingSenderId: "213685018499",
  appId: "1:213685018499:web:f932223d0e3b203e00a0b6",
  measurementId: "G-V7MQ9ZMS6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the Realtime Database
const database = getDatabase(app);
const sensorRef = ref(database, "CENG355/sensors");

// Function to find the latest data from a given sensor type
function getLatestSensorData(sensorData) {
  let latestData = null;
  let latestTimestamp = null;
  
  for (const key in sensorData) {
    const data = sensorData[key];
    const timestamp = new Date(data.timestamp);  // Convert timestamp string to Date object

    // Compare to find the most recent data
    if (!latestTimestamp || timestamp > latestTimestamp) {
      latestTimestamp = timestamp;
      latestData = data;
    }
  }

  return latestData;
}

// Listen to changes in the sensor data in Firebase Realtime Database
onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  
  if (data) {
    // Fetch the latest data for each sensor
    const latestAirQualityData = getLatestSensorData(data.air_quality_sensor);
    const latestDistanceData = getLatestSensorData(data.distance_sensor);
    const latestTouchSliderData = getLatestSensorData(data.touch_slider);

    // Update the DOM with the latest sensor data
    document.getElementById("touch-sensor").innerText = latestTouchSliderData ? (latestTouchSliderData.pad1 ? "Touched" : "Not Touched") : "No Data";
    document.getElementById("tof-sensor").innerText = latestDistanceData ? `${latestDistanceData.distance_mm} mm` : "No Data";
    document.getElementById("air-quality-sensor").innerText = latestAirQualityData ? `${latestAirQualityData.aqi} AQI` : "No Data";
  } else {
    // If no data, show "No Data"
    document.getElementById("touch-sensor").innerText = "No Data";
    document.getElementById("tof-sensor").innerText = "No Data";
    document.getElementById("air-quality-sensor").innerText = "No Data";
  }
});
