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
  setTimeout(() => {
    socket.send("hello client from server");
  }, 3000);
  socket.on("client", (data) => {
    console.log(data);
  });
  socket.emit("server", { description: "hello client from server" });
});

http.listen(5000, () => {
  console.log("listening on port http://localhost:5000");
});
