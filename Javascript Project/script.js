const score = document.querySelector('.score');
const startscreen = document.querySelector('.startscreen');
const gamearea = document.querySelector('.gamearea');

let player = { start: false, speed: 13, score: 0 };
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;

}
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}
function moveLines() {
    let lines = document.querySelectorAll('.lines')
    lines.forEach(function (item) {
        if (item.y >= 450) {
            item.y -= 650;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function endGame() {
    player.start = false;
    startscreen.classList.remove('hide');
    gamearea.innerHTML = "";
    ab = player.score + 1;
    s=0;
    startscreen.innerHTML = "Game Over! <br> Your score is: " + ab + " <br>Click here to Restart";
}
var abc = 1;
let s = 0;
function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        if (isCollide(car, item)) {

            console.log("Boom Hit");
            endGame();
        }
        if (item.y > 450) {
            item.y = -650;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        if (s <= 300) {
            item.y += player.speed - 8;

            item.style.top = item.y + "px";
        }
        else if (s > 300 && s <= 1000) {
            item.y += player.speed - 5;

            item.style.top = item.y + "px";
        }
        else if (s > 1000 && s <= 2000) {
            item.y += player.speed - 5;

            item.style.top = item.y + "px";
        }
        else {
            item.y += player.speed;

            item.style.top = item.y + "px";
        }

        s++;
    })
}
startscreen.addEventListener('click', start);
function gameplay() {

    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();

    if (player.start) {

        moveLines();
        moveEnemy(car);
        if (keys.ArrowUp && player.y > 80) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 125)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 5) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 66)) {
            player.x += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        player.score++;
        score.innerText = "Score : " + player.score;
        window.requestAnimationFrame(gameplay);
    }
}
function start() {
    player.score = 0;
    gamearea.classList.remove('hide');
    startscreen.classList.add('hide');
    player.start = true;
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gamearea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for (let i = 0; i < 5; i++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (i * 150);
        roadLine.style.top = roadLine.y + "px";
        gamearea.appendChild(roadLine);
    }
    for (let i = 0; i < 3; i++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        // enemyCar.style.background = " blue";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        enemyCar.y = ((i) * 390) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        gamearea.appendChild(enemyCar);
    }
    window.requestAnimationFrame(gameplay);
}
