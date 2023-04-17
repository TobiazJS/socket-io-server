const express = require("express");
const http = require("http");

const app = require("./app");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const port = 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // Update this with your client's domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Listen for 'chat message' event
  socket.on("chat message", (message) => {
    console.log("message: " + message);

    // Broadcast 'chat message' event to all connected clients
    io.emit("chat message", message);
  });

  // Listen for 'disconnect' event
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// const express = require("express");
// const app = express();

// // Enable CORS middleware
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // Update this with your client's domain
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// // // Your server routes go here...

// // app.listen(3000, function() {
// //   console.log('Server started on port 3000');
// // });

// const io = require("socket.io")(3000);

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   // Listen for 'chat message' event
//   socket.on("chat message", (message) => {
//     console.log("message: " + message);

//     // Broadcast 'chat message' event to all connected clients
//     io.emit("chat message", message);
//   });

//   // Listen for 'disconnect' event
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
