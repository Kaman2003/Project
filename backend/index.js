import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";

// Configure dotenv
dotenv.config();

// Initialize Firebase Admin SDK using environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, '\n') // Handle newlines in the private key
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: [
    // "http://localhost:3000", 
    "http://localhost:5173",
    "https://h2flow.netlify.app",
    "https://h2-flow.com"
   // Fallback to common dev URLs
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // Enable pre-flight requests

app.use(bodyParser.json());

// Test route to verify Firebase connection
app.get('/api/test-firebase', async (req, res) => {
  try {
    // Test database connection
    const db = admin.database();
    const ref = db.ref('testConnection');
    await ref.set({ timestamp: Date.now() });
    const snapshot = await ref.once('value');
    
    // Test Firebase Auth
    const auth = admin.auth();
    const testUser = await auth.listUsers(1);
    
    res.json({
      success: true,
      database: snapshot.val(),
      auth: testUser.users.length > 0 ? 'Auth working' : 'No users found (but auth connection works)'
    });
  } catch (error) {
    console.error('Firebase test error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Import routes
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT,
    firebaseProject: process.env.FB_PROJECT_ID,
    clientUrl: process.env.CLIENT_URL
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Firebase project: ${process.env.FB_PROJECT_ID}`);
  console.log(`Allowed origins: ${corsOptions.origin.join(', ')}`);
});