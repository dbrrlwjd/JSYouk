var canvasW = 1000, canvasH = 600 * 0.9;
var vx = 0, vy = 0, vel = 5, planeSize = 100;
var r_left, r_up, r_right, r_down;
var fire = 0;
var arrRocket = [];
var arrEnemy = [];
var sType = 0;
const v_main = document.getElementsByClassName('main')[0];
const v_player = document.getElementById('player');
let v_enemy, v_rocket;

function hitRect(tc, pc) {
    var x0 = tc.x;
    var x1 = tc.x + 100;
    var y0 = tc.y;
    var y1 = tc.y + 100;

    var a0 = pc.x;
    var a1 = pc.x + pc.w;
    var b0 = pc.y;
    var b1 = pc.y + pc.h;

    return (x0 < a1 && x1 > a0 && y0 < b1 && y1 > b0)
}

function hitArc(tc, pc) {
    var x = tc.x - pc.x;
    var y = tc.y - pc.y;
    var distance = Math.sqrt(x * x + y * y);
    return (tc.r + pc.r > distance)
}

function hit(ppt, ptr) {
    var x0 = ptr.x;
    var x1 = ptr.x + ptr.w;
    var y0 = ptr.y;
    var y1 = ptr.y + ptr.h;

    if (ppt.x + ppt.r > x0 && ppt.x - ppt.r < x1 && ppt.y + ppt.r > y0 && ppt.y - ppt.r < y1) {
        if ((ppt.x > x0 && ppt.x < x1) || (ppt.y > y0 && ppt.y < y1)) {
            return true;
        }
        if (phit(x0, y0, ppt)) { return true; }
        if (phit(x0, y1, ppt)) { return true; }
        if (phit(x1, y0, ppt)) { return true; }
        if (phit(x1, y1, ppt)) { return true; }
    } else { return false; }
}

function phit(px, py, pc) {
    var x = px - pc.x;
    var y = py - pc.y;
    var distance = Math.sqrt(x * x + y * y);

    if (distance < pc.r) {
        return true;
    } else { return false; }
}

function collisionShip() {
    let bBoxShip = { x: vx, y: vy + 200, w: planeSize, h: planeSize }

    for (var i = 0; i < arrEnemy.length; i++) {
        if (hitRect(arrEnemy[i], bBoxShip)) {
            v_enemy = document.getElementsByClassName('enemy')[i];
            v_enemy.firstChild.src = "../resources/images/explosion.png";
            setTimeout(f_deleteEntity, 500, v_enemy, arrEnemy, i);
        }
    }
}

function collisionRocket() {
    for (var i = 0; i < arrEnemy.length; i++) {
        for (var j = 0; j < arrRocket.length; j++) {
            if (hitRect(arrEnemy[i], arrRocket[j])) {
                v_rocket = document.getElementsByClassName('rocket')[j];
                arrRocket.splice(j, 1);
                v_rocket.remove();

                arrEnemy[i].hit -= 1;
                if (arrEnemy[i].hit === 0) {
                    v_enemy = document.getElementsByClassName('enemy')[i];
                    v_enemy.firstChild.src = "../resources/images/explosion.png";
                    setTimeout(f_deleteEntity, 500, v_enemy, arrEnemy, i);
                }
            }
        }
    }
}

function createEnemy() {
    arrEnemy.push({
        x: canvasW,
        y: Math.floor(Math.random() * (canvasH - 100)),
        v: Math.floor(Math.random() * 2) + 1,
        hit: Math.floor(Math.random() * 10) + 1
    })

    f_createEntity("../resources/images/Meteor-Asteroid-PNG-Image.png", 'enemy', arrEnemy);
}

function updateEnemy() {
    for (var i = 0; i < arrEnemy.length; i++) {
        v_enemy = document.getElementsByClassName('enemy')[i];
        arrEnemy[i].x -= arrEnemy[i].v;
        v_enemy.style.left = arrEnemy[i].x + 'px';
    }
}

function deleteEnemy() {
    for (var i = 0; i < arrEnemy.length; i++) {
        if (arrEnemy[i].x < -planeSize) {
            v_enemy = document.getElementsByClassName('enemy')[i];
            f_deleteEntity(v_enemy, arrEnemy, i);
        }
    }
}

