const xClass = "x"
const oClass = "o"
const WinningCombinations = [
  //Horizontal Wins
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Vertical Wins
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagonal Wins
  [0, 4, 8],
  [2, 4, 6]
]

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board")
const winningMessageElement = document.getElementById("message")
const restartBtn = document.getElementById("restartBtn")
const winningMessage = document.querySelector("[data-winning-message]")
let oTurn;

startGame()

restartBtn.addEventListener("click", startGame)

function startGame() {
  let oTurn = false

  cellElements.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(oClass)
    cell.addEventListener("click", handleClick, {once: true})
  })

  setBoardHover()
  winningMessageElement.classList.remove("show")
}

function handleClick(event) {
  const cell = event.target
  const currentClass = oTurn ? oClass : xClass

  placeMark(cell, currentClass)

  if(checkWin(currentClass)) {
    endGame(false)
  } else if(isDraw()) {
    endGame(true)
  }

  switchTurns()
  setBoardHover()
}

function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!"
  } else {
    winningMessage.innerText = `${oTurn ? "Player O" : "Player X"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function switchTurns() {
  oTurn = !oTurn
}

function setBoardHover() {
  board.classList.remove(xClass)
  board.classList.remove(oClass)

  return oTurn ? board.classList.add(oClass) : board.classList.add(xClass)
}

function checkWin(currentClass) {
  return WinningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}