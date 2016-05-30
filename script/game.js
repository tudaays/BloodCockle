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



function initSocketClient() {
    socket = io.connect();
    player = new Tank(120, 400,0);
    socket.emit('player_created',{x: player.x, y:player.y});
    socket.on('info_other_players',function (data) {
        player.id = data.id;
        //console.log(player.id);
        for (var i = 0; i < data.tanks.length; i++){
            var newTank = new Tank(data.tanks[i].x,data.tanks[i].y, data.tanks[i].id);
            enemyTanks.push(newTank);
        }
    });
    socket.on('new_player_connected', function (data) {
        var newTank = new Tank(data.x,data.y, data.id);
        enemyTanks.push(newTank);
    });

    socket.on('enemy_update',function (data) {
        for(var i = 0; i< enemyTanks.length; i++ ){
            if(enemyTanks[i].id == data.id){
                enemyTanks[i].direction = data.direction;
                console.log(data.direction);
                enemyTanks[i].x = data.x;
                enemyTanks[i].y = data.y;
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
}
function gameDrawer() {
    context.fillStyle = "white";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    player.draw(context);
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