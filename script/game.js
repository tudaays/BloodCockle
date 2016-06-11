/**
 * Created by keldeo on 29/05/2016.
 */
var context;
var mouseX, mouseY;
var socket;
var player;
var enemy = new Array();

window.onload = function () {
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.addEventListener("mousemove", mouseMove, false);
    gameStart();
    initSocketClient();
    setInterval(gameLoop, 17);
};

function login() {
    var txtName = document.getElementById("txt_name");
    console.log(txtName);
    player = new Tank(Math.floor((Math.random() * 300) + 20), Math.floor((Math.random() * 200)) + 20,0);
    player.name = txtName;
}

function initSocketClient() {
    socket = io.connect();
    socket.emit('player_created',{x: player.x, y:player.y});
    socket.on('info_other_players',function (data) {
        player.id = data.id;
        for (var i = 0; i < data.tanks.length; i++){
            var newTank = new Enemy(data.tanks[i].x,data.tanks[i].y, data.tanks[i].id, data.tanks[i].degree);
            enemy.push(newTank);
        }
    });
    socket.on('new_player_connected', function (data) {
        var newTank = new Enemy(data.x,data.y, data.id);
        enemy.push(newTank);
    });

    socket.on('enemy_update',function (data) {
        for(var i = 0; i< enemy.length; i++ ){
            if(enemy[i].id == data.id){
                enemy[i].x = data.x;
                enemy[i].y = data.y;
                enemy[i].degree = data.degree;
                break;
            }
        }
    });
    socket.on('enemy_bullet', function (data) {
        for(var i = 0; i< enemy.length; i++ ) {
            if (enemy[i].id == data.id) {
                for(var j=0; j<data.bullets.length; j++){
                    var bullet = new Bullet(data.bullets[j].x, data.bullets[j].y,0,0,data.bullets.speed);
                    bullet.speedX = data.bullets[j].speedX;
                    bullet.speedY = data.bullets[j].speedY;
                    enemy[i].bullets.push(bullet);
                }
                break;
            }
        }
    });
}
var gameLoop = function () {
    gameUpdate();
    gameDrawer(context);
};

function gameStart() {
    player = new Tank(100, 100);
}

function gameUpdate() {
    player.update();
    socket.emit('player_update',{x: player.x, y: player.y, id: player.id, degree: player.degree});
    for(var i=0; i< enemy.length; i++){
        enemy[i].update();
    }
}
function gameDrawer() {
    context.fillStyle = "white";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    player.draw(context);
    for(var i=0; i< enemy.length; i++){
        enemy[i].draw(context);
    }
}

function mouseMove(e)
{

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }


    /* do something with mouseX/mouseY */
}

window.onkeydown = function (e) {
    switch (e.keyCode){
        case 65://a
            player.move(3);
            break;
        case 68://d
            player.move(4);
            break;
        case 83://s
            player.move(2);
            break;
        case 87://w
            player.move(1);
            break;
        case 32: // dau cach
            player.shoot();
            break;
    }
};
window.onkeyup = function (e) {
    switch (e.keyCode){
        case 65://a
            if(player.speedX < 0){
                player.speedX = 0;
            }
            break;
        case 68://d
            if(player.speedX > 0){
                player.speedX = 0;
            }
            break;
        case 83://s
            if(player.speedY > 0){
                player.speedY = 0;
            }
            break;
        case 87://w
            if(player.speedY < 0){
                player.speedY = 0;
            }
            break;
    }
};