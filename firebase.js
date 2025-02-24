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
const form = document.querySelector("form");

// Get a reference to the Realtime Database
const database = getDatabase(app);
const sensorRef = ref(database, "ceng355/sensor");


// Listen to changes in the sensor data in Firebase Realtime Database
onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    document.getElementById("touch-sensor").innerText = data.touchSensor ? "Touched" : "Not Touched";
    document.getElementById("tof-sensor").innerText = data.tofSensor + " cm";
    document.getElementById("air-quality-sensor").innerText = data.airQualitySensor + " AQI";
  } else {
    document.getElementById("touch-sensor").innerText = "No Data";
    document.getElementById("tof-sensor").innerText = "No Data";
    document.getElementById("air-quality-sensor").innerText = "No Data";
  }
});
