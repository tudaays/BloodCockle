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
    }
    update(){
        switch (this.direction){
            case 1: //up
                this.y -= 5/Math.tan(this.degree);
                this.x += 5;
                break;
            case 2: //down
                this.y -= 5/Math.tan(this.degree);
                this.x -= 5;
                break;
            case 3: //left
                this.y += 5/Math.tan(this.degree);
                this.x -= 5;
                break;
            case 4: //right
                this.y += 5/Math.tan(this.degree);
                this.x += 5;
                break;
        }
    }
    draw(context){
        context.drawImage(this.sprite,this.x, this.y);
    }
}
