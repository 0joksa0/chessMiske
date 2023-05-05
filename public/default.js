var socket = io();
var board;
socket.on("start", function (arg) {
  //console.log(arg[1][1].type);
  console.log(arg);
  board = arg;
});

socket.on("update", function (arg) {
  //console.log(arg[1][1].type);
  board = arg;
  killBoard(game.scene)
  loadBoard(game.scene.scenes[0], board);
  startPos();
});

socket.on("invalid move", function (arg) {
  startPos();
});

socket.on("gameOver", function (arg){
  loadBoard(game.scene.scenes[0], board);
  console.log("Game Over!");
  //alert("Game Over!");

});

// window.onclick = function (event) {
//   socket.emit("message", "from client");
// };

console.log(socket);

var config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 1024,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var table = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
var table2 = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
function preload() {
  this.load.image("brown", "img/brown.png");
  this.load.image("lbrown", "img/lbrown.png");
  this.load.image("bB", "img/chesspieces/wikipedia/bB.png");
  this.load.image("bK", "img/chesspieces/wikipedia/bK.png");
  this.load.image("bN", "img/chesspieces/wikipedia/bN.png");
  this.load.image("bP", "img/chesspieces/wikipedia/bP.png");
  this.load.image("bQ", "img/chesspieces/wikipedia/bQ.png");
  this.load.image("bR", "img/chesspieces/wikipedia/bR.png");
  this.load.image("wB", "img/chesspieces/wikipedia/wB.png");
  this.load.image("wK", "img/chesspieces/wikipedia/wK.png");
  this.load.image("wN", "img/chesspieces/wikipedia/wN.png");
  this.load.image("wP", "img/chesspieces/wikipedia/wP.png");
  this.load.image("wQ", "img/chesspieces/wikipedia/wQ.png");
  this.load.image("wR", "img/chesspieces/wikipedia/wR.png");
  this.load.image("empty", "img/chesspieces/empty.png");
}
var start = false;
var dest = false;

function create() {
  loadBackground(this);
  loadBoard(this, board);
  console.log(this);
  console.log(game.scene.scenes[0]);
  console.log(table2);

  startPos();

  // this.input.on('pointerup', () => {
  //   console.log("pomm")
  // }).setTopOnly(true);
}

function update() {
  //loadBoard(this, board);
  
}

function startPos() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table2[i][j].once("pointerup", (e) => {
        if(board[i][j] != null){
          console.log("start: " +i + j);
          destination(i, j)
          return ;
        }
      });
    }
  }
}

function destination(sI, sJ) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (table2[i][j] != 0) {
         table2[i][j].once("pointerup", () => {
          console.log("destination:" + i + j);
          removeEvent();
          let move = {from: transformToFen(sI, sJ),to : transformToFen(i, j), promotion: "q"};
          console.log(move)
          socket.emit("move", move);
          return;
        });
        
      }
      
    }
  }
}

function removeEvent(){
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table2[i][j].off("pointerup");
    }
  }
}

function transformToFen(i, j){
  let x = 97 + j;
  let y = 8-i;
  return (String.fromCharCode(x) + y);
}


function killBoard(scene){
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      table2[i][j].destroy(true);
    }
  }
}

function loadBackground(scene) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (table[i][j] == 0) {
        if ((i + j) % 2 == 0)
          table[i][j] = scene.add
            .sprite(64 + j * 128, 64 + i * 128, "brown")
            .setInteractive();
        else
          table[i][j] = scene.add
            .sprite(64 + j * 128, 64 + i * 128, "lbrown")
            .setInteractive();
      }
    }
  }
}

function loadBoard(scene, board) {
  //console.log(board);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ( board[i][j] == null) {
        table2[i][j] = scene.add
          .sprite(64 + j * 128, 64 + i * 128)
          .setInteractive()
          .setScale(1.2);
        continue;
      }
      if (board[i][j] != null && board[i][j].color == "b") {
        switch (board[i][j].type) {
          case "r":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "bR")
              .setInteractive()
              .setScale(1.2);
            break;
          case "n":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "bN")
              .setInteractive()
              .setScale(1.2);
            break;
          case "b":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "bB")
              .setInteractive()
              .setScale(1.2);
            break;
          case "q":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "bQ")
              .setInteractive()
              .setScale(1.2);
            break;
          case "k":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "bK")
              .setInteractive()
              .setScale(1.2);
            break;
          case "p":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "bP")
              .setInteractive()
              .setScale(1.2);
            break;
          default:
            console.log("Greska");
            break;
        }
      }
      if (board[i][j] != null && board[i][j].color == "w") {
        switch (board[i][j].type) {
          case "r":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "wR")
              .setInteractive()
              .setScale(1.2);
            break;
          case "n":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "wN")
              .setInteractive()
              .setScale(1.2);
            break;
          case "b":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "wB")
              .setInteractive()
              .setScale(1.2);
            break;
          case "q":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "wQ")
              .setInteractive()
              .setScale(1.2);
            break;
          case "k":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "wK")
              .setInteractive()
              .setScale(1.2);
            break;
          case "p":
            table2[i][j] = scene.add
              .sprite(64 + j * 128, 64 + i * 128, "wP")
              .setInteractive()
              .setScale(1.2);
          default:
            console.log("Greska");
            break;
        }
      }
    }
  }
}
