//animate timer circle when page loads
var c = $('#circle'); // declare variable to skim on typing
c.circleProgress({
  startAngle: -Math.PI / 4 * 2,
  value: 1,
  size: 160,
  fill: {color: "#E74C3C"},
  animation: { duration: 1500, easing: "circleProgressEasing"}
});


$(document).ready(function(){

  // declare variables for timer
  var sessionLength = 0.05, breakLength = 5;
  var timeProgress = sessionLength;
  var pomoTimer = new Timer();
  var totalSessions = 0;
  var currentColor = "#E74C3C";

    // interacting with timer
    $(".play-pause").click(function() {

      // start timer from scratch
      if(pomoTimer.getStatus() == 'initialized' || pomoTimer.getStatus() == 'stopped') {
        c.circleProgress({
          animationStartValue: 1,
          value: 0,
          animation: {duration: 1000}
        });
      var timeInSeconds = sessionLength * 60; // convert minutes to seconds
      timeProgress = 0;

      // do this every second:
      pomoTimer.on("ontick", function() {
        // convert current time progress to MM:SS format
        var ms = pomoTimer.getDuration();
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        $(".timeDigital").text(minutes + ":" + (seconds < 10 ? '0' : '') + seconds);
        timeProgress += 1 / timeInSeconds; // divide session length into equal pieces and add one every second
        c.circleProgress({
          animationStartValue: timeProgress - (1 / timeInSeconds),
          value: timeProgress,
          animation: { duration: 1000, easing: "linear"}
        });
      });

      // start timer and define what to do when it has expired
      pomoTimer.start(timeInSeconds).on('end', function () {
        c.circleProgress({
          animationStartValue: timeProgress,
          value: 1,
        });
        $(".timeDigital").text("0:00");
        $("#play").removeClass("hide");
        $("#pause").addClass("hide");
        totalSessions += 1;
        $(".eight_circles div:nth-of-type(" + totalSessions + ")").addClass("active");
      });
    }

    // pause the timer
    else if (pomoTimer.getStatus() == 'started') {
      pomoTimer.pause();
    }

    // continue after timer was paused
    else {
      pomoTimer.start();
    }

    });

    // reset timer
    $(".reset").click(function() {
      pomoTimer.stop();
        c.circleProgress({
          value: 1,
          animationStartValue: timeProgress,
        });
        $("#play").removeClass("hide");
        $("#pause").addClass("hide");
        timeProgress = 0;
        $(".timeDigital").text(sessionLength + ":00");
    });

    // switch between play and pause button
      $(".play-pause").click(function() {
        $("#play, #pause").toggleClass("hide");
      });

// make sure session and break values stay between 1 and 60
function checkVal(value) {
  if(value >= 1 && value <= 60) {
    return true;
  }
}

  // adjust session and break length
$(".num").click(function() {
  var classOfEl = $(this).attr("class");
  switch(classOfEl){
    case "num session-":
    if (checkVal(sessionLength - 1)) {
      sessionLength -= 1;
      $(".session").text(sessionLength);
      $(".timeDigital").text(sessionLength + ":00");
    }
      break;
    case "num session+":
      if (checkVal(sessionLength + 1)) {
        sessionLength += 1;
        $(".session").text(sessionLength);
        $(".timeDigital").text(sessionLength + ":00");
      }
      break;
    case "num break-":
      if (checkVal(breakLength - 1)) {
        breakLength -= 1;
        $(".break").text(breakLength);
      }
      break;
    case "num break+":
      if (checkVal(breakLength + 1)) {
        breakLength += 1;
        $(".break").text(breakLength);
      }
     break;
  }
});

  // change color theme
  function changeTheme(colorClass, hex) {
    $("body").removeClass().addClass(colorClass);
    $(".active").css("background-color", hex);
    c.circleProgress({
      fill: {color: hex},
      animation: false
    });
  }

  $(".cpicker").click(function() {
    var className = $(this).attr('class');
    switch(className){
      case 'total g cpicker':
        changeTheme("g", "#2ECC71");
        break;
      case 'total o cpicker':
        changeTheme("o", "#E67E22");
        break;
      case 'total b cpicker':
        changeTheme("b", "#3498DB");
        break;
      case 'total r cpicker':
        changeTheme("r", "#E74C3C");
        break;
      }
    });

  // toggle between timer and settings page
  $('.options').click(function() {
    if ( $(this).closest(".container").hasClass("landing") ){
      $('.settingspage').removeClass('hide');
    }
    else {
      $('.settingspage').addClass('hide');
    }
  });

});
