$(document).ready(function(){
  // declare variables
  var unavailableFields = [];
  $(".field").click(function() {
    var pickedField = $(this);
    if (unavailableFields.indexOf(pickedField.attr('class').split(' ')[1]) == -1) {
      unavailableFields.push(pickedField.attr('class').split(' ')[1]);
      $(pickedField).append($(".player1-icon"));
      
    }
  });
});
