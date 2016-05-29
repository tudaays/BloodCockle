/**
 * Created by khanh on 29/05/2016
 */
class Tank{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.spriteUp = new Image();
        this.sprite.src = 'img/Base_tank.png';
        this.level = 1;
        this.speedX = 0;
        this.speedY = 0;
        this.direction =1;
        this.bullets = new Array();
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotate(mouseX, mouseY));
        context.drawImage(this.sprite, -84, -80);
        context.restore();
    }
    move(direction){
        switch (direction){
            case 1://up
                if(this.y >=10){
                    this.speedY = -4;
                    this.speedX = 0;
                }
                this.direction = 1;
                break;
            case 2://down
                if(this.y <= window.innerHeight - 10){
                    this.speedY = 4;
                    this.speedX = 0;
                }
                this.direction = 2;
                break;
            case 3://left
                if(this.x >= 10){
                    this.speedX = -4;
                    this.speedY = 0;
                }
                this.direction = 3;
                break;
            case 4://right
                if (this.x <= window.innerWidth -10){
                    this.speedX = 4;
                    this.speedY = 0;
                }
                 this.direction = 4;
                break;
        }
    }
    rotate(x1, y1){
        var c1= Math.abs(y1- this.y);
        var c2 = Math.sqrt((x1-this.x)*(x1-this.x) + (y1-this.y)*(y1-this.y))
        if(x1 >= this.x && y1 >= this.y){  // truong hop goc phan tu thu 4
            var res = Math.asin(c1/c2);
            return res;
        }
        if(this.x >= x1 && y1>= this.y){
            var res = Math.PI - Math.asin(c1/c2);
            return res;
        }
        if(this.x >= x1 && this.y>= y1 ){
            var res = Math.PI + Math.asin(c1/c2);
            return res;
        }
        if(this.x <= x1 && this.y>= y1 ){
            var res = 2*Math.PI - Math.asin(c1/c2);
            return res;
        }

    }
    shoot(){
        var bullet = new Bullet(this.x + 30, this.y+30, t);
    }
}