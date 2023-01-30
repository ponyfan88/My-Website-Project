const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
);

function onScreenCoord(x) {
    return x * h;
}

const SIZE = 9;

var changedDirection = false;

var container;

var food = new Array(SIZE);
var snake = new Array(SIZE);

var tail = [
    {
        x: 4,
        y: 4,
    },
];

var playerx = 5;
var playery = 4;

function reset() {
    changedDirection = false;

    food = new Array(SIZE);
    snake = new Array(SIZE);

    playerx = 4;
    playery = 4;

    tail = [
        {
            x: 4,
            y: 4,
        },
        {
            x: 4,
            y: 4,
        }
    ];
    
    container = document.getElementById("container");

    setup();

    randomFood();

    display();

    frame();
}

function start() {
    container = document.getElementById("container");

    for (var y = 0; y < SIZE; y++) {
        for (var x = 0; x < SIZE; x++) {
            var div = document.createElement("div");
            div.innerHTML = '<div id="' + y + "," + x + '"></div>';
            container.appendChild(div);
        }
    }
}

function setup() {
    for (var y = 0; y < SIZE; y++) {
        food[y] = new Array(SIZE).fill(0);
        snake[y] = new Array(SIZE).fill(0);
    }

    snake[4][4] = 1;

    direction = 4;
    inputDirection = 4;
}

document.addEventListener("DOMContentLoaded", function () {
    start();
    kill();
    frame();
});

function color(x, y, color) {
    document.getElementById(y + "," + x).className = color;
}

function randomFood() {
    var y = Math.floor(Math.random() * SIZE);
    var x = Math.floor(Math.random() * SIZE);
    if (snake[y][x] == 1) {
        randomFood();
    } else {
        food[y][x] = 1;
    }
}

var direction = 4;
var inputDirection = 4;

function display() {
    for (var y = 0; y < SIZE; y++) {
        for (var x = 0; x < SIZE; x++) {
            if (food[y][x] == 1) {
                color(x, y, "food");
            } else if (snake[y][x] == 1) {
                color(x, y, "snake");
            } else {
                color(x, y, "");
            }
        }
    }

    color(playerx, playery, "super");
}

var full = false;

function tick() {
    /*
  DIRECTION
     0
   3 + 1
     2
  */

    direction = inputDirection;
    
    full = false;

    if (direction == 1) {
        if (playerx + 1 >= SIZE) {
            kill();
            return;
        }

        if (snake[playery][playerx + 1] == 1) {
            kill();
            return;
        }

        snake[playery][playerx + 1] = 1;

        if (food[playery][playerx + 1] == 1) {
            full = true;
            food[playery][playerx + 1] = 0;
        }

        playerx++;
    } else if (direction == 2) {
        if (playery + 1 >= SIZE) {
            kill();
            return;
        }

        if (snake[playery + 1][playerx] == 1) {
            kill();
            return;
        }

        snake[playery + 1][playerx] = 1;

        if (food[playery + 1][playerx] == 1) {
            full = true;
            food[playery + 1][playerx] = 0;
        }

        playery++;
    } else if (direction == 3) {
        if (playerx - 1 < 0) {
            kill();
            return;
        }

        if (snake[playery][playerx - 1] == 1) {
            kill();
            return;
        }

        snake[playery][playerx - 1] = 1;

        if (food[playery][playerx - 1] == 1) {
            full = true;
            food[playery][playerx - 1] = 0;
        }

        playerx--;
    } else if (direction == 0) {
        if (playery - 1 < 0) {
            kill();
            return;
        }

        if (snake[playery - 1][playerx] == 1) {
            kill();
            return;
        }

        snake[playery - 1][playerx] = 1;

        if (food[playery - 1][playerx] == 1) {
            full = true;
            food[playery - 1][playerx] = 0;
        }

        playery--;
    }

    tail.push({
        x: playerx,
        y: playery,
    });

    if (!full) {
        snake[tail[0].y][tail[0].x] = 0;
        tail.shift();
    }

    if (full) {
        randomFood();
    }

    changedDirection = false;

    display();
}

function kill() {
    killed = true;
}

var killed = false;

var delta = 0;

function frame() {
    delta++;

    if (delta > 15) {
        tick();
        delta = 0;
    }

    if (killed) {
        killed = false;
        reset();
        return;
    }

    requestAnimationFrame(frame);
}

document.addEventListener("keydown", function (e) {
    e = e || window.event;

    if (changedDirection) {
        return;
    }
    if (e.keyCode == "38" || e.keyCode == "87") {
        // up arrow
        if (direction != 2) {
            inputDirection = 0;
            changedDirection = true;
        }
    } else if (e.keyCode == "40" || e.keyCode == "83") {
        // down arrow
        if (direction != 0) {
            inputDirection = 2;
            changedDirection = true;
        }
    } else if (e.keyCode == "37" || e.keyCode == "65") {
        // left arrow
        if (direction != 1) {
            inputDirection = 3;
            changedDirection = true;
        }
    } else if (e.keyCode == "39" || e.keyCode == "68") {
        // right arrow
        if (direction != 3) {
            inputDirection = 1;
            changedDirection = true;
        }
    }
});
