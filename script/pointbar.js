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
        context.font = "16px Comic Sans MS";
        var level = 'Level: ' + player.level + ' exp:' +player.exp;
        var point =  'Point: ' + player.point;
        var speed = '(1)Speed: ' + player.speed;
        var dame = '(2)Damege: ' + player.bulletDame;
        var reload = '(3)Reload: ' + player.reload;
        var bulletSpeed = '(4)Bullet Speed: ' + player.bulletSpeed;
        var regen = '(5)HP regen: ' + player.HpRegen;
        var maxHp = '(6)Max Hp: ' + player.maxHp;
        context.fillText(level , this.x, this.y -20);
        context.fillText(point , this.x, this.y);
        context.fillText(speed, this.x, this.y + 20);
        context.fillText(dame, this.x, this.y + 40);
        context.fillText(reload, this.x, this.y + 60);
        context.fillText(bulletSpeed, this.x, this.y + 80);
        context.fillText(regen, this.x, this.y + 100);
        context.fillText(maxHp, this.x, this.y + 120);
        context.fillStyle = "red";
        context.fillText('Best Player', window.innerWidth - 200 , 20);

        var rank = [];
        rank.push({name: player.name, level: player.level,  exp: player.exp});
        for(var i=0; i<enemy.length; i++){
            rank.push({name: enemy[i].name, level: enemy[i].level, exp: enemy[i].exp })
        }
        var max = rank[0];
        for(var i=0; i<rank.length; i++){
            if(max.level*15 + 100 + max.exp < rank[i].level*15 + 100 + rank[i].exp) {
                max = rank[i];
                break;
            }
        }
        context.fillText(max.name + ' : point ' + (max.level*15 + max.level*100 - 100 - 15 + max.exp) , window.innerWidth - 200, 40);
    }
}