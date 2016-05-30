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
