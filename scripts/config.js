function showOverlay() {
  overlayElement.classList.remove("hidden");
  hideErrorMessage();

  whichPlayer = this.previousElementSibling.innerText;

  // customize overlay input label
  document.querySelector("#modal-window label").textContent = whichPlayer;

  // save player number
  playerNum = parseInt(whichPlayer.slice(-1));
  // console.log('Which player: ' + playerNum);

  // pre-populate with appropriate player name if it exists
  playerIndex = playerNum - 1;
  if (!allPlayersNames[playerIndex].name) {
    formElement.reset();
    submitButtonElement.textContent = "Add player";
  } else {
    playerInputElement.value = allPlayersNames[playerIndex].name;
    submitButtonElement.textContent = "Update";
  }

  // customize modal background image
  document.getElementById("modal-window").removeAttribute("class");
  document.getElementById("modal-window").classList.add("player-" + playerNum);
}

function hideOverlay() {
  overlayElement.classList.add("hidden");
}

function savePlayerInfo(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const playerNameInput = formData.get("username").trim(); // remove unnecessary whitespace

  whichPlayer = document.querySelector("#modal-window label").textContent;

  // save player number
  playerNum = parseInt(whichPlayer.slice(-1));

  // If valid input, update player name on gameboard
  if (!playerNameInput) {
    showErrorMessage();
  } else {
    hideErrorMessage();
    updatePlayerName(playerNameInput, playerNum);
    hideOverlay();
  }
}

function showErrorMessage() {
  playerInputElement.classList.add("error");
  errorOutputElement.textContent = "The player name can’t be blank";
}

function hideErrorMessage() {
  playerInputElement.classList.remove("error");
}

function updatePlayerName(playerName, playerNumber) {
  playerNameElement = "#player-" + playerNumber + " h3";
  document.querySelector(playerNameElement).innerText = playerName;
  document.querySelector(playerNameElement).classList.remove("blank-state");
  
  // pre-populate player's name
  allPlayersNames[playerNumber - 1].name = playerName;
  
  // enable play button if there are 2 players
  if (allPlayersNames[0].name != "" && allPlayersNames[1].name != "") {
    enableStartGameButton();
  }
}

function disableStartGameButton() {
  playButtonElement.classList.add("disabled");

}

function enableStartGameButton() {
  playButtonElement.removeAttribute('class');
  playButtonElement.classList.remove("disabled");

  playButtonElement.addEventListener("click", startNewGame);

}
