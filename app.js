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
        socket.broadcast.emit('new_player_connected',data);
        tanks.push({id:id, x:data.x, y:data.y, name: data.name});
        id++;
    });
    socket.on('player_update', function (data) {
        for(var i=0; i< tanks.length; i++ ){
            if(tanks[i].id == data.id){
                tanks[i].x = data.x;
                tanks[i].y = data.y;
                tanks[i].degree = data.degree;
                tanks[i].name = data.name;
                tanks[i].hp = data.hp;
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
});