function createRocket() {
    let rocketCnt = 0;
    if (fire) {
        if (sType != 1) {
            arrRocket.push({ x: vx + 100, y: vy + 200, w: 100, h: 100, v: 10 })
            rocketCnt++;
        }
        if (sType > 0) {
            arrRocket.push({ x: vx + 55, y: vy - 8, w: 5, h: 4, v: 10 })
            arrRocket.push({ x: vx + 55, y: vy + 4, w: 5, h: 4, v: 10 })
            rocketCnt += 2;
        }
        if (sType > 1) {
            arrRocket.push({ x: vx + 45, y: vy - 10, w: 5, h: 4, v: 10 })
            arrRocket.push({ x: vx + 45, y: vy + 6, w: 5, h: 4, v: 10 })
            rocketCnt += 2;
        }
        if (sType > 2) {
            arrRocket.push({ x: vx + 37, y: vy - 18, w: 5, h: 4, v: 10 })
            arrRocket.push({ x: vx + 37, y: vy + 14, w: 5, h: 4, v: 10 })
            rocketCnt += 2;
        }

        for (let i = 0; i < rocketCnt; i++) {
            f_createEntity("../resources/images/shot.png", "rocket", arrRocket);
        }
    }
}

function updateRocket() {
    for (var i = 0; i < arrRocket.length; i++) {
        v_rocket = document.getElementsByClassName('rocket')[i];
        arrRocket[i].x += arrRocket[i].v;
        v_rocket.style.left = arrRocket[i].x + 'px';
    }
}

function deleteRocket() {
    for (var i = 0; i < arrRocket.length; i++) {
        if (arrRocket[i].x > canvasW) {
            v_rocket = document.getElementsByClassName('rocket')[i];
            f_deleteEntity(v_rocket, arrRocket, i);
        }
    }
}

function movePlane() {
    if (r_left) {
        vx -= vel;
        v_player.style.left = vx + 'px';
    }
    if (r_up) {
        vy -= vel;
        v_player.style.top = vy + 'px';
    }
    if (r_right) {
        vx += vel;
        v_player.style.left = vx + 'px';
    }
    if (r_down) {
        vy += vel;
        v_player.style.top = vy + 'px';
    }

    if (vx - vel < 0) { vx = vel; }
    if (vy < -(canvasH / 2) + planeSize) { vy = 0 - (canvasH / 2) + planeSize; }
    if (vx + planeSize + vel > canvasW) { vx = canvasW - planeSize - vel; }
    if (vy > (canvasH / 2) - (planeSize / 2)) { vy = (canvasH / 2) - (planeSize / 2); }
}

function f_createEntity(src, className, arr, w = 100, h = 100) {
    let v_div = document.createElement('div');
    let v_img = document.createElement('img');
    v_img.src = src;
    v_img.width = w;
    v_img.height = h;
    v_div.appendChild(v_img);
    v_div.classList.add(className);
    v_div.style.left = (arr[arr.length - 1].x) + 'px';
    v_div.style.top = (arr[arr.length - 1].y) + 'px';
    v_main.appendChild(v_div);
}

function f_deleteEntity(entity, arr, i) {
    arr.splice(i, 1);
    entity.remove();
}

function gameLoop() {
    movePlane();

    updateEnemy();
    deleteEnemy();

    updateRocket();
    deleteRocket();

    collisionRocket();
    collisionShip();
}

function init() {
    setInterval(createEnemy, 1000);
    setInterval(createRocket, 300);
    setInterval(gameLoop, 33);
}

function setKey(event) {
    if (event.keyCode === 37) { r_left = 1; }
    if (event.keyCode === 38) { r_up = 1; }
    if (event.keyCode === 39) { r_right = 1; }
    if (event.keyCode === 40) { r_down = 1; }

    if (event.keyCode === 32) { fire = 1; }
}

function stopKey(event) {
    if (event.keyCode === 37) { r_left = 0; }
    if (event.keyCode === 38) { r_up = 0; }
    if (event.keyCode === 39) { r_right = 0; }
    if (event.keyCode === 40) { r_down = 0; }

    if (event.keyCode === 32) { fire = 0; }
}

document.onkeydown = setKey;
document.onkeyup = stopKey;