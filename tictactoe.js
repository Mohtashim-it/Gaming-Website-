let currentPlayer = "X";  // X starts the game
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const gameBoard = document.querySelectorAll('.cell');
const message = document.getElementById('message');

gameBoard.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.id;

    if (board[clickedCellIndex] !== "" || !gameActive) {
        return;  // Ignore clicks on already-filled cells or if the game is over
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (isDraw()) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function isDraw() {
    return board.every(cell => cell !== "");
}

function resetGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    gameBoard.forEach(cell => (cell.textContent = ""));
    message.textContent = `Player ${currentPlayer}'s turn`;
}