/**
 * Created by keldeo on 30/05/2016.
 */
var express = require("express");
var app = express();
app.use(express.static(__dirname));
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function (req, res) {
    res.sendfile('index.html');
})
http.listen(3000, function () {
   console.log('server is now open  on 3000');
});

var tanks = [];
var id = 0;
io.on('connection', function(socket){
    socket.on('player_created', function (data) {
        socket.emit('info_other_players',{id:id, tanks:tanks});
        data.id = id;
        socket.broadcast.emit('new_player_connected',data);
        tanks.push({id:id, x:data.x, y:data.y, name: data.name, hp: data.hp, level:1, exp: 0});
        id++;
    });
    socket.on('player_update', function (data) {
        for(var i=0; i< tanks.length; i++ ){
            if( tanks[i].id == data.id){
                tanks[i].x = data.x;
                tanks[i].y = data.y;
                tanks[i].degree = data.degree;
                tanks[i].name = data.name;
                tanks[i].hp = data.hp;
                tanks[i].level = data.level;
                tanks[i].exp = data.exp;
                socket.broadcast.emit('enemy_update',data);
                break;
            }
        }
    });
    socket.on('player_shoot', function (data) {
        for(var i=0; i< tanks.length; i++ ) {
            if (tanks[i].id == data.id) {
                tanks[i].bullets = data.bullets;
                socket.broadcast.emit('enemy_bullet', data);
                break;
            }
        }
    });
    socket.on('enemy_get_shot', function (data) {
        for(var i=0; i< tanks.length; i++ ) {
            if (tanks[i].id == data.id) {
                tanks[i].hp = data.hp
            }
            socket.broadcast.emit('get_shot', data);
            break;
        }
    });
    socket.on('player_dead', function (data) {
        for(var i=0; i< tanks.length; i++ ) {
            if (tanks[i].id == data.id) {
                tanks.splice(i, 1);
                socket.broadcast.emit('enemy_dead',data);
            }
        }
    })
    socket.on('player_lvl_up', function (data) {
        for(var i=0; i< tanks.length; i++ ) {
            if (tanks[i].id == data.id) {
                tanks[i].level = data.level;
                socket.broadcast.emit('enemy_lvl_up', data);
                break;
            }
        }
    })
    socket.on('close', function (data) {
        for(var i=0; i< tanks.length; i++ ) {
            if (tanks[i].id == data.id) {
                tanks.splice(i, 1);
                socket.broadcast.emit('enemy_dead',data);
            }
        }
    })
});