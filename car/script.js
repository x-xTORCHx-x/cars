const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const player2 = document.getElementById('player2');

let playerPosition = gameArea.clientWidth / 2 - 25;
let player2Position = gameArea.clientWidth / 2 - 25;
let objects = [];
let score = 0;
let gameOver = false;

function startGame() {
    document.addEventListener('keydown', movePlayers);
    createObject();
    setInterval(updateGame, 100);
}

function movePlayers(event) {
    // Movimentação do jogador 1
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 15;
    } else if (event.key === 'ArrowRight' && playerPosition < gameArea.clientWidth - 50) {
        playerPosition += 15;
    }

    // Movimentação do jogador 2
    if (event.key === 'a' && player2Position > 0) {
        player2Position -= 15;
    } else if (event.key === 'd' && player2Position < gameArea.clientWidth - 50) {
        player2Position += 15;
    }

    // Atualiza as posições dos jogadores
    player.style.left = playerPosition + 'px';
    player2.style.left = player2Position + 'px';
}

function createObject() {
    const object = document.createElement('div');
    object.classList.add('object');
    object.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    object.style.top = '0px';
    gameArea.appendChild(object);
    objects.push(object);

    setTimeout(createObject, 500);
}

function updateGame() {
    if (gameOver) return;

    objects.forEach((object, index) => {
        let objectPosition = parseInt(object.style.top);
        objectPosition += 70; // Speed of falling object
        object.style.top = objectPosition + 'px';

        // Collision detection
        if (
            objectPosition + 30 > gameArea.clientHeight - 50 && // object bottom
            parseInt(object.style.left) + 30 > player2Position && // object right
            parseInt(object.style.left) < player2Position + 50 // object left
        ) {
            gameOver = true;
            alert('Game Over! Your score: ' + score);
            window.location.reload(); // Reload the game
        }

        if (
            objectPosition + 30 > gameArea.clientHeight - 50 && // object bottom
            parseInt(object.style.left) + 30 > playerPosition && // object right
            parseInt(object.style.left) < playerPosition + 50 // object left
        ) {
            gameOver = true;
            alert('Game Over! Your score: ' + score);
            window.location.reload(); // Reload the game
        }

        // Remove objects that go out of the game area
        if (objectPosition > gameArea.clientHeight) {
            gameArea.removeChild(object);
            objects.splice(index, 1);
            score++;
        }
    });
}

startGame();
