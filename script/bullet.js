/**
 * Created by kej on 29/05/2016.
 */
class Bullet{
    constructor(x, y, x1, y1, bulletSpeed){
        this.x = x+7;
        this.y = y-10;
        this.bulletSpeed = bulletSpeed;
        this.sprite = new Image();
        this.sprite.src = 'img/bullet.png';
        var ch = Math.sqrt((this.x -x1)*(this.x -x1) + (this.y -y1)*(this.y -y1));
        this.speedX = (x1 - x)*this.bulletSpeed/ch; //2 cái này đang lỗi em nghiên cứu sau
        this.speedY = (y1 - y)*this.bulletSpeed/ch;
        this.damage = 0;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(context){
        context.drawImage(this.sprite,this.x, this.y);
    }
}
