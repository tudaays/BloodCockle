/**
 * Created by kej on 29/05/2016.
 */
class Bullet{
    constructor(x, y, degree, direction){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = 'img/bullet.png';
        this.degree = degree;
        this.speedX = 0;
        this.speedY = 0;
        this.direction = direction;
        this.reloadTime = 0;
        this.damage = 0;
        switch (this.direction){
            case 1: //up
                this.speedY = -5/Math.tan(degree);
                this.speedX = 5;
                break;
            case 2: //down
                this.speedY = -5/Math.tan(degree);
                this.speedX =-5;
                break;
            case 3: //left
                this.speedY = 5/Math.tan(degree);
                this.speedX = -5;
                break;
            case 4: //right
                this.speedY = 5/Math.tan(degree);
                this.speedX = 5;
                break;
        }

    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    }
    draw(context){
        context.drawImage(this.sprite,this.x, this.y);
    }
}
