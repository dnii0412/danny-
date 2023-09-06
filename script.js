const bird = document.getElementById("bird");
const pipesContainer = document.getElementById("pipes");
const scoreDisplay = document.getElementById("score");
let gravity = 0.5;
let velocity = 0;
let position = 100;
let isGameOver = false;
let score = 0;

function jump() {
    if (!isGameOver) {
        velocity = -10;
    }
}

function gameLoop() {
    if (!isGameOver) {
        velocity += gravity;
        position += velocity;
        
        // Keep the bird within the game container
        if (position > 560) {
            position = 560;
        }
        
        bird.style.bottom = position + "px";

        // Move pipes
        const pipes = document.querySelectorAll(".pipe");
        pipes.forEach(pipe => {
            const pipeLeft = parseFloat(pipe.style.left);
            pipe.style.left = (pipeLeft - 2) + "px";

            // Check for collision
            if (
                pipeLeft <= 50 && pipeLeft >= 10 &&
                (position <= parseFloat(pipe.style.top) || position >= parseFloat(pipe.style.top) + 150)
            ) {
                gameOver();
            }

            // Pass a pipe and update score
            if (pipeLeft < -60) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }
        });

        requestAnimationFrame(gameLoop);
    }
}

function spawnPipe() {
    const pipeTopHeight = Math.floor(Math.random() * 200) + 50;
    const pipeBottomHeight = 600 - pipeTopHeight - 200;

    const pipe = document.createElement("div");
    pipe.className = "pipe";
    pipe.style.height = "200px";
    pipe.style.width = "50px";
    pipe.style.position = "absolute";
    pipe.style.left = "400px";
    pipe.style.top = "0";
    pipe.style.backgroundColor = "green";

    const pipeTop = document.createElement("div");
    pipeTop.style.height = pipeTopHeight + "px";
    pipeTop.style.width = "50px";
    pipeTop.style.backgroundColor = "green";

    const pipeBottom = document.createElement("div");
    pipeBottom.style.height = pipeBottomHeight + "px";
    pipeBottom.style.width = "50px";
    pipeBottom.style.backgroundColor = "green";

    pipe.appendChild(pipeTop);
    pipe.appendChild(pipeBottom);

    pipesContainer.appendChild(pipe);
}

function gameOver() {
    isGameOver = true;
    scoreDisplay.textContent = `Game Over - Score: ${score}`;
}

document.addEventListener("keydown", jump);
gameLoop();
setInterval(spawnPipe, 2500);


const jumpSound = new Audio('jump.mp3');
const collisionSound = new Audio('collision.mp3');

function jump() {
    if (!isGameOver) {
        velocity = -10;
        jumpSound.play();
    }
}

function gameOver() {
    isGameOver = true;
    collisionSound.play();
    // Rest of the code...
}

function restartGame() {
  isGameOver = false;
  pipesContainer.innerHTML = "";
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  position = 300;
  velocity = 0;
  bird.style.bottom = position + "px";
  gameLoop();
}

document.addEventListener("keydown", event => {
  if (event.keyCode === 32 && isGameOver) {
      restartGame();
  }
});
