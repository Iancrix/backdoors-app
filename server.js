const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

// Middleware
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// Import Routes
app.get("/", (req, res) => {});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("./frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Server Init
app.listen(PORT, HOST, () => console.log(`Server started on port ${PORT}`));
