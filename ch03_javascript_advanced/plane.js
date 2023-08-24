var canvasW = 1000, canvasH = 600*0.9;
var vx = 0, vy = 0, vel = 5;
var r_left, r_up, r_right, r_down;
var fire = 0;
var arrRocket = [];
var arrEnemy = [];

function b2v(a, b) {
    return a+(b-a)*Math.random();
}

function hitRect(tc, pc) {
    var x0 = tc.x;
    var x1 = tc.x+tc.wh;
    var y0 = tc.y;
    var y1 = tc.y+tc.wh;

    var a0 = pc.x;
    var a1 = pc.x+pc.w;
    var b0 = pc.y;
    var b1 = pc.y+pc.h;

    return (x0 < a1 && x1 > a0 && y0 < b1 && y1 > b0)
}

function hitArc(tc, pc) {
    var x = tc.x-pc.x;
    var y = tc.y-pc.y;
    var distance = Math.sqrt(x*x+y*y);
    return (tc.r+pc.r>distance)
}

function hit(ptr, ppt) {
    var x0 = ptr.x;
    var x1 = ptr.x+ptr.wh;
    var y0 = ptr.y;
    var y1 = ptr.y+ptr.wh;

    if (ppt.x+ppt.r>x0 && ppt.x-ppt.r<x1 && ppt.y+ppt.r>y0 && ppt.y-ppt.r<y1) {
        if ((ppt.x>x0 && ppt.x<x1) || (ppt.y>y0 && ppt.y<y1)) {
            return true;
        }
        if (phit(x0, y0, ppt)) { return true; }
        if (phit(x0, y1, ppt)) { return true; }
        if (phit(x1, y0, ppt)) { return true; }
        if (phit(x1, y1, ppt)) { return true; }
    } else { return false; }
}

function phit(px, py, pc) {
    var x = px-pc.x;
    var y = py-pc.y;
    var distance = Math.sqrt(x*x+y*y);
    
    if (distance < pc.r) {
        return true;
    } else { return false; }
}

function collisionShip() {
    /*
    if (sType===3) {
        var bBoxShip = {x: sx - 10, y:sy - 20, w: 40, h: 40}
    }
    else {
        var bBoxShip = {x: sx - 10, y:sy - 7, w: 40, h: 14}
    }

    for (var i=0;i<arrEnemy.length;i++) {
        if (hitRect(arrEnemy[i], bBoxShip)) {
            explosion = new Audio("sound/explosion.mp3");
            explosion.volume = 0.1;            
            explosion.play();
            createParticle(arrEnemy[i]);
            arrEnemy.splice(i, 1);
        }
    }*/
    
    if (sType===3) {
        var bBoxShip1 = {x: sx+10, y: sy, r: 20}
        var bBoxShip2 = {x: sx+34, y: sy, r: 8}
    }
    else {
        var bBoxShip1 = {x: sx+10, y: sy, r: 12}
        var bBoxShip2 = {x: sx+30, y: sy, r: 8}
    }

    for (var i=0;i<arrEnemy.length;i++) {
        //var bBoxEnemy = {x: arrEnemy[i].x+arrEnemy[i].wh/2, y: arrEnemy[i].y+arrEnemy[i].wh/2, r: arrEnemy[i].wh/2}
        if (hit(arrEnemy[i], bBoxShip1) || hit(arrEnemy[i], bBoxShip2)) {
            explosion = new Audio("sound/explosion.mp3");
            explosion.volume = 0.1;            
            explosion.play();
            createParticle(arrEnemy[i]);
            arrEnemy.splice(i, 1);
        }
    }
}

function collisionRocket() {
    
    for (var i=0;i<arrEnemy.length;i++) {
        for (var j=0;j<arrRocket.length;j++) {
            if (hitRect(arrEnemy[i], arrRocket[j])) {
                arrRocket.splice(j, 1);
                arrEnemy[i].hit += 1;
                if (arrEnemy[i].hit > 10) {
                    explosion = new Audio("sound/explosion.mp3");
                    explosion.volume = 0.1;            
                    explosion.play();
                    createParticle(arrEnemy[i]);
                    arrEnemy.splice(i, 1);
                }
            }
        }
    }
    /*
    for (var i=0;i<arrEnemy.length;i++) {
        for (var j=0;j<arrRocket.length;j++) {
            var bBoxEnemy = {x: arrEnemy[i].x+arrEnemy[i].wh/2, y: arrEnemy[i].y+arrEnemy[i].wh/2, r: arrEnemy[i].wh/2}
            if (hitArc(bBoxEnemy, arrRocket[j])) {
                arrRocket.splice(j, 1);
                arrEnemy[i].hit += 1;
                if (arrEnemy[i].hit > 10) {
                    explosion = new Audio("sound/explosion.mp3");
                    explosion.volume = 0.1;
                    explosion.play();
                    arrEnemy.splice(i, 1);
                }
            }
        }
    }*/
}
const v_main = document.getElementsByClassName('main')[0];
let v_enemy;

