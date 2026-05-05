class World {
    myTest = console.log('ein test');
    character = new Character();

    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedBottles = 0;
    collectedCoins = 0;
    canThrow = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.background_music = new Audio('./assets/audio/background_sound2.mp3');
        this.background_music.loop = true;
        this.background_music.volume = 0.3;
        this.drawWorld();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
                enemy.animate();
            }
        });
    }

    run() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkThrowObjects();
            this.checkCollisionBottles();
            this.checkCollisionCoins();
            this.checkCollisionBottlesWithEnemies();
        }, 33);
    }

    checkThrowObjects() {
        if (this.character.isStopped) return;
        if (this.keyboard.D && this.canThrow && this.collectedBottles > 0) {
            console.log("D wurde gedrückt! Erstelle Flasche...");
            console.log('Bottle throw triggered');
            console.log('Flaschen vor Wurf:', this.collectedBottles);
            this.character.idleTime = 0;

            let spawnPosition = this.getBottleSpawnPosition();
            let spawnX = spawnPosition.spawnX;
            let spawnY = spawnPosition.spawnY;

            let bottle = new ThrowableObject(spawnX, spawnY);
            bottle.otherDirection = this.character.otherDirection;
            bottle.throwAnimate();
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.updateStatusbarBottle();
            console.log('Verbleibende Flaschen im Inventar:', this.collectedBottles);
            this.canThrow = false;
            setTimeout(() => {
                this.canThrow = true;
            }, 800);
        }
    }

    getBottleSpawnPosition() {
        let spawnX;
        let spawnY = this.character.y + 100;

        if (this.character.otherDirection) {
            spawnX = this.character.x - 30;
        } else {
            spawnX = this.character.x + 100;
        }

        return { spawnX, spawnY };
    }

    checkCollisionBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 8) {
                console.log('collision with bottle !');
                this.collectBottle(bottle);
            }
        });
    }

    collectBottle(bottle) {
        let index = this.level.bottles.indexOf(bottle);
        if (index !== -1) {
            this.level.bottles.splice(index, 1);
            this.collectedBottles++;
            this.updateStatusbarBottle();
            console.log('Bottle collected');
            console.log('Gesammelte Flaschen insgesamt:', this.collectedBottles);
        }
    }

    updateStatusbarBottle() {
        let percentage = (this.collectedBottles / 8) * 100;
        this.statusBarBottle.setPercentage(percentage);
    }

    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.collectedCoins < 8) {
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
            this.collectedCoins++;
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
                    this.character.speedY = 25;
                    this.character.y = 150;
                    return;
                } else if (!this.character.isHurt()) {
                    this.character.hit();
                    this.character.playHurtSound();
                    console.log('von der Seite getroffen');
                    if (this.character.isStopped) return;
                    this.statusBarHealth.setPercentage(this.character.energy);
                    return;
                }

            }
        });
    }

    isJumpingOnEnemy(enemy) {
        return this.character.isAboveGround() &&
            this.character.speedY < 0 &&
            this.character.isColliding(enemy);
    }

    killChicken(chicken) {
        if (chicken.isDeadAlready) return;
        chicken.isDeadAlready = true;
        if (chicken instanceof Chicken || chicken instanceof ChickenSmall) {
            chicken.playChickenKilledSound();
        }
        chicken.setDeadState();
        setTimeout(() => {
            let index = this.level.enemies.indexOf(chicken);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 5000);
    }

    checkCollisionBottlesWithEnemies() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        if (!enemy.isHurt()) {
                            console.log('endboss got hitted');
                            enemy.playCrySound();
                            enemy.hurtAnimation();
                            enemy.hit();
                            this.statusBarEndboss.setPercentage(enemy.energy);
                        }
                        bottle.deactivateBottleMovement();
                        bottle.bottleSplashAnimate();
                        setTimeout(() => {
                            this.throwableObjects.splice(bottleIndex, 1);
                        }, 300);
                    } else {
                        this.killChicken(enemy);
                        bottle.deactivateBottleMovement();
                        bottle.bottleSplashAnimate();
                        setTimeout(() => {
                            this.throwableObjects.splice(bottleIndex, 1);
                        }, 300);
                    }
                }
            });
        });
    }



    drawWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0)
        this.addToMap(this.character);
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

    playBackgroundMusic() {
        if (!soundEnabled) return;
        this.background_music.currentTime = 0;
        this.background_music.play().catch(e => {
            console.warn("Background music konnte nicht abgespielt werden:", e);
        });
    }

    stopBackgroundMusic() {
        this.background_music.pause();
        this.background_music.currentTime = 0;
    }

    showEndScreen(type) {
        const screen = document.getElementById('end-screen');
        const soundIcon = document.getElementById('sound-icon-wrapper');
        const mobilePanel = document.getElementById('control-mobile-panel');
        screen.classList.remove('win', 'lose');
        screen.classList.add(type);
        screen.classList.remove('d-none');
        mobilePanel.classList.add('d-none');
        soundIcon.classList.add('d-none');
        [...this.level.enemies, ...this.level.clouds].forEach(object => {
            object.isStopped = true;
        });
        isGameActive = false;
        this.stopBackgroundMusic();
    }

}