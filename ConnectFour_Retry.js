var player1 = prompt("Player 1, please enter your name. You will be Blue.");
var color1 = "rgb(255, 26, 26)";

var player2 = prompt("Player 2, please enter your name. You will be Red.")
var color2 = "rgb(0, 51, 204)";

var board = $(".board tr");


// Change the color of a button
function changeColor(rowNum,colNum,color){
  return board.eq(rowNum).find("td").eq(colNum).find("button").css("background-color",color);
}

// Report Back to current color of a button
function currentChipColor(rowNum,colNum){ //currentColor function is same as other variable below so doesn't work, had to rename
  return board.eq(rowNum).find("td").eq(colNum).find("button").css("background-color");
}

// Take in column index, returns the bottom row that is still gray
function findBottom(colNum){
  var bottomColor = currentChipColor(5,colNum); // - why do we need this?
  for (var row = 5; row > -1; row--) {
    var bottomColor = currentChipColor(row,colNum);
    if (bottomColor === "rgb(128, 128, 128)") {
      return row;
    }
  }
}

// Check to see if 4 inputs are the same color
function checkFour(one,two,three,four){
  return (one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined);
}

// Check for Horizontal Wins
function horzWin(){
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (checkFour(currentChipColor(row,col), currentChipColor(row,col+1), currentChipColor(row,col+2), currentChipColor(row,col+3))) {
        console.log("horizontal win");
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function vertWin(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (checkFour(currentChipColor(row,col), currentChipColor(row+1,col), currentChipColor(row+2,col), currentChipColor(row+3,col))) {
        console.log("vertical win");
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagWin(){
  for (var col = 0; col < 4 ; col++) {
    for (var row = 0; row < 7 ; row++) {
      if (checkFour(currentChipColor(row,col),currentChipColor(row-1,col+1),currentChipColor(row-2,col+2),currentChipColor(row-3,col+3))) {
        console.log("pos diagonal win");
        return true;
      }else if (checkFour(currentChipColor(row,col),currentChipColor(row+1,col+1),currentChipColor(row+2,col+2),currentChipColor(row+3,col+3))) {
          console.log("neg diagonal win");
          return true;
      }else {
        continue;
      }
    }
  }
}

// Game End
function gameOver(winningPlayer){
  $("h3").fadeOut("fast");
  $("h2").fadeOut("fast");
  $("h1").text(winningPlayer+" has won the game! Refresh the page to restart the game.");
}

// Start with Player One
 var currentPlayer = 1;
 var currentName = player1;
 var currentColor = color1;


$("h3").text(currentName+" it's your turn. Click the column to drop your chip in.");

    // Recognize what column was chosen
$(".board button").on("click",function(){
  var col = $(this).closest("td").index(); //this refers to board button, find closest clicked and provide the index. ie. if clicked first column would give col = 0

// Get back bottom available row to change
  var availRow = findBottom(col);

  // Drop the chip in that column at the bottomAvail Row
  changeColor(availRow,col,currentColor);

  // Check for a win or a tie.
  if (horzWin() || vertWin() || diagWin()) {
    gameOver(currentPlayer);

      // If no win or tie, continue to next player
  }
  currentPlayer = currentPlayer * -1;
  if (currentPlayer === 1) {
    currentName = player1;
    currentColor = color1;
    $("h3").text(currentName+" it's your turn. Click the column to drop your chip in.");
  }else {
    currentName = player2;
    currentColor = color2;
    $("h3").text(currentName+" it's your turn. Click the column to drop your chip in.");
  }
})
