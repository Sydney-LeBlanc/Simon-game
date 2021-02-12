//Variables
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickPattern = [];
let level = 0;

// Start or Restart Game
function startGame() {
  $(document).one("keydown", function() {
    nextSequence();
    $("#level-title").text("Level " + level);
  });
}

// Start initial game
startGame();

// Play next in the sequence
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + ++level);
}

// User plays full sequences
$(".btn").click(function(event) {
  let userChosenColour = event.target.id;
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length - 1);

})

function playSound(name) {
  let btnSound = new Audio("sounds/" + name + ".mp3");
  btnSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Check if answer is correct
function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(function() {
        nextSequence();
        userClickPattern = [];
      }, 1000);
    }
  } else {
    startOver();
  }
}

// Wrong answer, start game over
function startOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  let failSound = new Audio("sounds/wrong.mp3");
  failSound.play();
  $("#level-title").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  userClickPattern = [];
  startGame();
}