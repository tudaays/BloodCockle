/**
 * Created by khanh on 29/05/2016
 */
class Tank{
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.sprite = new Image();
        this.sprite.src = 'img/Base_tank.png';
        this.level = 1; //chưa làm
        this.bulletSpeed = 4; // toc do bay cua dan
        this.hp = 50;
        this.maxHp = 50;
        this.reload = 50; // thoi gian delay cua bullet 30x17ms = ..
        this.bullets = new Array();
        this.degree = 0; // goc de xoay
        this.count = 0; // biến đếm số lần lặp của gameLoop để tính time delay đạn
        this.id = id;
        this.name;
        
    }
    update(){
        this.count ++; // mỗi lần lặp gameLoop tăng biến đếm
        for(var i=0; i< this.bullets.length; i++){
            if(Math.abs(this.bullets[i].x - this.x) >=1200 || Math.abs(this.bullets[i].y - this.y)>=1200){
                this.bullets.splice(i,1);
            } else{
                this.bullets[i].update();
            }
        }
        this.x += this.speedX; //update tank
        this.y += this.speedY;
    }
    draw(context){
        context.fillStyle="#FF0000";
        context.fillRect(this.x-25,this.y +50,(this.hp/this.maxHp)*50,10);
        for(var i=0; i< this.bullets.length; i++){
            this.bullets[i].draw(context);
        }
        //vẽ tank
        //mouseX mouseY là tọa độ của mouse
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotate(mouseX, mouseY));
        context.drawImage(this.sprite, -48, -48);

        // context.fillText(this.name, this.x, this.y  + 80);
        context.restore();
    }
    move(direction){
        switch (direction){
            case 1://up
                if(this.y >=10){
                    this.speedY = -4;
                    this.speedX = 0;
                }
                break;
            case 2://down
                if(this.y <= window.innerHeight - 10){
                    this.speedY = 4;
                    this.speedX = 0;
                }
                break;
            case 3://left
                if(this.x >= 10){
                    this.speedX = -4;
                    this.speedY = 0;
                }
                break;
            case 4://right
                if (this.x <= window.innerWidth -10){
                    this.speedX = 4;
                    this.speedY = 0;
                }
                break;
        }
    }
    rotate(x1, y1){ //no comment :(
        var c1= Math.abs(y1- this.y);
        var c2 = Math.sqrt((x1-this.x)*(x1-this.x) + (y1-this.y)*(y1-this.y))
        if(x1 >= this.x && y1 >= this.y){  // truong hop goc phan tu thu 4
            var res = Math.asin(c1/c2);
            this.degree = res;
            return res;
        }
        if(this.x >= x1 && y1>= this.y){
            var res = Math.PI - Math.asin(c1/c2);
            this.degree = res;
            return res;
        }
        if(this.x >= x1 && this.y>= y1 ){
            var res = Math.PI + Math.asin(c1/c2);
            this.degree = res;
            return res;
        }
        if(this.x <= x1 && this.y>= y1 ){
            var res = 2*Math.PI - Math.asin(c1/c2);
            this.degree = res;
            return res;
        }

    }
    shoot(){
        if(this.count >= this.reload){ //nếu count lớn hơn or bằng time delay mới cho nạp đạn vào. Sau khi nạp đạn thì set count =0
            var bullet = new Bullet(this.x -20, this.y, mouseX, mouseY, this.bulletSpeed);
            this.bullets.push(bullet);
            socket.emit('player_shoot', {id: this.id, bullets: this.bullets});
            this.count =0;
        }
    }
}
class Enemy{
    constructor(x, y, id, degree){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = 'img/Base_tank.png';
        this.id = id;
        this.degree = degree;
        this.bullets = [];
        this.bulletSpeed = 4;
    }
    update(){
        for(var i=0; i<this.bullets.length; i++){
            this.bullets[i].update();
        }
    }
    draw(context){
        for(var i=0; i<this.bullets.length; i++){
            this.bullets[i].draw(context);
        }
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.degree);
        context.drawImage(this.sprite, -48, -48);
        context.restore();
    }
}