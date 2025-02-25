const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define routes for the pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "public", "about.html")));
app.get("/product", (req, res) => res.sendFile(path.join(__dirname, "public", "product.html")));
app.get("/equipment", (req, res) => res.sendFile(path.join(__dirname, "public", "equipment.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "public", "contact.html")));
app.get("/readings", (req, res) => res.sendFile(path.join(__dirname, "public", "readings.html")));

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
