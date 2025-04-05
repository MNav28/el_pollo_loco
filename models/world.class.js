class World {
    myTest = console.log('ein test');
    character = new Character();
    // enemies = level1.enemies;
    // clouds = level1.clouds;  
    // backgroundObjects = level1.backgroundObjects;

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    //bottle = new ThrowableObject();
    throwableObjects = [];
    collectedBottles = 0;
    collectedCoins = 0

    constructor(canvas, keyboard) {    
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawWorld();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() { 
        setInterval(() => {    
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionBottles();
            this.checkCollisionCoins();
        }, 200);
    }

    checkThrowObjects() { 
        if(this.keyboard.D && !this.collectedBottles == 0 ) {
            console.log("D wurde gedrückt! Erstelle Flasche...");
            this.character.idleTime = 0;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            bottle.throwAnimate(); // start animation
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.updateStatusbarBottle();
        } 
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => { 
            if (this.character.isColliding(enemy)) {  
                //this.character.energy -= 5;  
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);  
                //console.log('Collision with character, energy:', this.character.energy);
            }
        });
    }

    checkCollisionBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 8) {
                console.log('collision with bottle !');
                this.collectBottle(bottle);
                //console.log('amount of bottles =', this.collectedBottles);
            }
        });
    }

    collectBottle(bottle) {
        let index = this.level.bottles.indexOf(bottle);
        if (index !== -1) {
            this.level.bottles.splice(index, 1);
            this.collectedBottles++;
            this.updateStatusbarBottle();
        }
    }

    updateStatusbarBottle() {
        let percentage = (this.collectedBottles / 8) * 100;
        this.statusBarBottle.setPercentage(percentage);  
    }

    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin) && this.collectedCoins < 8) {
                console.log('collision with coin!');
                this.collectCoin(coin);
                console.log('amount of coins =', this.collectedCoins);
            }
        });
    }

    collectCoin(coin) {
        let index = this.level.coins.indexOf(coin);
        if (index !== -1) {
            this.level.coins.splice(index, 1);
            this.collectedCoins++ ;
            this.updateStatusbarCoin();
        }
    }

    updateStatusbarCoin() {
        let percentage = (this.collectedCoins / 8) * 100;
        this.statusBarCoin.setPercentage(percentage);
    }

    drawWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
      
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);  
        this.addToMap(this.statusBarHealth);  
        this.addToMap(this.statusBarBottle);  
        this.addToMap(this.statusBarCoin);  
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.drawObject(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}