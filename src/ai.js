//赢法数组
var wins = [];

//赢法统计数组

var myWin = [];
var computerWin = [];

for(var i = 0; i < 15; i++) {
  wins[i] = [];
  for(var j = 0; j < 15; j++) {
    wins[i][j] = [];
  }
}

var count = 0;

//竖线
for(var i = 0; i < 15; i++) {
  for(var j = 0; j < 11; j++) {
    for(var k = 0; k < 5; k++) {
      wins[i][j+k][count] = true;
    }
    count++;
  }
}

//横线
for(var i = 0; i < 11; i++) {
  for(var j = 0; j < 15; j++) {
    for(var k = 0; k < 5; k++) {
      wins[i+k][j][count] = true;
    }
    count++;
  }
}

//斜线
for(var i = 0; i < 11; i++) {
  for(var j = 0; j < 11; j++) {
    for(var k = 0; k < 5; k++) {
      wins[i+k][j+k][count] = true;
    }
    count++;
  }
}

//反斜线
for(var i = 4; i < 15; i++) {
  for(var j = 4; j < 15; j++) {
    for(var k = 0; k < 5; k++) {
      wins[i-k][j-k][count] = true;
    }
    count++;
  }
}

for(var i = 0; i < count; i++) {
  myWin[i] = 0;
  computerWin[i] = 0;
}
console.log(count)