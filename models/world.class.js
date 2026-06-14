/**
 * Manages the game world, including rendering, collisions,
 * object interactions, status bars, and game state handling.
 */
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

    /**
     * Creates a new game world and initializes all game systems.
     *
     * @param {HTMLCanvasElement} canvas The game canvas.
     * @param {Keyboard} keyboard The keyboard input handler.
     */
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

    /**
     * Connects game objects with the current world instance.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
                enemy.animate();
            }
        });
    }

    /**
     * Starts the main game loop and checks game events continuously.
     */
    startGameLoop() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkThrowObjects();
            this.checkCollisionBottles();
            this.checkCollisionCoins();
            this.checkCollisionBottlesWithEnemies();
        }, 33);
    }

    /**
     * Checks if the character can throw a bottle.
     */
    checkThrowObjects() {
        if (this.character.isStopped) return;

        if (!this.canThrowBottle()) {
            return;
        }

        this.throwBottle();
        this.startThrowCooldown();
    }

    /**
     * Determines whether throwing a bottle is currently allowed.
     *
     * @returns {boolean} True if a bottle can be thrown.
     */
    canThrowBottle() {
        let throwKeyPressed = this.keyboard.D;
        let throwAvailable = this.canThrow;
        let hasBottles = this.collectedBottles > 0;
        return throwKeyPressed && throwAvailable && hasBottles;
    }

    /**
     * Creates and throws a new bottle object.
     */
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

    /**
     * Starts the cooldown after throwing a bottle.
     */
    startThrowCooldown() {
        this.canThrow = false;

        setTimeout(() => {
            this.canThrow = true;
        }, 800);
    }

    /**
     * Calculates the spawn position for a thrown bottle.
     *
     * @returns {{spawnX: number, spawnY: number}} Bottle spawn coordinates.
     */
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

    /**
     * Checks if the character collects a bottle.
     */
    checkCollisionBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 8) {
                this.collectBottle(bottle);
            }
        });
    }

    /**
     * Removes a collected bottle and updates the bottle counter.
     *
     * @param {Bottle} bottle The collected bottle.
     */
    collectBottle(bottle) {
        let index = this.level.bottles.indexOf(bottle);
        if (index !== -1) {
            this.level.bottles.splice(index, 1);
            this.collectedBottles++;
            this.updateStatusbarBottle();
        }
    }

    /**
     * Updates the bottle status bar.
     */
    updateStatusbarBottle() {
        let percentage = (this.collectedBottles / 8) * 100;
        this.statusBarBottle.setPercentage(percentage);
    }

    /**
     * Checks if the character collects a coin.
     */
    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.collectedCoins < 8) {
                this.collectCoin(coin);
            }
        });
    }

    /**
     * Removes a collected coin and updates the coin counter.
     *
     * @param {Coin} coin The collected coin.
     */
    collectCoin(coin) {
        let index = this.level.coins.indexOf(coin);
        if (index !== -1) {
            this.level.coins.splice(index, 1);
            this.collectedCoins++;
            this.updateStatusbarCoin();
        }
    }

    /**
     * Updates the coin status bar.
     */
    updateStatusbarCoin() {
        let percentage = (this.collectedCoins / 8) * 100;
        this.statusBarCoin.setPercentage(percentage);
    }

    /**
     * Checks collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        checkEnemyCollisions(this);
    }

    /**
     * Checks collisions between thrown bottles and enemies.
     */
    checkCollisionBottlesWithEnemies() {
        checkCollisionBottlesWithEnemies(this);
    }

    /**
     * Draws all game elements onto the canvas.
     */
    drawWorld() {
        this.clearCanvas();
        this.drawBackgroundObjects();
        this.drawStatusBars();
        this.drawGameObjects();
        this.requestNextFrame();
    }

    /**
     * Clears the canvas before rendering a new frame.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws all background objects.
     */
    drawBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws all status bars.
     */
    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Draws all active game objects.
     */
    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Requests the next animation frame.
     */
    requestNextFrame() {
        let self = this;

        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }

    /**
     * Draws multiple objects on the canvas.
     *
     * @param {Array<DrawableObject>} objects Objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Draws a single object on the canvas.
     *
     * @param {DrawableObject} mo The moveable object to draw.
     */
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

    /**
     * Flips an object horizontally before rendering.
     *
     * @param {DrawableObject} mo The moveable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original canvas state after flipping.
     *
     * @param {DrawableObject} mo The moveable object being restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Starts the background music.
     */
    playBackgroundMusic() {
        if (!soundEnabled) return;
        this.background_music.currentTime = 0;
        this.background_music.play().catch(e => {
            console.warn("Background music konnte nicht abgespielt werden:", e);
        });
    }

    /**
     * Stops the background music.
     */
    stopBackgroundMusic() {
        this.background_music.pause();
        this.background_music.currentTime = 0;
    }

    /**
     * Displays the game over or victory screen.
     *
     * @param {string} type Screen type ('win' or 'lose').
     */
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

    /**
     * Updates the end screen appearance.
     *
     * @param {HTMLElement} screen The end screen element.
     * @param {string} type Screen type.
     */
    displayEndScreen(screen, type) {
        screen.classList.remove('win', 'lose');
        screen.classList.add(type);
        screen.classList.remove('d-none');
    }

    /**
     * Hides mobile controls and sound controls.
     *
     * @param {HTMLElement} soundIcon The sound control element.
     * @param {HTMLElement} mobilePanel The mobile control panel.
     */
    hideGameControls(soundIcon, mobilePanel) {
        mobilePanel.classList.add('d-none');
        soundIcon.classList.add('d-none');

        this.character.stopAllSounds();
    }

    /**
     * Stops all active game objects and animations.
     */
    stopGameObjects() {
        [...this.level.enemies, ...this.level.clouds].forEach(object => {
            object.isStopped = true;

            if (object instanceof Endboss) {
                object.stopAllAnimations();
            }
        });
    }

}