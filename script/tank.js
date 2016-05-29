/**
 * Created by khanh on 29/05/2016
 */
class Tank{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = 'img/Base_tank.png';
        this.level = 1;
        this.speedX = 3;
        this.speedY = 3;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
    //direction o day khac voi dir cua nong sung
    move(direction){
        switch (direction){
            case 1://up
                if(this.y >=10){
                    this.speedY = -4;
                    this.speedX = 0;
                }
                //this.direction = 1;
                break;
            case 2://down
                if(this.y <= window.innerHeight - 10){
                    this.speedY = 4;
                    this.speedX = 0;
                }
                //this.direction = 2;
                break;
            case 3://left
                if(this.x >= 10){
                    this.speedX = -4;
                    this.speedY = 0;
                }
                //this.direction = 3;
                break;
            case 4://right
                if (this.x <= window.innerWidth -10){
                    this.speedX = 4;
                    this.speedY = 0;
                }
                //  this.direction = 4;
                break;
        }
    }

}