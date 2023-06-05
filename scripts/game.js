
function startNewGame() {

  gameAreaElement.classList.remove('disabled');
  document.getElementById('game-messaging').classList.remove('hidden');
  document.getElementById('game-intro').classList.add('hidden');
  switchGamePlayButton();
  playerTurnMessage();

  for (let i = 0; i < 9; i++) {
    document.querySelectorAll('#game-board li')[i].addEventListener('click', updateGameTile);
  }


}

function updateGameTile(event) {
  const selectedColumn = event.target.dataset.col - 1;
  const selectedRow = event.target.dataset.row - 1;

  // Determine which tile was clicked
  // If empty, add the current player's game piece
  if (!event.target.textContent) {
    event.target.textContent = allPlayersNames[currentPlayer].gamepiece;
    playerNum = currentPlayer + 1;

    this.classList.add("player-" + playerNum);
    this.classList.add("disabled");

    gameData[selectedRow][selectedColumn] = playerNum;
    console.log("Current player is player " + playerNum);
  }

  // Track how many turns in case of draw
  numberOfTurns++;
  console.log("number of turns: " + numberOfTurns);
  // Track which tiles have a game piece
  let winnerFlag = checkForTicTacToe();
  console.log("winnerFlag: " + winnerFlag);

  // Switch to other player's turn
  if (winnerFlag === 0) {
    if (numberOfTurns <= 8) {
      switchPlayerTurn();
      playerTurnMessage();
    } else {
      weHaveADraw();
      gameDrawMessage();
      console.log("Number of turns is: " + numberOfTurns + " it's a Draw!");
      enableRestartButton();
    }
  } else {
    weHaveAWinner();
    enableRestartButton();
  }
}

function switchPlayerTurn() {
  if (currentPlayer === 0) {
    currentPlayer = 1;
  } else {
    currentPlayer = 0;
  }
  // playerTurnMessage();
}

function switchGamePlayButton() {
  playButtonElement.removeAttribute('class');
  playButtonElement.classList.add('active');
  playButtonElement.textContent = 'New game';
}

function checkForTicTacToe() {

  // check if rows are occupied by same player
  for (let i = 0; i <= 2; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      console.log("row: " + i);
      return gameData[i][0];
    }
  }

  // check if columns are occupied by same player
  for (let i = 0; i <= 2; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      console.log('column: ' + i);
      return gameData[0][i];
    }
  }

  // diagonals
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    console.log('diagonal 0, 0 to 2, 2');
    return gameData[0][0];
  }

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[0][2] &&
    gameData[1][1] === gameData[0][2]
  ) {
    console.log("diagonal 2, 0 to 0, 2");
    return gameData[2][0];
  }

  return 0; // no tic tac toe

}

function weHaveAWinner() {

  // set up proper messaging
  document.getElementById('game-messaging').classList.remove('hidden');
  document.getElementById('game-over').classList.remove('hidden');
  document.getElementById('turn-message').classList.add('hidden');
  document.getElementById('winner-message').classList.remove('hidden');
  document.getElementById('winner-name').textContent = allPlayersNames[currentPlayer].name;

  // stop further interaction with game board
  for (let i = 0; i < 9; i++) {
    document.querySelectorAll('#game-board li')[i].removeEventListener('click', updateGameTile);
    // document.querySelectorAll('#game-board li')[i].classList.add('disabled');
  }
}

function weHaveADraw() {
  // set up proper messaging
  document.getElementById('game-messaging').classList.remove('hidden');
  document.getElementById('game-over').classList.remove('hidden');
  document.getElementById('turn-message').classList.add('hidden');

  // stop further interaction with game board
  for (let i = 0; i < 9; i++) {
    document
      .querySelectorAll("#game-board li")
    [i].removeEventListener("click", updateGameTile);
    // document.querySelectorAll('#game-board li')[i].classList.add('disabled');
  }
}

function playerTurnMessage() {
  document.getElementById('game-messaging').removeAttribute('class');
  document.getElementById('game-messaging').classList.add('player-' + parseInt(currentPlayer + 1));
  document.getElementById('active-player-name').textContent = allPlayersNames[currentPlayer].name;
  document.getElementById('draw-message').classList.add('hidden');
}

function gameDrawMessage() {
  document.getElementById('game-messaging').removeAttribute('class');
  document.getElementById('winner-message').classList.add('hidden');
  document.getElementById('draw-message').classList.remove('hidden');
  document.getElementById('draw-message').textContent = "It’s a draw!"
}

function enableRestartButton() {
  playButtonElement.removeAttribute('class');
  playButtonElement.classList.remove("disabled");
  //   playersReady = true;
  playButtonElement.removeEventListener('click', startNewGame);
  playButtonElement.addEventListener("click", restartGame);
  // console.log('enableRestartButton enabled!');
}

function restartGame() {

  console.log('restartGame invoked');

  // reset variables to original values
  winnerFlag = 0;
  console.log('winnerFlag = ' + winnerFlag);
  currentPlayer = 0;
  numberOfTurns = 0;
  console.log('number of turns = ' + numberOfTurns);

  // clear and reset the game data 
 for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    gameData[i][j] = 0;
  }
 }

 // clear and reset game board
  for (let i = 0; i < 9; i++) {
    document.querySelectorAll('#game-board li')[i].removeAttribute('class');
    document.querySelectorAll('#game-board li')[i].textContent = '';
    console.log(document.querySelectorAll('#game-board li')[i]);
    document.querySelectorAll('#game-board li')[i].addEventListener('click', updateGameTile);
  }

  // reset the messaging area
  gameAreaElement.classList.remove('disabled');
  document.getElementById('game-over').removeAttribute('class');
  document.getElementById('game-over').classList.add('hidden');
  document.getElementById('game-messaging').classList.remove('hidden');
  document.getElementById('turn-message').removeAttribute('class');
  playerTurnMessage();

  // toggle play button to restart
  switchGamePlayButton();

}