function createEnemy() {
    arrEnemy.push({
        x:canvasW,
        y:Math.floor(Math.random() * canvasH),
        wh:Math.floor(Math.random() * 31) + 10,
        v:Math.floor(Math.random() * 2) + 1,
        c:Math.round(360*Math.random()),
        hit: 0
    })

    let enemyDiv = document.createElement('div');
    let enemyImg = document.createElement('img');
    enemyImg.src = "../resources/images/NicePng_avio-png_3442994.png";
    enemyImg.width = 100;
    enemyImg.height = 100;
    enemyDiv.appendChild(enemyImg);
    enemyDiv.classList.add('enemy');
    v_main.appendChild(enemyDiv);
}

function updateEnemy() {
    for (var i = 0;i<arrEnemy.length;i++) {
        v_enemy = document.getElementsByClassName('enemy')[i];
        v_enemy.style.right = arrEnemy[i].x + 'px';
    }
}

function deleteEnemy() {
    for (var i = 0;i<arrEnemy.length;i++) {
        if (arrEnemy[i].x < -50) {
            arrEnemy.splice(i, 1);
        }
    }
}

function createRocket() {
    if (fire) {
        if (sType != 1) {
            arrRocket.push({x: sx+60, y: sy-2, w:5, h:4, c:"yellow", v:10})

            //arrRocket.push({x: sx+60, y: sy, r: 2, c:"yellow", v:10})
        }
        if (sType === 1) {
            arrRocket.push({x: sx+55, y: sy-8, w:5, h:4, c:"yellow", v:10})
            arrRocket.push({x: sx+55, y: sy+4, w:5, h:4, c:"yellow", v:10})

            //arrRocket.push({x: sx+55, y: sy-6, r: 2, c:"yellow", v:10})
            //arrRocket.push({x: sx+55, y: sy+6, r: 2, c:"yellow", v:10})
        }    
        if (sType > 1) {
            arrRocket.push({x: sx+45, y: sy-10, w:5, h:4, c:"yellow", v:10})
            arrRocket.push({x: sx+45, y: sy+6, w:5, h:4, c:"yellow", v:10})

            //arrRocket.push({x: sx+45, y: sy-8, r: 2, c:"yellow", v:10})
            //arrRocket.push({x: sx+45, y: sy+8, r: 2, c:"yellow", v:10})
        }
        if (sType > 2) {
            arrRocket.push({x: sx+37, y: sy-18, w:5, h:4, c:"yellow", v:10})
            arrRocket.push({x: sx+37, y: sy+14, w:5, h:4, c:"yellow", v:10})
            
            //arrRocket.push({x: sx+40, y: sy-16, r: 2, c:"yellow", v:10})
            //arrRocket.push({x: sx+40, y: sy+16, r: 2, c:"yellow", v:10})
        }
    }
}

// function drawRocket() {
//     for (var i=0;i<arrRocket.length;i++) {
//         ctx.fillStyle = arrRocket[i].c;
//         ctx.fillRect(arrRocket[i].x, arrRocket[i].y, arrRocket[i].w, arrRocket[i].h);
//         /*
//         ctx.beginPath();
//         ctx.arc(arrRocket[i].x, arrRocket[i].y, arrRocket[i].r, 0, Math.PI*2);
//         ctx.fill();*/
//     }
// }

// function updateRocket() {
//     for (var i=0;i<arrRocket.length;i++){
//         arrRocket[i].x += arrRocket[i].v;
//     }
// }

// function deleteRocket() {
//     for (var i=0;i<arrRocket.length;i++){
//         if(arrRocket[i].x>vcanvas.width) {
//             arrRocket.splice(i, 1);
//         }
//     }
// }

const v_player = document.getElementById('player');
let planeSize = 100;

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

    if (vx-vel<0) {vx=vel;}
    if (vy<-(canvasH/2)+planeSize) {vy=0-(canvasH/2)+planeSize;}
    if (vx+planeSize+vel>canvasW) {vx=canvasW-planeSize-vel;}
    if (vy>(canvasH/2)-(planeSize/2)) {vy=(canvasH/2)-(planeSize/2);}
}

function gameLoop() {
    movePlane();
    updateEnemy();
}

function init() {
    setInterval(createEnemy, 1000);
    // setInterval(createRocket, 100);
    setInterval(gameLoop, 33);
}

function setKey(event) {
    if (event.keyCode === 37) {r_left = 1;}
    if (event.keyCode === 38) {r_up = 1;}
    if (event.keyCode === 39) {r_right = 1;}
    if (event.keyCode === 40) {r_down = 1;}

    if (event.keyCode === 32) {fire=1;}
}

function stopKey(event) {
    if (event.keyCode === 37) {r_left = 0;}
    if (event.keyCode === 38) {r_up = 0;}
    if (event.keyCode === 39) {r_right = 0;}
    if (event.keyCode === 40) {r_down = 0;}

    if (event.keyCode === 32) {fire=0;}
}

document.onkeydown = setKey;
document.onkeyup = stopKey;