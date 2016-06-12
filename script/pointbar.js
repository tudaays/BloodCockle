/**
 * Created by Admin on 12/06/2016.
 */
class PointBar{
    constructor(){
        this.x = 5;
        this.y =  window.innerHeight - 140;
    }
    draw(context){
        context.fillStyle= "black";
        context.font = "14px Georgia";
        var level = 'Level: ' + player.level + ' exp:' +player.exp;
        var point =  'Point: ' + player.point;
        var speed = '(1)Speed: ' + player.speed;
        var dame = '(2)Damege: ' + player.bulletDame;
        var reload = '(3)Reload: ' + player.reload;
        var bulletSpeed = '(4)Bullet Speed: ' + player.bulletSpeed;
        var regen = '(5)HP regen: ' + player.HpRegen;
        context.fillText(level , this.x, this.y -20);
        context.fillText(point , this.x, this.y);
        context.fillText(speed, this.x, this.y + 20);
        context.fillText(dame, this.x, this.y + 40);
        context.fillText(reload, this.x, this.y + 60);
        context.fillText(bulletSpeed, this.x, this.y + 80);
        context.fillText(regen, this.x, this.y + 100);
        context.fillStyle = "black";
        context.fillText('RANKING', window.innerWidth - 200 , 20);
        // var players = enemy;
        // var c = new Enemy(0,0 , player.id, 0, player.name, 0);
        // c.exp = player.exp;
        // players.push(c);
        // var max = players[0];
        // for(var j=1; j<=5; j++){
        //     var count =0;
        //     for(var i=0; i<players; i++){
        //         if(max < players[i].exp) {
        //             count = i;
        //             max = players[i];
        //             break;
        //         }
        //     }
        //     context.fillText(j +': ' +max.name, window.innerWidth - 200, 20+j*20);
        //     players.splice(count, 1);
        // }
    }
}