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
io.on("connection", function (socket) {
  console.log("connected");
  socket.on("disconnect", function () {
    console.log("disconnected");
  });
});
http.listen(5000, () => {
  console.log("listening on port http://localhost:5000");
});
