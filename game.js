

var buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = []
var level = 0 ; 
function nextSequence() {
    userClickedPattern = []; 
    level++;
    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() *4 );
    var randomChosenColour = buttonColors[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}
$(".btn").on("click",handler);
function handler(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    

}


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).on("keydown",function() {
    if (level === 0)
        nextSequence();
    
})

function checkAnswer(currentLevel) {

    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}


function startOver(){
    level = 0 ;
    gamePattern = [];
}