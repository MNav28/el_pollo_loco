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
        }, 200);
    }

    checkThrowObjects() { 
        if(this.keyboard.D) {
            console.log("D wurde gedrückt! Erstelle Flasche...");
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
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

    drawWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
      
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);  
        this.addToMap(this.statusBarHealth);  
        this.addToMap(this.statusBarBottle);  
        this.addToMap(this.statusBarCoin);  
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.enemies);
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