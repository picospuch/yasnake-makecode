/// types
let list :Array<Sprite> = [];

class location {
    x :number;
    y :number;
}

enum direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

let head :location = new location(),
    tail :location = new location(),
    body :Array<location> = [],
    food :location = new location();

let n :number = 6;
let d :direction = direction.RIGHT;

/// functions
function main () {
    p.listenToEvent();

    //opening();
    init_run();
    
    (function while_true_loop_with_delay() {
        setInterval(function () {
            dir_select();
            run();
            draw();
            judge();
        }, 100)
    })();
}

function opening() {
    scene.setBackgroundColor(p.color.BACKGROUND)
    for (let i = 0; i < 10; ++i) {
        if (i % 2 == 0) {
            p.setcolor(p.color.PURPLE);
        } else {
            p.setcolor(p.color.WHITE);
        }
        p.outtextxy(i, 0, "@");
    }
}

function init_run () {
    p.setcolor(p.color.GREEN);
    
    for (let i = 0; i< n; ++i) {
        body.push(new location());
    }
    head.x = n;
    head.y = 0;

    for (let i = 0; i < n; ++i) {
        body[i].x = n - i -1;
        body[i].y = 0;
    }

    tail.x = -1;
    tail.y = 0;

    d = direction.RIGHT;

    p.outtextxy(0, 0, "*******");

    fod(); 
}

function dir_select () {
    if (p.scancode == ControllerButton.Up && d != direction.DOWN) {
        d = direction.UP;
    } else if (p.scancode == ControllerButton.Down && d != direction.UP) {
        d = direction.DOWN;
    } else if (p.scancode == ControllerButton.Left && d != direction.RIGHT) {
        d = direction.LEFT;
    } else if (p.scancode == ControllerButton.Right && d != direction.LEFT) {
        d = direction.RIGHT;
    }
}

function run () {
    tail.x = body[n - 1].x;
    tail.y = body[n - 1].y;

    for (let i = n - 1; i > 0; --i) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y;
    }

    body[0].x = head.x;
    body[0].y = head.y;

    switch (d) {
        case direction.UP:
        head.y -= 1; break;
        case direction.DOWN:
        head.y += 1; break;
        case direction.LEFT:
        head.x -= 1; break;
        case direction.RIGHT:
        head.x += 1; break;
    }

    if (head.x == 20) head.x = 0;
    else if (head.y == 15) head.y = 0;
    else if (head.x == -1) head.x = 19;
    else if (head.y == -1) head.y = 14;
}

function draw () {
    p.setcolor(p.color.BACKGROUND);
    p.outtextxy(tail.x, tail.y, "_");

    p.setcolor(p.color.GREEN);
    p.outtextxy(head.x, head.y, "*");
}

function judge () {
    if (head.x == food.x && head.y == food.y) {
        body.push(new location());
        n = body.length;

        fod();
    }

}

let fod_char :string = "@";
let fod_string :string = "硬禾学堂";
function fod () {
    food.x = Math.randomRange(0, 19);
    food.y = Math.randomRange(0, 14);

    p.setcolor(p.color.PURPLE);
    p.outtextxy(food.x, food.y, fod_string.charAt((n - 6) % 4));
}


function closing () {

}

function update_shift_status () {

}

main();


