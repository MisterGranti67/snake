const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


const snakeSize = 50;
const gameSpeed = 200;

let score = 0;
let XPos = 0;
let YPos = 0;
let way = 1;
let queue = [{x: XPos, y: YPos}];
const rectanglesInRow = canvas.width / snakeSize;
const rectanglesInColumn = canvas.height / snakeSize;


document.getElementById("score").textContent = score.toString();

let pommeX;
let pommeY;
randompomme();


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.height, canvas.width);

ctx.fillStyle = ("black");
ctx.fillRect(XPos, YPos, snakeSize, snakeSize);
document.onkeydown = checkKey;

gameLoop()

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        if (way != 2) {
            way = 1;
        }
    } else if (e.keyCode == '40') {
        if (way != 1) {
            way = 2;
        }
    } else if (e.keyCode == '37') {
        if (way != 4) {
            way = 3;
        }
    } else if (e.keyCode == '39') {
        if (way != 3) {
            way = 4;
        }
    }
}

function gameLoop() {
    move();
    draw();
    setTimeout(gameLoop, gameSpeed);
}

function randompomme() {
    pommeX = Math.floor(Math.random() * rectanglesInRow) * snakeSize;
    pommeY = Math.floor(Math.random() * rectanglesInColumn) * snakeSize;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    drawGrid();

    drawqueue();

    rectangle("green", XPos, YPos, snakeSize, snakeSize);
    rectangle("red", pommeX, pommeY, snakeSize-2, snakeSize-2);

}

function drawqueue() {
    queue = queue.slice(-1 * (score + 1));
    for (let i = 0; i < queue.length; i++) {
        rectangle("green", queue[i].x, queue[i].y, snakeSize-2, snakeSize-2)
    }

}

function drawGrid() {
    for (let i = 0; i < rectanglesInRow; i++) {
        for (let j = 0; j < rectanglesInColumn; j++) {
            rectangle("grey", snakeSize * i, snakeSize * j, snakeSize - 2, snakeSize - 2);
        }
        rectangle("grey", snakeSize * i, 0, snakeSize - 2, snakeSize - 2);
    }
}

function rectangle(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function mort() {
    if (XPos < 0) {
        XPos = canvas.width - snakeSize;
    } else if (XPos > canvas.width - snakeSize) {
        XPos = 0;
    } else if (YPos < 0) {
        YPos = canvas.height - snakeSize;
    } else if (YPos > canvas.height - snakeSize) {
        YPos = 0;
    }

    pommeCollision()

    queueCollision()
}

function pommeCollision() {
    if (pommeX == XPos && pommeY == YPos) {
        randompomme();
        addScore();
    }
}

function queueCollision() {
    queue.forEach((item) => {
        if (item.x == XPos && item.y == YPos) {
            alert("gameover");
            resetGame();
        }
    })
}

function move() {
    if (way == 1) {
        YPos -= snakeSize;
    } else if (way == 2) {
        YPos += snakeSize;
    } else if (way == 3) {
        XPos -= snakeSize;
    } else if (way == 4) {
        XPos += snakeSize;
    }
    mort();

    queue.push({x: XPos, y: YPos});
}

function bords() {
    if(body[0].xPos < 0)
        body[0].xPos = width - 20;
    else if(body[0].xPos > width -20)
        body[0].xPos = 0;
    else if(body[0].yPos < 0)
        body[0].yPos = height - 20;
    else if(body[0].yPos > height -20)
        body[0].yPos = 0;
}

function grow(){
    var x = body[0].xPos;
    var y = body[0].yPos;
    body.unshift(new snake(x + xSpeed*20, y + ySpeed*20, 0));
}

function manger(){
    if(body[0].xPos == mouse.xPos && body[0].yPos == mouse.yPos){
        mouse = new pomme();
        score++;
        grow();
        body[1].type = 1;
    }
}

function addScore() {
    score++;
    document.getElementById("score").innerText = score.toString();
}

function resetGame() {
    location.reload();
}