/**
 * Created by keldeo on 29/05/2016.
 */
var context;
window.onload = function () {
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameStart();
    setInterval(gameLoop, 17);
};

var player;

var gameLoop = function () {
    gameUpdate();
    gameDrawer(context);
};
function gameUpdate() {

}
function gameDrawer() {

}