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
let user = 1;
io.on("connection", function (socket) {
  io.sockets.emit("countuser", "Total user " + user++); //to all user
  socket.broadcast.emit("newuser", "New user added"); // send to all old user 
  socket.emit("newuser", "Welcome"); // send to newly joined user
});

http.listen(5000, () => {
  console.log("listening on port http://localhost:5000");
});
