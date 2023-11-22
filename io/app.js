var app = require("express")();
var http = require("http").Server(app);

var path = require("path");
var io = require("socket.io")(http);
app.get("/", function (req, res) {
  var options = {
    root: path.join(__dirname),
  };
  res.sendFile("index.html", options);
});
let room = 1;
let full = 0;
io.on("connection", function (socket) {
  socket.join("room-" + room);
  io.sockets.in("room-" + room).emit("room_joined", "Welcome to room " + room); // send to newly joined user
  full++;
  if (full >= 2) {
    full = 0;
    room++;
  }
});

http.listen(5000, () => {
  console.log("listening on port http://localhost:5000");
});
