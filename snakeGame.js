
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const box = 20;
  let snake = [];
  snake[0] = { x: 9 * box, y: 10 * box };
  let food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
  };
  let score = 0;
  let direction = "";
  let speed = 200;
  let game;

  document.getElementById('levelSelect').addEventListener('change',setSpeed);
  function setSpeed() {
    let level = document.getElementById("levelSelect").value;
    clearInterval(game);

    if (level === "easy") {
        speed = 200;
    // Slow
    }
    else if(level === "medium"){
        speed = 150;
    // Faster than slow
    }
    else if(level === "hard") {
        speed = 100;
    // Very fast
    }

    game = setInterval(draw,speed)
  }

  document.addEventListener("keydown", changeDirection);
  function changeDirection(event) {
      if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
      else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
      else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
      else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
  }
  function collision(newHead, snake) {
      for (let k = 0; k < snake.length; k++) {
          if (newHead.x === snake[k].x && newHead.y === snake[k].y) {
              return true;
          }
      }
      return false;
  }
  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the snake
      for (let i = 0; i < snake.length; i++) {
          ctx.fillStyle = i === 0 ? "white" : "blue";
          ctx.fillRect(snake[i].x, snake[i].y, box, box);
          ctx.strokeStyle = "black";
          ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }
      // Draw the food
      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, box, box);
  // Snake hea\d coordinates
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;
      // Update the snake's direction
      if (direction === "LEFT") snakeX -= box;
      if (direction === "UP") snakeY -= box;
      if (direction === "RIGHT") snakeX += box;
      if (direction === "DOWN") snakeY += box;
      // If the snake eats food
      if (snakeX === food.x && snakeY === food.y) {
          score++;
          document.getElementById("score").textContent = `Score: ${score}`;
          food = {
              x: Math.floor(Math.random() * 19 + 1) * box,
              y: Math.floor(Math.random() * 19 + 1) * box,
          };
      } else {
          snake.pop();
      }
      let newHead = {
          x: snakeX,
          y: snakeY,
      };
      // Game over conditions
      if (
          snakeX < 0 || snakeY < 0 ||
          snakeX >= canvas.width || snakeY >= canvas.height ||
          collision(newHead, snake)
      ) {
          clearInterval(game);
          alert("Game Over!");
          
          window.location.reload();
      }
      // Add new head to the snake
      snake.unshift(newHead);
  }
  
  setSpeed();