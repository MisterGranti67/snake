var sheet = document.getElementById("canvas");


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