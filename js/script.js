$(document).ready(function(){
  // declare variables
  var game = {
    "playerChar": "X",
    "hardMode": false,
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
    "fieldsIndex": {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: "",
      9: ""
    }
  }

  $(".reset").click(function() {
    resetGame(true);
  });

  $(".field").click(function() {
    var pickedField = $(this).attr("class").split(" ")[1];
    if (game.fieldsIndex[pickedField] == "") {
      game.fieldsIndex[pickedField] = "player";
      $("." + pickedField).text(game.playerChar);
      $(".canvas").addClass("disable-clicks");
      checkPlayerWin();
      computerTurn();
    }
  });

  function computerTurn() {
    setTimeout(function() {
      if (game.hardMode) {
        // minimax algorithm
      }
      else {
        var availableFields = [];
        for (var k = 1; k <= 9 ; k++) {
          if (game.fieldsIndex[k] == "") {
            availableFields.push(k);
          }
        }
        var random = Math.floor(Math.random() * ((availableFields.length - 1) - 0 + 1)) + 0;
        game.fieldsIndex[availableFields[random]] = "comp";
        $("." + availableFields[random]).text("O");
        console.log(game.fieldsIndex);
      }
      checkCompWin();
    }, 750);
  }

  function checkPlayerWin() {
    for (var h = 0; h < game.winArr.length; h++) {
      var val = game.fieldsIndex;
      if (val[game.winArr[h][0]] == "player" && val[game.winArr[h][1]] == "player" && val[game.winArr[h][2]] == "player") {
        console.log("PLAYER WINS!");
        $("." + val[game.winArr[h][0]]).css("background-color", "green");
        resetGame(false);
        game.score.wins += 1;
        $("#winVal").text(game.score.wins);
        return true;
      }
    }
    checkTie();
    return false;
  }

  function checkCompWin() {
    for (var h = 0; h < game.winArr.length; h++) {
      var val = game.fieldsIndex;
      if (val[game.winArr[h][0]] == "comp" && val[game.winArr[h][1]] == "comp" && val[game.winArr[h][2]] == "comp") {
        console.log("COMPUTER WINS!");
        resetGame(false);
        game.score.losses += 1;
        $("#loseVal").text(game.score.losses);
      }
    }
    checkTie();
    $(".canvas").removeClass("disable-clicks");
    return true;
  }

  function checkTie() {
    for (var j = 1; j <= 9; j++) {
      if (game.fieldsIndex[j] == "") {
        return false;
      }
    }
    resetGame(false);
    game.score.ties += 1;
    $("#tieVal").text(game.score.ties);
  }

  function resetGame(byClick) {
    for (var i = 1; i <= 9; i++) {
      game.fieldsIndex[i] = "";
    }
    $(".field").text("");
    if (byClick) {
      showPopUp();
    }
  }

  function showPopUp() {
    alert("game resetting");
  }

 });
