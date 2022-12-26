const canvas = document.getElementById("game-board")
const ctx = canvas.getContext("2d")
const canvasSize = 600
canvas.width = canvasSize
canvas.height = canvasSize
//
const size = 20
const mapLength = canvasSize / size
const direction = { x: 0, y: 0 }
const initialTail = [
  { x: 4, y: 4 },
  { x: 4, y: 4 },
  { x: 4, y: 4 },
  { x: 4, y: 4 },
]
let tail = [...initialTail]
let food = getRandomCoordForFood()
let score = 0

function getRandomNum() {
  return Math.floor(Math.random() * mapLength)
}

function isCoordOnSnake(x, y) {
  let isOnSnake = false

  tail.forEach((cell) => {
    if (cell.x === x && cell.y === y) {
      isOnSnake = true
    }
  })

  return isOnSnake
}

function getRandomCoordForFood() {
  const x = getRandomNum()
  const y = getRandomNum()

  if (isCoordOnSnake(x, y)) {
    return getRandomCoordForFood()
  } else {
    return { x, y }
  }
}

function drawGame() {
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = "red"
  ctx.fillRect(food.x * size, food.y * size, size, size)

  tail.forEach((cell) => {
    ctx.fillStyle = "green"
    ctx.strockeStyle = "#0f0f0f"

    ctx.fillRect(cell.x * size, cell.y * size, size, size)
    ctx.strokeRect(cell.x * size, cell.y * size, size, size)
  })

  ctx.font = "28px Arial"
  ctx.fillStyle = "white"
  ctx.fillText(score, 25, 25)
}

setInterval(() => {
  if (direction.x === 0 && direction.y === 0) {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = "28px Arial"
    ctx.fillStyle = "white"
    ctx.fillText("Press any arrow key", canvas.width / 3, canvas.height / 2)
    return
  }

  const newCell = {
    x: (mapLength + tail[tail.length - 1].x + direction.x) % mapLength,
    y: (mapLength + tail[tail.length - 1].y + direction.y) % mapLength,
  }

  if (newCell.x === food.x && newCell.y === food.y) {
    food = getRandomCoordForFood()
    score++
    tail.push(newCell)
  } else if (isCoordOnSnake(newCell.x, newCell.y)) {
    score = 0
    food = getRandomCoordForFood()
    tail = [...initialTail]
    direction.x = 0
    direction.y = 0
  } else {
    tail.shift()
    tail.push(newCell)
  }

  drawGame()
}, 1000 / 10)

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction.x = 0
      direction.y = -1
      break
    case "ArrowDown":
      direction.x = 0
      direction.y = 1
      break
    case "ArrowLeft":
      direction.x = -1
      direction.y = 0
      break
    case "ArrowRight":
      direction.x = 1
      direction.y = 0
      break
  }
})
