let buttonColours =["red","blue","green","yellow"];

let gamePattern =[];
var userClickedPattern = [];

var level =0;
var started=false;

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

  userClickedPattern =[];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor (Math.random() * 4);
  var randomChosenColour =buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

function playSound(name){
  var context = new Audio("sounds/" + name + ".mp3");
  context.play();
};

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
      $("#"+currentColour).removeClass('pressed');
    }, 50);
};

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        console.log("settimeout")
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart")
    started = false;
    level=0;
    gamePattern =[];
    userClickedPattern = [];
  }
};
