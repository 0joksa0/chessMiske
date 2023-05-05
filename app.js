
const { Chess } = require('chess.js')
var list = new Array();
var mongodb = require('mongodb');
var express = require("express");
const { Socket } = require('socket.io');
//var chessR = require("chess.js")
var app = express();
app.use(express.static("public"));
var http = require("http").Server(app);
var port = process.env.PORT || 3001;

var io = require("socket.io")(http);
const chess = new Chess()
    //console.log(chess);
    //console.log(chess.board());

io.on("connection", function (socket) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("new connection");
  console.log(socket.id);
  console.log(socket.connected);
  //chess.move()
  // list.forEach((element) => {
  //   if (element.disconnected) list.pop(element);
  // });

  // //adding client to list should be changed to list of objects somehow
  // list.push(socket);
  // console.log(list);
  socket.emit("start", chess.board()) 
  socket.on("move", function (move) {
    try {
      console.log(chess.move(move))
      if(chess.isGameOver()){
        socket.emit("update", chess.board());
        socket.emit("gameOver", 1)
      }
      else
        socket.emit("update", chess.board());
    } catch (error) {
      console.log("invalid move")
      socket.emit("invalid move", 1)
    }
    

    //handling sending from clinet to client
    // for (var i = 0; i < list.length; i++) {
    //   if (list[i].connected) {
    //     if (
    //       list[i] == socket &&
    //       i % 2 == 0 &&
    //       list[i + 1] != null &&
    //       list[i + 1].connected
    //     )
    //       list[i + 1].emit("hello", msg + " od:" + i);
    //     if (
    //       list[i] == socket &&
    //       i % 2 == 1 &&
    //       list[i - 1] != null &&
    //       list[i - 1].connected
    //     )
    //       list[i - 1].emit("hello", msg + " od:" + i);
    //   }
    // }
  });

  console.log(
    "----------------------------------------------------------------"
  );
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/default.html");
});

http.listen(port, function () {
  console.log("listening on port" + port);
});
