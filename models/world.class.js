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
    collectedCoins = 0;
    canThrow = true;

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
            this.checkEnemyCollisions();
            this.checkThrowObjects();
            this.checkCollisionBottles();
            this.checkCollisionCoins();
            this.checkCollisionBottlesWithEnemies();
            //console.log(this.character.y);
        }, 33 );
    }

    checkThrowObjects() { 
        if(this.keyboard.D && this.canThrow && this.collectedBottles > 0 ) {
            console.log("D wurde gedrückt! Erstelle Flasche...");
            this.character.idleTime = 0;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            bottle.throwAnimate(); // start animation
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.updateStatusbarBottle();
            this.canThrow = false;
            setTimeout(() => this.canThrow = true, 800);
        } 
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

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {     
            if (this.character.isColliding(enemy) && !enemy.isDead()) {  
                if (this.isJumpingOnEnemy(enemy)) {
                    this.killChicken(enemy);
                    this.character.speedY = 25; // Bounce-Effekt
                    this.character.y = 150;     // character position zurück auf Bodenhöhe setzen!
                    return;
                } else if (!this.character.isHurt()) {
                    this.character.hit();
                    console.log('von der Seite getroffen');
                    this.statusBarHealth.setPercentage(this.character.energy); 
                    return;
                }
                
            }
        });
    }

    isJumpingOnEnemy(enemy) {
        console.log('Enemy von oben getroffen');
        return this.character.isAboveGround() &&
               this.character.speedY < 0 &&
               this.character.isColliding(enemy);
    }
    
    killChicken(chicken) {
        console.log('killchicken test');
        chicken.setDeadState(); // Bild ändern, isDead setzen
    
        setTimeout(() => {
            let index = this.level.enemies.indexOf(chicken);
            if (index !== -1) {
                this.level.enemies.splice(index, 1); // Chicken aus dem Level entfernen
            }
        }, 5000);
    } 
    
    checkCollisionBottlesWithEnemies() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    //this.killEnemy(enemy);
                    //this.removeBottle(bottle);
                    console.log('enemy got hit by bottle'); 
                }
            });
        });
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