$(document).ready(function(){
  // declare variables
  var gameData = {
    "playerCharacter": "",
    "unavailableFields": [],
    "score": {"wins": 0,
              "ties": 0,
              "losses": 0
            }
  }

  $(".field").click(function() {
    var pickedField = $(this).attr("class").split(" ")[1];
    if (gameData.unavailableFields.indexOf(pickedField) == -1) {
      gameData.unavailableFields.push(pickedField);
      fillField(pickedField);
      console.log("Field available!");
      console.log(gameData.unavailableFields);
    }
    else {
      console.log("Field unavailable!");
    }
  });

  function fillField(field) {
  }
});
