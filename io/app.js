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
let cnsp = io.of("/custom-namespace");
cnsp.on("connection", function (socket) {
  socket.emit("newUserWithNameSpace", "Welcome to custom namespace"); // send to newly joined user
});

http.listen(5000, () => {
  console.log("listening on port http://localhost:5000");
});
