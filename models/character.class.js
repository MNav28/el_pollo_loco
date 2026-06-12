/**
 * Represents the playable character Pepe.
 * Handles movement, animations, sounds, collisions and character states.
 */
class Character extends MoveableObject {
    height = 280;
    width = 120;
    y = 155;
    speed = 10;
    lastBounce = 0;

    IMAGES_WALKING = IMAGES_WALKING;
    IMAGES_JUMPING = IMAGES_JUMPING;
    IMAGES_DEAD = IMAGES_DEAD;
    IMAGES_HURT = IMAGES_HURT;
    IMAGES_IDLE = IMAGES_IDLE;
    IMAGES_LONG_IDLE = IMAGES_LONG_IDLE;

    world;

    /**
     * Creates the player character and initializes
     * images, sounds, physics and animations.
     */
    constructor() {
        super();
        this.walking_sound = new Audio('./assets/audio/walking1.mp3');
        this.jump_sound = new Audio('./assets/audio/jump.mp3');
        this.collecting_sound = new Audio('./assets/audio/collecting.mp3');
        this.snoring_sound = new Audio('./assets/audio/snoring.mp3');
        this.hurt_sound = new Audio('./assets/audio/hurt.mp3');
        this.gameover_sound = new Audio('./assets/audio/game_over_sound.mp3');
        this.isJumpSoundPlayed = false;
        this.isSnoringSoundPlaying = false;
        this.lastCollectedCoins = 0;
        this.lastCollectedBottles = 0;
        this.isStopped = false;
        this.isDeadAlreadyHandled = false;
        this.loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.offsetX = 35;
        this.offsetY = 130;
        this.offsetWidth = 65;
        this.offsetHeight = 140;
        this.idleTime = 0;
    }

    /**
     * Starts all character animation and update loops.
     */
    animate() {
        this.animateMovement();
        this.animateCharacterStates();
        this.animateIdle();
        this.animateLongIdle();
        this.trackIdleTime();

        setInterval(() => {
            this.handleSnoringSound();
        }, 200);
    }

    /**
     * Handles character movement and movement-related sounds.
     */
    animateMovement() {
        setInterval(() => {
            if (this.isStopped) return;

            this.handleMovementInput();
            this.updateCameraPosition();
            this.handleMovementSounds();
        }, 1000 / 60);
    }

    /**
     * Processes player movement input.
     */
    handleMovementInput() {
        this.handleMoveRight();
        this.handleMoveLeft();
        this.handleJumpInput();
    }

