$(document).ready(function(){
  // declare variables
  var playersTurn = "Player1";
  var fieldsArr = [];
  ($(".field").click(function() {
    var pickedField = $(this);
    if (fieldsArr.indexOf(pickedField.attr('class').split(' ')[1]) == -1) {
      fieldsArr.push(pickedField.attr('class').split(' ')[1]);
      switch(playersTurn) {
        case "Player1":
          $(pickedField).css("background-color", "orange");
          playersTurn = "Player2";
          break;
        case "Player2":
          $(pickedField).css("background-color", "green");
          playersTurn = "Player1";
          break;
      }
    }
  }));
});
