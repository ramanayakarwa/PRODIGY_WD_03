const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status-text');
const currentPlayerText = document.getElementById('current-player');
const restartButton = document.getElementById('restart-button');
const playerSetup = document.getElementById('player-setup');
const gameBoardContainer = document.getElementById('game-board-container');
const startGameButton = document.getElementById('start-game-button');

const playerXNameInput = document.getElementById('player-x-name');
const playerONameInput = document.getElementById('player-o-name');

let playerXName = 'Player X';
let playerOName = 'Player O';
let currentPlayer = 'X';
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game after setting player names
startGameButton.addEventListener('click', () => {
    playerXName = playerXNameInput.value.trim() || 'Player X';
    playerOName = playerONameInput.value.trim() || 'Player O';

    playerSetup.style.display = 'none';
    gameBoardContainer.style.display = 'block';

    startGame();
});

function startGame() {
    isGameActive = true;
    currentPlayer = 'X';
    updateStatusText();

    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}

function handleCellClick(e) {
    const cell = e.target;
    if (!isGameActive) return; // Prevent further moves after the game ends

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatusText();
    }
}

function updateStatusText() {
    statusText.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
}

function checkWin(player) {
    return winningCombinations.some(combination =>
        combination.every(index => cells[index].classList.contains(player))
    );
}

function isDraw() {
    return [...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'));
}

function endGame(draw) {
    isGameActive = false; // Stop the game
    statusText.textContent = draw
        ? "It's a Draw!"
        : `${currentPlayer === 'X' ? playerXName : playerOName} Wins!`;

    // Remove event listeners to disable further clicks
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

// Restart the game
restartButton.addEventListener('click', startGame);
