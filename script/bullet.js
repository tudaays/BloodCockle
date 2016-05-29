/**
 * Created by kej on 29/05/2016.
 */
class Bullet{
    constructor(x, y, x1, y1){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = 'img/bullet.png';
        this.speedX = (x1 - x)/10; //2 cái này đang lỗi em nghiên cứu sau
        this.speedY = (y1 - y)/10;
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
