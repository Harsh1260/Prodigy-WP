const board = document.getElementById('board')
const squares = document.getElementsByClassName('square')
const players = ['X', 'O']
let currentPlayer = players[0]
const endMessage = document.createElement('h2')
endMessage.textContent = `X's turn!`
endMessage.style.marginTop = '30px'
endMessage.style.textAlign = 'center'
board.after(endMessage)

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let aiEnabled = true
const restartButton = document.getElementById('restartButton')
const toggleModeButton = document.getElementById('toggleModeButton')

restartButton.addEventListener('click', restartGame)
toggleModeButton.addEventListener('click', toggleMode)

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', handleClick)
}

function handleClick(event) {
    const square = event.target
    if (square.textContent !== '' || endMessage.textContent.includes('wins') || endMessage.textContent.includes('tied')) {
        return
    }
    square.textContent = currentPlayer
    if (checkWin(currentPlayer)) {
        endMessage.textContent = `Game over! ${currentPlayer} wins!`
        highlightWinningSquares(currentPlayer)
        return
    }
    if (checkTie()) {
        endMessage.textContent = 'Game is tied!'
        return
    }
    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0]
    endMessage.textContent = `${currentPlayer}'s turn!`
    if (aiEnabled && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500)
    }
}

function checkWin(currentPlayer) {
    return winning_combinations.some(combination => {
        return combination.every(index => {
            return squares[index].textContent === currentPlayer
        })
    })
}

function checkTie() {
    return [...squares].every(square => {
        return square.textContent !== ''
    })
}

function highlightWinningSquares(currentPlayer) {
    winning_combinations.forEach(combination => {
        if (combination.every(index => squares[index].textContent === currentPlayer)) {
            combination.forEach(index => {
                squares[index].classList.add('winning-square')
            })
        }
    })
}

function restartGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = ''
        squares[i].classList.remove('winning-square')
    }
    endMessage.textContent = `X's turn!`
    currentPlayer = players[0]
}

function makeAIMove() {
    const availableSquares = [...squares].filter(square => square.textContent === '')
    if (availableSquares.length === 0) return
    const randomSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)]
    randomSquare.textContent = currentPlayer
    if (checkWin(currentPlayer)) {
        endMessage.textContent = `Game over! ${currentPlayer} wins!`
        highlightWinningSquares(currentPlayer)
        return
    }
    if (checkTie()) {
        endMessage.textContent = 'Game is tied!'
        return
    }
    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0]
    endMessage.textContent = `${currentPlayer}'s turn!`
}

function toggleMode() {
    aiEnabled = !aiEnabled
    toggleModeButton.value = aiEnabled ? "Play with AI" : "Play with Player"
    restartGame()
}
