

// define a word array for the computer to choose from
var words = ["yakitori", "ratatouille", "gnocchi", "schnitzel", "udon", "burritos", "casserole"]

// define an alphabet array
var letter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// define variables
var isGameRunning = false;
var theWord;

var wins = 0;
var losses = 0;
var guessRemain;
var guessed;

var winText = document.getElementById("Wins");
var lossText = document.getElementById("Losses");
var guessRemainText = document.getElementById("Guesses-Remaining");
var lettersGuessedText = document.getElementById("Letters-Guessed");
var startGameText = document.getElementById("start-game")

// start or reset game - is the game running?
document.onkeypress = keyPressed;
function keyPressed(event){
  if (isGameRunning){
    playGame(event);
  }
  else {
    resetGame();
    startGameText.style.display = 'none';
  }
}
// function to start/reset the game.
function resetGame(){
  theWord = pickWord();
  console.log("theword = " + theWord);
  isGameRunning = true;
  guessRemain = theWord.length + 3;
  guessed = [];
  updateBlanks();
};

// function - choose a word randomly
function pickWord(){
  var index = Math.floor(Math.random() *  (words.length - 1));
  return words[index];
};

// game loop:

function playGame(event) {
  var guess = event.key.toLowerCase();

  if (checkIfGuessed(guess)) {
    alert("you've already guessed this: try again!");
  }
  else {
    guessed.push(guess);
    if (theWord.includes(guess)) {
      console.log("correct guess");
      updateBlanks();
      checkHasWon();
    }
    else {
      guessRemain --;
      if (guessRemain <= 0){
        losing();
      }
    }
  }
  updateScore();
}

// to call during game play, check if letter has been guessed previously
function checkIfGuessed(char) {
  return guessed.includes(char);
}

// replace blank space with all instances of the correct guess
function updateBlanks() {
  var wordArea = document.getElementById("word-area");
  wordArea.innerHTML = "";
  for (var i=0; i < (theWord.length); i++){
    var char = theWord.charAt(i);
    if (checkIfGuessed(char)){
      wordArea.innerHTML += " " + char;
    }
    else {
      wordArea.innerHTML += " _";
    }
  }
}

// to determine if winning.
function checkHasWon() {
  for (var i=0; i < (theWord.length); i++){
    var char = theWord.charAt(i);
    if (!checkIfGuessed(char)){
      return false;
    }
  }
  winning();
}

// update the guessed words section of HTML page
function updateGuessedWords(newGuess) {
  lettersGuessedText.innerHTML + newGuess;
}

// set an alert for winning
function winning() {
  wins ++;
  alert("You won!");
  resetGame();
}

function losing(){
  losses ++;
  alert("You wouldn't last a minute in my kitchen if you can't make " + theWord + "!");
  resetGame();
}

function updateScore(){
  winText.innerHTML = "Wins: " + wins;
  lossText.innerHTML = "Losses: " + losses;
  guessRemainText.innerHTML = "Guesses Remaining: " + guessRemain;
  lettersGuessedText.innerHTML = "Letters Guessed: " + guessed;
}
