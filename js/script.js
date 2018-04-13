$(document).ready(function(){
  // declare variables
  var game = {
    "playerChar": "X",
    "compChar": "O",
    "hardMode": true,
    "score": {
      "wins": 0,
      "ties": 0,
      "losses": 0
    },
    "board": ["0","1","2","3","4","5","6","7","8"]
  }

  $(".reset").click(function() {
    resetGame(true);
  });

  $(".field").click(function() {
    var pickedField = $(this).attr("id");

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
      if (game.hardMode) {
        // minimax algorithm
        var aiPicked = minimax(game.board, "comp").index;
        $("#" + aiPicked).text("O");
        game.board[aiPicked] = "comp";
      }
      else {
        var random = Math.floor(Math.random() * ((availableFields.length - 1) - 0 + 1)) + 0;
        game.board[availableFields[random]] = "comp";
        $("#" + availableFields[random]).text("O");
      }
      if (checkWin(game.board, "comp")) {
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
    var availSpots = emptyIndexies(newBoard);
    if (checkWin(newBoard, "player")){
      return {score:-10};
    }
	  else if (checkWin(newBoard, "comp")){
      return {score:10};
	   }
    else if (availSpots.length === 0){
  	   return {score:0};
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++){
      var move = {};
  	   move.index = newBoard[availSpots[i]];
       newBoard[availSpots[i]] = player;
       if (player == "comp"){
         var result = minimax(newBoard, "player");
         move.score = result.score;
       }
       else{
         var result = minimax(newBoard, "comp");
         move.score = result.score;
       }
       newBoard[availSpots[i]] = move.index;
       moves.push(move);
     }
     var bestMove;
     if(player === "comp"){
       var bestScore = -10000;
       for(var i = 0; i < moves.length; i++){
         if(moves[i].score > bestScore){
           bestScore = moves[i].score;
           bestMove = i;
         }
       }
     }
     else {
       var bestScore = 10000;
       for(var i = 0; i < moves.length; i++){
         if(moves[i].score < bestScore){
           bestScore = moves[i].score;
           bestMove = i;
         }
       }
     }

     return moves[bestMove];
   }
});
