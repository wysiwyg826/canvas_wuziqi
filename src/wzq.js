

/******************* AI ********************/
//赢法数组
var wins = [];

//赢法统计数组

var myWin = [];
var computerWin = [];

for (var i = 0; i < 15; i++) {
  wins[i] = [];
  for (var j = 0; j < 15; j++) {
    wins[i][j] = [];
  }
}

var count = 0;

//竖线
for (var i = 0; i < 15; i++) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      wins[i][j + k][count] = true;
    }
    count++;
  }
}

//横线
for (var i = 0; i < 11; i++) {
  for (var j = 0; j < 15; j++) {
    for (var k = 0; k < 5; k++) {
      wins[i + k][j][count] = true;
    }
    count++;
  }
}

//斜线
for (var i = 0; i < 11; i++) {
  for (var j = 0; j < 11; j++) {
    for (var k = 0; k < 5; k++) {
      wins[i + k][j + k][count] = true;
    }
    count++;
  }
}

//反斜线
for (var i = 0; i < 11; i++) {
  for (var j = 14; j > 3; j--) {
    for (var k = 0; k < 5; k++) {
      wins[i + k][j - k][count] = true;
    }
    count++;
  }
}

for (var i = 0; i < count; i++) {
  myWin[i] = 0;
  computerWin[i] = 0;
}

/************ UI  *******************/

var chess = document.getElementById('chess');
var context = chess.getContext("2d");
var me = true;
var over = false;
context.strokeStyle = "#BFBFBF";

var bgImage = new Image();
bgImage.src = "../res/bg.jpg";
bgImage.onload = function () {
  context.drawImage(bgImage, 0, 0, 450, 450);
  drawChessBoard();
}

// 棋盘坐标

var chessBoard = [];

for (var i = 0; i < 15; i++) {
  chessBoard[i] = [];
  for (var j = 0; j < 15; j++) {
    chessBoard[i][j] = 0;
  }
}


//棋盘绘制
var drawChessBoard = function () {
  for (var i = 0; i < 15; i++) {
    context.moveTo(15 + i * 30, 15);
    context.lineTo(15 + i * 30, 435);
    context.stroke();
    context.moveTo(15, 15 + i * 30);
    context.lineTo(435, 15 + i * 30);
    context.stroke();
  }
}

// 棋子绘制
var onStep = function (i, j, me) {
  context.beginPath();
  context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
  var gradient = context.createRadialGradient(15 + i * 30 - 2, 15 + j * 30 + 2, 13, 15 + i * 30 - 2, 15 + j * 30 - 2, 0);
  if (me) {
    gradient.addColorStop(0, "#0A0A0A");
    gradient.addColorStop(1, "#636766");
  } else {
    gradient.addColorStop(0, "#D1D1D1");
    gradient.addColorStop(1, "#F9F9F9");
  }

  context.fillStyle = gradient;
  context.closePath();
  context.fill();
}

// 落子
chess.onclick = function (e) {
  if (over) {
    return false;
  }
  if (!me) {
    return false;
  }
  var x = e.offsetX;
  var y = e.offsetY;
  var i = Math.floor(x / 30);
  var j = Math.floor(y / 30);

  if (chessBoard[i][j] === 0) {
    onStep(i, j, me);
    chessBoard[i][j] = 2; // 黑棋

    for (var k = 0; k < count; k++) {
      if (wins[i][j][k]) {
        myWin[k]++;
        computerWin[k] = 6;
        if (myWin[k] === 5) {
          window.alert("你赢了!");
          over = true;
        }
      }
    }
    if (!over) {
      me = !me;
      computerAI();
    }
  }

}

function computerAI() {
  var myScore = [];
  var computerScore = [];
  var max = 0;
  var maxX = 0;
  var maxY = 0;

  for (var i = 0; i < 15; i++) {
    myScore[i] = [];
    computerScore[i] = [];
    for (var j = 0; j < 15; j++) {
      myScore[i][j] = 0;
      computerScore[i][j] = 0;
    }
  }

  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      if (chessBoard[i][j] == 0) {
        for (var k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            if (myWin[k] == 1) {
              myScore[i][j] += 200;
            } else if (myWin[k] == 2) {
              myScore[i][j] += 400;
            } else if (myWin[k] == 3) {
              myScore[i][j] += 2000;
            } else if (myWin[k] == 4) {
              myScore[i][j] += 10000;
            }
          }

          if (wins[i][j][k]) {
            if (computerWin[k] == 1) {
              computerScore[i][j] += 211;
            } else if (computerWin[k] == 2) {
              computerScore[i][j] += 420;
            } else if (computerWin[k] == 3) {
              computerScore[i][j] += 2100;
            } else if (computerWin[k] == 4) {
              computerScore[i][j] += 20000;
            }
          }
        }
        if (myScore[i][j] > max) {
          max = myScore[i][j];
          maxX = i;
          maxY = j;
        } else if (myScore[i][j] == max) {
          if (computerScore[i][j] > computerScore[maxX][maxY]) {
            maxX = i;
            maxY = j;
          }
        }
        if (computerScore[i][j] > max) {
          max = computerScore[i][j];
          maxX = i;
          maxY = j;
        } else if (computerScore[i][j] == max) {
          if (myScore[i][j] > myScore[maxX][maxY]) {
            maxX = i;
            maxY = j;
          }
        }
      }
    }
  }
  onStep(maxX, maxY, me);
  chessBoard[maxX][maxY] = 1;
  for (var k = 0; k < count; k++) {
    if (wins[maxX][maxY][k]) {
      computerWin[k]++;
      myWin[k] = 6;
      if (computerWin[k] === 5) {
        window.alert("计算机赢了!");
        over = true;
      }
    }
  }
  if (!over) {
    me = !me;
    console.log(me);
  }
}