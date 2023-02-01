var sheet = document.getElementById("canvas");
var mouse = new food();
var body = [];
var xSpeed = 1, ySpeed = 0;
var animLoop = setInterval(draw, 100);
var score = 0;

function eventHandler(event) {
    var key = event.keyCode;

    if ((key == 65 || key == 37 || event == 'left') && xSpeed == 0) {
        xSpeed = -1;
        ySpeed = 0;
    } else if ((key == 68 || key == 39 || event == 'right') && xSpeed == 0) {
        xSpeed = 1;
        ySpeed = 0;
    } else if ((key == 83 || key == 40 || event == 'down') && ySpeed == 0){
        xSpeed = 0;
        ySpeed = -1;
    } else if ((key == 87 || key == 38 || event == 'up') && ySpeed == 0) {
        xSpeed = 0;
        ySpeed = -1;
    } else if (key == 32 && !pause) {
        clearInterval(animLoop);
        pause = true;
    } else if (key  == 32 && pause) {
        animLoop = setInterval(draw, 100);
        pause = true;
    }
}

function draw() {
    pen.fillStyle ="#000";
    pen.fellRect(0, 0, width, height);

    mouse.show();
    for (var i = 0; i < body.length; ++i)
        body[i].show()
    moveBy();
    eats();
    edges();
    die();
    // Plus tard le score
}

function die() {

}

function move() {

}

function edges() {

}

function grow(){
    var x = body[0].xPos;
    var y = body[0].yPos;
    body.unshift(new bodyPart(x + xSpeed*20, y + ySpeed*20, 0));
}

class snake {
    constructor(x, y, part){
        this.xPos = x;
        this.yPos = y;
        this.type = part;
    }

    show(){
        pen.fillStyle = this.type == 0 ? "#aaa" : "#ffffff";
        pen.strokeStyle = "#eee"
        pen.fillRect(this.xPos, this.yPos, 20, 20);
        pen.strokeRect(this.xPos, this.yPos, 20, 20);
    }
}

class pomme {
    constructor() {
        this.xPos = Math.floor(Math.random()*(width/20))*20;
        this.yPos = Math.floor(Math.random()*(height/20))*20;
    }

    show() {
        pen.fillStyle = "#999"
        pen.strokeStyle = "#aaa"
        pen.fillRect(this.xPos, this.yPos, 20, 20);
        pen.strokeRect(this.xPos, this.yPos, 20, 20);
    }
}