    /**
     * Moves the character to the right.
     */
    handleMoveRight() {
        if (this.world.keyboard.RIGHT &&
            this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /**
     * Moves the character to the left.
     */
    handleMoveLeft() {
        if (this.world.keyboard.LEFT &&
            this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /**
     * Triggers a jump when the jump key is pressed.
     */
    handleJumpInput() {
        if (this.world.keyboard.SPACE &&
            !this.isAboveGround()) {

            this.jump();
        }
    }

    /**
     * Updates the camera position based on the character position.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Updates all movement-related sound effects.
     */
    handleMovementSounds() {
        this.handleWalkingSound();
        this.handleJumpSound();
        this.handleCollectingSound();
    }

    /**
     * Plays animations depending on the current character state.
     */
    animateCharacterStates() {
        setInterval(() => {
            if (this.isStopped) return;

            if (this.handleDeadState()) return;

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playJumpAnimation();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    /**
     * Handles the death animation and death logic.
     *
     * @returns {boolean} True if the character is dead.
     */
    handleDeadState() {
        if (!this.isDead()) {
            return false;
        }

        this.playAnimation(this.IMAGES_DEAD);
        this.handleCharacterDeath();
        return true;
    }

    /**
     * Executes character death actions once.
     */
    handleCharacterDeath() {
        if (this.isDeadAlreadyHandled) {
            return;
        }
        this.isDeadAlreadyHandled = true;
        this.stopCharacter();
        this.world.stopBackgroundMusic();
        setTimeout(() => {
            this.showGameoverScreen();
        }, 1200);
    }

    /**
     * Plays the normal idle animation.
     */
    animateIdle() {
        setInterval(() => {
            if (this.isStopped) return;
            if (this.isIdle() && !this.isLongIdle()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);
    }

    /**
     * Plays the long idle animation.
     */
    animateLongIdle() {
        setInterval(() => {
            if (this.isStopped) return;
            if (this.isLongIdle()) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        }, 200);
    }

    /**
     * Tracks how long the character has been idle.
     */
    trackIdleTime() {
        setInterval(() => {
            if (this.isIdle()) {
                this.idleTime += 100;
            } else {
                this.idleTime = 0;
            }
        }, 100);
    }

    /**
     * Checks whether the character is currently idle.
     *
     * @returns {boolean} True if the character is idle.
     */
    isIdle() {
        return !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.SPACE &&
            !this.isAboveGround() &&
            !this.isHurt() &&
            !this.isDead();
    }

    /**
     * Checks whether the long idle state is active.
     *
     * @returns {boolean} True if the character has been idle long enough.
     */
    isLongIdle() {
        return this.idleTime >= 5000;
    }

    /**
     * Checks whether the character is currently walking.
     *
     * @returns {boolean} True if the character is moving.
     */
    isWalking() {
        return (
            (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
            (this.world.keyboard.LEFT && this.x > 0)
        );
    }

    /**
     * Plays or stops the walking sound.
     */
    handleWalkingSound() {
        if (!soundEnabled) {
            this.walking_sound.pause();
            this.walking_sound.currentTime = 0;
            return;
        }
        if (this.isWalking() && !this.isAboveGround()) {
            if (this.walking_sound.paused) {
                this.walking_sound.play().catch((e) => {
                    console.warn('Laufsound konnte nicht abgespielt werden:', e);
                });
            }
        } else {
            this.walking_sound.pause();
            this.walking_sound.currentTime = 0;
        }
    }

    /**
     * Plays the jump sound once per jump.
     */
    handleJumpSound() {
        if (!soundEnabled) {
            this.jump_sound.pause();
            this.jump_sound.currentTime = 0;
            return;
        }
        if (this.isAboveGround() && !this.isJumpSoundPlayed) {
            this.isJumpSoundPlayed = true;
            this.jump_sound.currentTime = 0;
            this.jump_sound.play().catch((e) => {
                console.warn('Jump sound konnte nicht abgespielt werden:', e);
            });
        }
        if (!this.isAboveGround() && this.isJumpSoundPlayed) {
            this.isJumpSoundPlayed = false;
        }
    }

    /**
     * Plays the collecting sound when coins or bottles are collected.
     */
    handleCollectingSound() {
        if (!soundEnabled || this.isStopped) return;
        let coinsAmountChanged = this.world.collectedCoins > this.lastCollectedCoins;
        let bottlesAmountChanged = this.world.collectedBottles > this.lastCollectedBottles;

        if ((coinsAmountChanged || bottlesAmountChanged)) {
            this.collecting_sound.currentTime = 0;
            this.collecting_sound.play().catch((e) => {
                console.warn('Collecting sound konnte nicht abgespielt werden:', e);
            });
        }
        this.lastCollectedCoins = this.world.collectedCoins;
        this.lastCollectedBottles = this.world.collectedBottles;
    }

    /**
     * Plays or stops the snoring sound during long idle periods.
     */
    handleSnoringSound() {
        if (!soundEnabled || this.isStopped) {
            this.stopSnoringSound();
            return;
        }
        if (this.isLongIdle() && !this.isSnoringSoundPlaying) {
            this.snoring_sound.currentTime = 0;
            this.snoring_sound.play().catch((e) => {
                console.warn('Snoring sound konnte nicht abgespielt werden:', e);
            });
            this.isSnoringSoundPlaying = true;
        }
        if (!this.isLongIdle() && this.isSnoringSoundPlaying) {
            this.stopSnoringSound();
        }
    }

    /**
     * Stops the snoring sound and resets its state.
     */
    stopSnoringSound() {
        this.snoring_sound.pause();
        this.snoring_sound.currentTime = 0;
        this.isSnoringSoundPlaying = false;
    }

    /**
     * Plays the hurt sound effect.
     */
    playHurtSound() {
        if (!soundEnabled || this.isStopped) return;
        this.hurt_sound.currentTime = 0;
        this.hurt_sound.play().catch((e) => {
            console.warn('Hurt sound konnte nicht abgespielt werden:', e);
        });
    }

    /**
     * Stops all character actions.
     */
    stopCharacter() {
        this.isStopped = true;
    }

    /**
     * Stops and resets all character sound effects.
     */
    stopAllSounds() {
        this.walking_sound.pause();
        this.jump_sound.pause();
        this.collecting_sound.pause();
        this.snoring_sound.pause();
        this.hurt_sound.pause();
        this.gameover_sound.pause();

        this.walking_sound.currentTime = 0;
        this.jump_sound.currentTime = 0;
        this.collecting_sound.currentTime = 0;
        this.snoring_sound.currentTime = 0;
        this.hurt_sound.currentTime = 0;
        this.gameover_sound.currentTime = 0;
    }

    /**
     * Displays the game over screen.
     */
    showGameoverScreen() {
        this.stopAllSounds();
        this.stopCharacter();
        this.world.showEndScreen('lose');
        this.playGameoverSound();
    }

    /**
     * Plays the game over sound effect.
     */
    playGameoverSound() {
        this.gameover_sound.pause();
        this.gameover_sound.currentTime = 0;
        if (!soundEnabled) return;
        this.gameover_sound.play().catch((e) => {
            console.warn('Gameover sound konnte nicht abgespielt werden:', e);
        });
    }

    /**
     * Checks whether the character recently bounced on an enemy.
     *
     * @returns {boolean} True if the bounce cooldown is active.
     */
    wasJustBouncing() {
        return new Date().getTime() - this.lastBounce < 300;
    }

    /**
     * Displays the correct jump animation frame.
     */
    playJumpAnimation() {
        let jumpIndex = this.getJumpAnimationIndex();

        this.img = this.imageCache[this.IMAGES_JUMPING[jumpIndex]];
    }

    /**
     * Returns the jump animation frame index
     * based on the current vertical speed.
     *
     * @returns {number} The jump animation frame index.
     */
    getJumpAnimationIndex() {
        if (this.speedY > 26) {
            return 0;
        }
        if (this.speedY > 22) {
            return 1;
        }
        if (this.speedY > 18) {
            return 2;
        }
        if (this.speedY > 14) {
            return 3;
        }
        if (this.speedY > 9) {
            return 4;
        }
        if (this.speedY > 4) {
            return 5;
        }
        if (this.speedY > -4) {
            return 6;
        }
        if (this.speedY > -10) {
            return 7;
        }
        return 8;
    }


}

