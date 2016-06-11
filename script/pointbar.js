/**
 * Created by Admin on 12/06/2016.
 */
class PointBar{
    constructor(){
        this.x = 5;
        this.y =  window.innerHeight - 100;
    }
    draw(context){
        context.fillStyle= "black";
        context.font = "14px Georgia";
        var level = 'Level: ' + player.level;
        var point =  'Point: ' + player.point;
        var speed = 'Speed: ' + player.speed;
        var dame = 'Damege: ' + player.bulletDame;
        var reload = 'Reload: ' + player.reload;
        var bulletSpeed = 'Bullet Speed: ' + player.bulletSpeed;
        context.fillText(level , this.x, this.y -20);
        context.fillText(point , this.x, this.y);
        context.fillText(speed, this.x, this.y + 20);
        context.fillText(dame, this.x, this.y + 40);
        context.fillText(reload, this.x, this.y + 60);
        context.fillText(bulletSpeed, this.x, this.y + 80);
    }
}