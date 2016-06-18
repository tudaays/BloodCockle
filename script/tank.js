/**
 * Created by khanh on 29/05/2016
 */
class Tank{
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.speed = 4;
        this.speedX = 0;
        this.speedY = 0;
        this.sprite = new Image();
        this.sprite.src = 'img/Base_tank.png';
        this.level = 1; //chưa làm
        this.bulletSpeed = 5; // toc do bay cua dan
        this.maxHp = 50;
        this.hp = this.maxHp;
        this.reload = 50; // thoi gian delay cua bullet 30x17ms = ..
        this.HpRegen = 200;
        this.bullets = new Array();
        this.degree = 0; // goc de xoay
        this.count = 0; // biến đếm số lần lặp của gameLoop để tính time delay đạn
        this.countRegen = 0;
        this.id = id;
        this.name;
        this.point = 0;
        this.bulletDame = 15;
        this.exp = 0;
        this.infoBar = new PointBar();
        // this.isUp = false;
    }
    update(){
        this.regen();
        this.isLvlUp();
        this.isDead();
        this.shootEnemy();
        this.count ++; // mỗi lần lặp gameLoop tăng biến đếm
        this.countRegen ++;
        for(var i=0; i< this.bullets.length; i++){
            if(Math.abs(this.bullets[i].x - this.x) >=1200 || Math.abs(this.bullets[i].y - this.y)>=1200){
                this.bullets.splice(i,1);
            } else{
                this.bullets[i].update();
            }
        }

        if(this.x+ this.speedX >= 30 && this.x+this.speedX <= window.innerWidth - 30 && this.y+ this.speedY >= 30 && this.y+this.speedY <= window.innerHeight - 30 ){
            this.x += this.speedX; //update tank
            this.y += this.speedY;
        }

    }
    draw(context){
        this.infoBar.draw(context);
        context.fillStyle="#FF0000";
        context.fillRect(this.x-25,this.y +30,(this.hp/this.maxHp)*40,10);
        context.font = "20px Comic Sans MS";
        context.fillStyle="blue";
        context.fillText(this.name, this.x - 28 , this.y  - 40);
        for(var i=0; i< this.bullets.length; i++){
            this.bullets[i].draw(context);
        }
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotate(mouseX, mouseY));
        context.drawImage(this.sprite, -24, -24);
        context.restore();
        //mouseX mouseY là tọa độ của mouse
    }
    compare(s1,s2){
        if (s1.x < s2.x + s2.width &&
            s1.x + s1.width > s2.x &&
            s1.y < s2.y + s2.height &&
            s1.height + s1.y > s2.y) return true;
        return false;
    }
    shootEnemy() {
        for (var i = 0; i < this.bullets.length; i++) {
            var s1 = {x: this.bullets[i].x, y: this.bullets[i].y, width: 15, height: 15}
            for (var j = 0; j < enemy.length; j++) {
                var s2 = {x: enemy[j].x - 10, y: enemy[j].y - 20, width: 28, height: 28}
                if (this.compare(s1, s2)) {
                    this.bullets.splice(i, 1);
                    enemy[j].hp -= this.bulletDame;
                    if(enemy[j].hp <= 0) this.exp += enemy[j].level*50;
                    socket.emit('enemy_get_shot', {idShooter: this.id, id: enemy[j].id, hp: enemy[j].hp, bulletId: i});
                    break;
                }
            }
        }
    }
    powerUp(attribute){
        switch (attribute){
            case 1:
                if(this.point){
                    if(this.speed <=10){
                        this.point --;
                        this.speed ++;
                    }
                }
                break;
            case 2:
                if(this.point){
                    if(this.bulletDame <= 40){
                        this.point --;
                        this.bulletDame += 4;
                    }
                }
                break;
            case 3:
                if(this.point){
                    if(this.reload >= 20){
                        this.point --;
                        this.reload -=  8;
                    }
                }
                break;
            case 4:
                if(this.point){
                    if(this.bulletSpeed <=10){
                        this.point --;
                        this.bulletSpeed ++;
                    }
                }
                break;
            case 5:
                if(this.point){
                    if(this.HpRegen >=35) {
                        this.point--;
                        this.HpRegen -= 30;
                    }
                }
                break;
            case 6:
                if(this.point){
                    if(this.maxHp <=125){
                        this.point --;
                        this.maxHp += 15;
                    }
                }
                break;
        }
    }
    move(direction){
        switch (direction){
            case 1://up
                this.speedY = -this.speed;
                this.speedX = 0;
                break;
            case 2://down
                this.speedY = this.speed;
                this.speedX = 0;
                break;
            case 3://left
                this.speedX = -this.speed;
                this.speedY = 0;
                break;
            case 4:
                this.speedX = this.speed;
                this.speedY = 0;
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
            var bullet = new Bullet(this.x - 12 , this.y +2, mouseX, mouseY, this.bulletSpeed);
            this.bullets.push(bullet);
            socket.emit('player_shoot', {id: this.id, bullets: this.bullets});
            this.count =0;
        }
    }
    isDead(){
        if(this.hp <= 0){
            socket.emit('player_dead',{id : this.id});
            location.reload();
        }
    }
    isLvlUp(){
        if(this.exp >= (this.level*15 + 100) ){
            this.exp -= this.level*15 + 100 ;
            this.level += 1;
            this.point ++;
            socket.emit('player_lvl_up', {id: this.id, level: this.level});
        }
    }
    regen(){
        if(this.countRegen >= this.HpRegen){
            if(this.hp < this.maxHp){
                this.hp += 5;
            }
            this.countRegen = 0;
        }
    }
}



//--------------------------------Enemy-------------------------------------------------------


class Enemy{
    constructor(x, y, id, degree, name, hp){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = 'img/Base_tank.png';
        this.id = id;
        this.degree = degree;
        this.bullets = [];
        this.bulletSpeed = 4;
        this.name = name;
        this.maxHp = 50;
        this.hp = hp;
        this.level = 1;
    }
    update(){
        for(var i=0; i<this.bullets.length; i++){
            this.bullets[i].update();
        }
    }
    draw(context){
        context.fillStyle="#FF0000";
        context.fillRect(this.x-25,this.y +20,(this.hp/this.maxHp)*40,10);
        context.font = "20px Comic Sans MS";
        context.fillStyle="pink";
        var info = this.name + ' ( Level: ' + this.level + ' ) ';
        context.fillText(info, this.x-28 , this.y  - 40);
        for(var i=0; i<this.bullets.length; i++){
            this.bullets[i].draw(context);
        }
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.degree);
        context.drawImage(this.sprite, -24, -24);
        context.restore();
    }

    compare(s1,s2){
        if (s1.x < s2.x + s2.width &&
            s1.x + s1.width > s2.x &&
            s1.y < s2.y + s2.height &&
            s1.height + s1.y > s2.y) return true;
        return false;
    }
}