class World {
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
        this.startGameLoop();
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

    startGameLoop() {
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

        if (!this.canThrowBottle()) {
            return;
        }

        this.throwBottle();
        this.startThrowCooldown();
    }


    canThrowBottle() {
        let throwKeyPressed = this.keyboard.D;
        let throwAvailable = this.canThrow;
        let hasBottles = this.collectedBottles > 0;
        return throwKeyPressed && throwAvailable && hasBottles;
    }


    throwBottle() {
        this.character.idleTime = 0;
        let { spawnX, spawnY } = this.getBottleSpawnPosition();
        let bottle = new ThrowableObject(spawnX, spawnY);
        bottle.otherDirection = this.character.otherDirection;
        bottle.throwAnimate();
        this.throwableObjects.push(bottle);
        this.collectedBottles--;
        this.updateStatusbarBottle();
    }


    startThrowCooldown() {
        this.canThrow = false;

        setTimeout(() => {
            this.canThrow = true;
        }, 800);
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
        }
    }

    updateStatusbarBottle() {
        let percentage = (this.collectedBottles / 8) * 100;
        this.statusBarBottle.setPercentage(percentage);
    }

    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.collectedCoins < 8) {
                this.collectCoin(coin);
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
        this.level.enemies.forEach((enemy) => {

            this.handleCharacterEnemyCollision(enemy);

            this.limitCharacterMovementAtEndboss(enemy);

        });
    }


    handleCharacterEnemyCollision(enemy) {
        if (!this.character.isColliding(enemy) || enemy.isDead()) {
            return;
        }
        if (this.isJumpingOnEnemy(enemy) && !(enemy instanceof Endboss)) {

            this.killChicken(enemy);
            this.bounceCharacter();

            return;
        }
        this.handleEnemyDamage(enemy);
    }


    bounceCharacter() {
        this.character.speedY = 25;
        this.character.y = 150;
        this.character.lastBounce = new Date().getTime();
    }


    handleEnemyDamage(enemy) {
        if (this.character.wasJustBouncing()) {
            return;
        }
        if (this.character.isHurt()) {
            return;
        }
        if (enemy instanceof Endboss) {
            this.character.hit(25);

        } else {
            this.character.hit();
        }
        this.character.playHurtSound();
        if (this.character.isStopped) {
            return;
        }
        this.statusBarHealth.setPercentage(this.character.energy);
    }


    limitCharacterMovementAtEndboss(enemy) {
        if (!(enemy instanceof Endboss)) {
            return;
        }
        if (this.character.x > enemy.x + 40) {

            this.character.x = enemy.x + 40;
        }
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

                if (!bottle.isColliding(enemy)) {
                    return;
                }

                if (enemy instanceof Endboss) {
                    this.handleEndbossHit(enemy, bottle, bottleIndex);
                } else {
                    this.handleChickenHit(enemy, bottle, bottleIndex);
                }
            });
        });
    }


    handleEndbossHit(enemy, bottle, bottleIndex) {
        if (!enemy.isHurt()) {
            enemy.playCrySound();
            enemy.hit();
            this.statusBarEndboss.setPercentage(enemy.energy);
        }

        this.removeBottleAfterImpact(bottle, bottleIndex);
    }


    handleChickenHit(enemy, bottle, bottleIndex) {
        this.killChicken(enemy);

        this.removeBottleAfterImpact(bottle, bottleIndex);
    }


    removeBottleAfterImpact(bottle, bottleIndex) {
        bottle.deactivateBottleMovement();
        bottle.bottleSplashAnimate();

        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 300);
    }


    drawWorld() {
        this.clearCanvas();
        this.drawBackgroundObjects();
        this.drawStatusBars();
        this.drawGameObjects();
        this.requestNextFrame();
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    drawBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
    }


    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
    }


    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    requestNextFrame() {
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

        this.displayEndScreen(screen, type);
        this.hideGameControls(soundIcon, mobilePanel);
        this.stopGameObjects();

        isGameActive = false;
        this.stopBackgroundMusic();
    }


    displayEndScreen(screen, type) {
        screen.classList.remove('win', 'lose');
        screen.classList.add(type);
        screen.classList.remove('d-none');
    }


    hideGameControls(soundIcon, mobilePanel) {
        mobilePanel.classList.add('d-none');
        soundIcon.classList.add('d-none');

        this.character.stopAllSounds();
    }


    stopGameObjects() {
        [...this.level.enemies, ...this.level.clouds].forEach(object => {
            object.isStopped = true;

            if (object instanceof Endboss) {
                object.stopAllAnimations();
            }
        });
    }

}