const overlayElement = document.getElementById('overlay');
const formElement = document.getElementById('form-player-name');
const playerInputElement = document.getElementById('username-input-field');
const submitButtonElement = document.querySelector('button[type=submit]');
const cancelButtonElement = document.querySelector('button[type="button"]');
const errorOutputElement = document.getElementById('config-errors');
const gameAreaElement = document.getElementById('game-board');
const playButtonElement = document.getElementById("play-button");
let currentPlayer = 0;
let numberOfTurns = 0;
const allPlayersNames = [
    {
        name: '',
        gamepiece: 'x'
    },
    {
        name: '',
        gamepiece: 'o'
    }
];
const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

// loop through player name add/edit elements
for (i = 0; i <= 1; i++) {
    document.querySelectorAll('#player-controls h3')[i].addEventListener('click', showOverlay)
}

cancelButtonElement.addEventListener('click', hideOverlay);
formElement.addEventListener('submit', savePlayerInfo);

