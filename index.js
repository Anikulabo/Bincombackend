const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const cors = require("cors");

const app = express();

// Import route files
const annoucedPuresultsRoutes = require("./apiroute/annouced_pu_resultsapiroute");
const lgaRoutes = require("./apiroute/lgapiroute");
const pollingUnitRoutes = require("./apiroute/polling_unitapiroute");
const wardRoutes = require("./apiroute/wardapiroute");
const lgaresults = require("./apiroute/lgaresultapiroute");
const { getAllParties } = require("./controllers/partycontroller");
// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(
  cors({
    origin: "http://localhost:3000", // Your React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Use routers
app.use("/api", annoucedPuresultsRoutes); // Prefix for announced polling unit results routes
app.use("/api/lga", lgaRoutes); // Prefix for LGA routes
app.use("/api/polling-units", pollingUnitRoutes); // Prefix for polling units routes
app.use("/api/wards", wardRoutes); // Prefix for ward routes
app.use("/api/lgaresults", lgaresults);
// Define a route for the homepage
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api/parties", getAllParties);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
