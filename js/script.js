$(document).ready(function(){
  // declare variables
  var game = {
    "playerChar": "X",
    "hardMode": true,
    "score": {
      "wins": 0,
      "ties": 0,
      "losses": 0
    },
    "winArr": [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ],
    "board": ["0","1","2","3","4","5","6","7","8"]
  }

  $(".reset").click(function() {
    resetGame(true);
  });

  $(".field").click(function() {
    var pickedField = $(this).attr("id");
    console.log(pickedField);
    if (game.board[pickedField] !== "comp" && game.board[pickedField] !== "player") {
      game.board[pickedField] = "player";
      console.log(game.board);
      $("#" + pickedField).text(game.playerChar);
      $(".canvas").addClass("disable-clicks");
      if (checkWin(game.board, "player")) {
        console.log("PLAYER WINS.");
        game.score.wins += 1;
        $("#winVal").text(game.score.wins)
        setTimeout(function() {
          resetGame(false);
          return true;
        },750);
      }
      checkTie();
      computerTurn();
    }
  });

  function computerTurn() {
    setTimeout(function() {

      var availableFields = game.board.filter(s => s != "player" && s != "comp");
      console.log("Available: " + availableFields);

      if (game.hardMode) {
        console.log("hard mode");
        // minimax algorithm
        var aiPicked = minimax(game.board, "comp").index;
        $("#" + aiPicked).text("O");
        game.board[aiPicked] = "comp";

      }
      else {
        var random = Math.floor(Math.random() * ((availableFields.length - 1) - 0 + 1)) + 0;
        game.board[availableFields[random]] = "comp";
        $("#" + availableFields[random]).text("O");
        console.log(game.board);
      }
      if (checkWin(game.board, "comp")) {
        console.log("COMPUTER WINS.");
        game.score.losses += 1;
        $("#loseVal").text(game.score.losses)
        setTimeout(function() {
          resetGame(false);
        },750);
      }
      checkTie();
      $(".canvas").removeClass("disable-clicks");
    }, 750);
  }

  function checkWin(board, player) {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkTie() {
    if (game.board.filter(s => s != "player" && s != "comp").length == 0) {
      console.log("IT'S A TIE.");
      setTimeout(function() {
        resetGame(false);
      }, 750);
      game.score.ties += 1;
      $("#tieVal").text(game.score.ties);
    }
  }

  function resetGame(byClick) {
    for (var i = 0; i <= 8; i++) {
      game.board[i] = i;
      console.log(game.board);
    }
    $(".field").text("");
    if (byClick) {
      showPopUp();
    }
  }

  function showPopUp() {
    alert("game resetting");
  }

  function emptyIndexies(altBoard){
    return altBoard.filter(s => s != "player" && s != "comp");
  }

  function minimax(newBoard, player){
  //add one to function calls

  //available spots
  var availSpots = emptyIndexies(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (checkWin(newBoard, "player")){
     return {score:-10};
  }
	else if (checkWin(newBoard, "comp")){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == "comp"){
      var result = minimax(newBoard, "player");
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, "comp");
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === "comp"){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
return moves[bestMove];
}
});
