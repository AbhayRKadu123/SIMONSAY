// script.js

const colors = ['red', 'blue', 'green', 'yellow'];
let gameSequence = [];
let userSequence = [];
let level = 0;
let gameStarted = false;

const colorButtons = document.querySelectorAll('.color-button');
const startButton = document.getElementById('start');
const messageElement = document.getElementById('message');

function startGame() {
    level = 0;
    gameSequence = [];
    userSequence = [];
    gameStarted = true;
    messageElement.textContent = '';
    nextSequence();
}

function nextSequence() {
    userSequence = [];
    level++;
    messageElement.textContent = `Level ${level}`;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    playSequence();
}

function playSequence() {
    let index = 0;
    const interval = setInterval(() => {
        if (index >= gameSequence.length) {
            clearInterval(interval);
            enableUserInput();
            return;
        }
        const color = gameSequence[index];
        activateButton(color);
        index++;
    }, 1000);
}

function activateButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

function enableUserInput() {
    colorButtons.forEach(button => {
        button.addEventListener('click', handleColorClick);
    });
}

function disableUserInput() {
    colorButtons.forEach(button => {
        button.removeEventListener('click', handleColorClick);
    });
}

function handleColorClick(event) {
    const color = event.target.id;
    userSequence.push(color);
    activateButton(color);
    checkUserSequence();
}

function checkUserSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== gameSequence[i]) {
            endGame();
            return;
        }
    }
    if (userSequence.length === gameSequence.length) {
        disableUserInput();
        setTimeout(nextSequence, 1000);
    }
}

function endGame() {
    messageElement.textContent = 'Game Over!';
    gameStarted = false;
}

startButton.addEventListener('click', () => {
    if (!gameStarted) {
        startGame();
    }
});
