$(document).ready(function(){
  // declare variables
  var gameData = {
    "playerChar": "X",
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
    if (gameData.fieldsIndex[pickedField] == "") {
      gameData.fieldsIndex[pickedField] = "player";
      fillField(pickedField);
      checkPlayerWin();
      console.log(gameData.fieldsIndex);
    }
  });

  function fillField(field) {
    $("." + field).text(gameData.playerChar);
  }

  function checkPlayerWin() {
    for (var h = 0; h < gameData.winArr.length; h++) {
      var val = gameData.fieldsIndex;
      if (val[gameData.winArr[h][0]] == "player" && val[gameData.winArr[h][1]] == "player" && val[gameData.winArr[h][2]] == "player") {
        console.log("PLAYER WINS!");
        return true;
      }
    }
  }
 });
