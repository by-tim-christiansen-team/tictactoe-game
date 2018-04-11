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

  $(".field").click(function() {
    var pickedField = $(this).attr("class").split(" ")[1];
    if (game.fieldsIndex[pickedField] == "") {
      game.fieldsIndex[pickedField] = "player";
      fillField(pickedField);
      checkPlayerWin();
      console.log(game.fieldsIndex);
    }
    computerTurn();
  });

  function computerTurn() {
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
      console.log(game.fieldsIndex);
    }
  }

  function fillField(field) {
    $("." + field).text(game.playerChar);
  }

  function checkPlayerWin() {
    for (var h = 0; h < game.winArr.length; h++) {
      var val = game.fieldsIndex;
      if (val[game.winArr[h][0]] == "player" && val[game.winArr[h][1]] == "player" && val[game.winArr[h][2]] == "player") {
        console.log("PLAYER WINS!");
        return true;
      }
    }
  }

 });
