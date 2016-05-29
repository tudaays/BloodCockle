/**
 * Created by Q on 5/29/2016.
 */
class Creep{
    constructor(x, y, id){
        this.hp = 0;
        this.point = 0;
        this.x = x;
        this.y = y;
        this.id = id;
        this.sprite = new Image();
        switch(this.id){
            case 1:
                this.sprite.src = "img/creep_tri.png";
                this.hp = 100;
                this.point = 100;
                break;
            case 2:
                this.sprite.src = "img/creep_small_rect.png";
                this.hp = 200;
                this.point = 200;
                break;
            case 3:
                this.sprite.src = "img/creep_big_rect.png";
                this.hp = 400;
                this.point = 400;
                break;
        }
    }

    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}