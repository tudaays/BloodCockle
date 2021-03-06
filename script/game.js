/**
 * Created by keldeo on 29/05/2016.
 */
var context;
var mouseX, mouseY;
var socket;
var player;
var enemy = new Array();
// var view_y = 0;
// var view_x= 0;
var canvas;

window.onload = function () {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.addEventListener("mousemove", mouseMove, false);

};

function login() {
    var txtName = document.getElementById("txt_name").value;
    player = new Tank(Math.random() * (window.innerWidth - 50)  , Math.random() * (window.innerHeight - 50),0);
    player.name = txtName;
    initSocketClient();
    setInterval(gameLoop, 17);
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
            case 49:
                player.powerUp(1);
                break;
            case 50:
                player.powerUp(2);
                break;
            case 51:
                player.powerUp(3);
                break;
            case 52:
                player.powerUp(4);
                break;
            case 53:
                player.powerUp(5);
                break;
            case 54:
                player.powerUp(6);
                break;
        }
    };
    canvas.onClick = function () {
        player.shoot();
    }
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
    window.onbeforeunload = function (e) {
        socket.emit('close',{id: player.id});
    };
    window.onunload = function (e) {
        socket.emit('close',{id: player.id});
    };
}

function initSocketClient() {
    socket = io.connect();
    socket.emit('player_created',{x: player.x, y:player.y, name: player.name, hp: player.hp});
    socket.on('info_other_players',function (data) {
        player.id = data.id;
        for (var i = 0; i < data.tanks.length; i++){
            var newTank = new Enemy(data.tanks[i].x,data.tanks[i].y, data.tanks[i].id, data.tanks[i].degree, data.tanks[i].name, data.tanks[i].hp);
            enemy.push(newTank);
        }
    });
    socket.on('new_player_connected', function (data) {
        var newTank = new Enemy(data.x,data.y, data.id, 0, data.name, data.hp);
        enemy.push(newTank);
    });

    socket.on('enemy_update',function (data) {
        for(var i = 0; i< enemy.length; i++ ){
            if( enemy[i].id == data.id){
                enemy[i].x = data.x;
                enemy[i].y = data.y;
                enemy[i].degree = data.degree;
                enemy[i].name = data.name;
                enemy[i].hp = data.hp;
                enemy[i].level = data.level;
                enemy[i].exp = data.exp;
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
    socket.on('get_shot', function (data) {
        if(player.id == data.id){
            player.hp = data.hp;
            for(var i = 0; i< enemy.length; i++ ) {
                if (enemy[i].id == data.idShooter) {
                    enemy[i].bullets.splice(data.bulletId,1);
                }
            }
            // break;
        } else{
            for(var i = 0; i< enemy.length; i++ ) {
                if (enemy[i].id == data.id) {
                    enemy[i].hp = data.hp;
                    break;
                }
            }
        }
        for(var i = 0; i< enemy.length; i++ ) {
            if (enemy[i].id == data.idShooter) {
                enemy[i].bullets.splice( enemy[i].bullets[enemy[i].bullets.length-1],1);
            }
        }
    });
    socket.on('enemy_dead', function (data) {
        for(var i = 0; i< enemy.length; i++ ) {
            if (enemy[i].id == data.id) {
                enemy.splice(i,1);
                break;
            }
        }
    });
    socket.on('enemy_lvl_up', function (data) {
        for(var i = 0; i< enemy.length; i++ ) {
            if (enemy[i].id == data.id) {
                enemy[i].level = data.level;
                break;
            }
        }
    });
}
var gameLoop = function () {
    gameUpdate();
    gameDrawer(context);
};




function gameUpdate() {
    player.update();
    socket.emit('player_update',{x: player.x, y: player.y, id: player.id, degree: player.degree, name: player.name, hp: player.hp, level : player.level, exp: player.exp});
    for(var i=0; i< enemy.length; i++){
        enemy[i].update();
    }
    for(var i=0; i< enemy.length; i++){
        if(enemy[i].hp<=0){
            enemy.splice(i,1);
        }
    }
}
function gameDrawer() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 5000, 5000);
    player.draw(context);
    for(var i=0; i< enemy.length; i++){
        enemy[i].draw(context);
    }
    // if(player.x > view_x / 2){
    //     view_x = player.x - view_x / 2;
    // }
    // if(player.y > view_y / 2){
    //     view_y = player.y - view_y / 2;
    // }
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
}
