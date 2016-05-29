/**
 * Created by kej on 29/05/2016.
 */
class Bullet{
    constructor(x, y, direction){
        this.x = x;
        this.y = y;
        this.damage = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.reloadTime = 0;
        switch (direction){
            case 1: //up
                this.speedY = -5;
                break;
            case 2: //down
                this.speedY = 5;
                break;
            case 3: //left
                this.speedX = -5;
                break;
            case 4: //right
                this.speedX = 5;
                break;
        }

    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
    }
    draw(context){
        context.drawImage(this.x, this.y);
    }
}
