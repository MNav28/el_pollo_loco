/**
 * Represents the final boss enemy of the game.
 * The Endboss can patrol, detect the character, chase the player,
 * take damage, play animations and trigger the winning screen when defeated.
 */
class Endboss extends MoveableObject {
    y = -20;
    height = 480;
    width = 320;
    moveInterval;

    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    /**
     * Creates a new Endboss instance and initializes
     * images, sounds, movement settings and animation states.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.endboss_cry = new Audio('./assets/audio/endboss_cry.mp3');
        this.winning_sound = new Audio('./assets/audio/winning_sound.mp3');
        this.speed = 1.2;
        this.chaseSpeed = 9;
        this.maxChaseSpeed = 11;
        this.x = 2900;
        this.offsetX = 40;
        this.offsetY = 130;
        this.offsetWidth = 70;
        this.offsetHeight = 140;
        this.isCurrentlyHurt = false;
        this.frameInterval = 200;
        this.isChasing = false;
        this.totalCycles = 2;
        this.moveDistance = 0;
        this.direction = 1;
        this.maxDistance = 400;
        this.isAlreadyDead = false;
        this.hurtInterval = null;
        this.deathAnimationInterval = null;
        this.walkingAnimationInterval = null;
        this.isAlerting = false;
        this.alertAnimationInterval = null;
    }

    /**
     * Starts the main endboss behavior loop.
     * Handles patrolling, alert mode and chasing logic.
     */
    animate() {
        this.moveInterval = setInterval(() => {
            const character = this.world.character;
            const distance = Math.abs(this.x - character.x);

            if (handleChasing(this, character)) return;
            if (distance <= 500 && !this.isCurrentlyHurt) {

                handleAlertState(this, character);
                return;
            }
            handlePatrolState(this);
        }, 1000 / 60);
    }

    /**
     * Starts the walking movement and patrol direction logic.
     */
    startWalking() {
        this.stopAlertAnimation();
        if (this.direction === 1) {
            this.moveRight();
            this.otherDirection = true;
        } else {
            this.moveLeft();
            this.otherDirection = false;
        }

        this.moveDistance += this.speed;
        if (this.moveDistance >= this.maxDistance) {
            this.direction *= -1;
            this.moveDistance = 0;
        }

        this.startWalkingAnimation();
    }

    /**
     * Starts the walking animation loop.
     */
    startWalkingAnimation() {
        if (this.walkingAnimationInterval) return;

        this.walkingAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, this.frameInterval);
    }

    /**
     * Exits the alert state and resumes normal behavior.
     */
    leaveAlertState() {
        if (this.isAlerting) {
            this.isAlerting = false;
            this.stopAlertAnimation();
        }
    }

    /**
     * Ensures that the walking animation is running.
     */
    ensureWalkingAnimation() {
        if (!this.walkingAnimationInterval) {

            this.startWalkingAnimation();
        }
    }

    /**
     * Stops all running endboss animations and movement intervals.
     */
    stopAllAnimations() {
        this.stopWalkingAnimation();
        this.stopAlertAnimation();
        this.stopHurtAnimation();
        clearInterval(this.moveInterval);
    }

    /**
     * Starts the alert animation loop.
     */
    startAlertAnimation() {
        if (this.alertAnimationInterval) return;
        this.stopWalkingAnimation();

        let frame = 0;

        this.alertAnimationInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_ALERT[frame]];
            frame++;
            if (frame >= this.IMAGES_ALERT.length) {
                clearInterval(this.alertAnimationInterval);
                this.alertAnimationInterval = null;
                this.isChasing = true;
            }
        }, 150);
    }

    /**
     * Stops the alert animation loop.
     */
    stopAlertAnimation() {
        clearInterval(this.alertAnimationInterval);
        this.alertAnimationInterval = null;
    }

    /**
     * Stops the walking animation loop.
     */
    stopWalkingAnimation() {
        if (this.walkingAnimationInterval) {
            clearInterval(this.walkingAnimationInterval);
            this.walkingAnimationInterval = null;
        }
    }

    /**
     * Plays the hurt animation sequence.
     */
    hurtAnimation() {
        if (this.isDead() || this.isCurrentlyHurt) {
            return;
        }

        this.prepareHurtState();
        this.startHurtAnimation();
    }

    /**
     * Prepares the endboss for the hurt state.
     */
    prepareHurtState() {
        this.isCurrentlyHurt = true;
        this.stopWalkingAnimation();
        this.stopAlertAnimation();
    }

    /**
     * Starts the hurt animation cycle.
     */
    startHurtAnimation() {
        let currentFrame = 0;
        let totalFrames = this.IMAGES_HURT.length * this.totalCycles;

        this.hurtInterval = setInterval(() => {
            this.playHurtFrame(currentFrame);
            currentFrame++;
            if (currentFrame >= totalFrames) {
                this.finishHurtAnimation();
            }
        }, this.frameInterval);
    }

    /**
     * Displays a single hurt animation frame.
     *
     * @param {number} currentFrame Current animation frame index.
     */
    playHurtFrame(currentFrame) {
        let imageIndex = currentFrame % this.IMAGES_HURT.length;

        this.img = this.imageCache[
            this.IMAGES_HURT[imageIndex]
        ];
    }

    /**
     * Ends the hurt animation and restores normal behavior.
     */
    finishHurtAnimation() {
        clearInterval(this.hurtInterval);
        this.hurtInterval = null;
        this.isCurrentlyHurt = false;
        this.startWalkingAnimation();
    }

    /**
     * Applies damage to the endboss and triggers
     * chase mode, hurt animation or death handling.
     */
    hit() {
        this.reduceEnergy();
        this.activateChaseMode();

        if (this.isDead()) {
            this.handleDeath();
            return;
        }

        this.hurtAnimation();
    }

    /**
     * Reduces the endboss health points.
     */
    reduceEnergy() {
        this.energy -= 10;

        if (this.energy < 0) {
            this.energy = 0;
        }

        this.lastHit = new Date().getTime();
    }

    /**
     * Activates chase mode and increases chase speed.
     */
    activateChaseMode() {
        this.isChasing = true;

        if (this.chaseSpeed < this.maxChaseSpeed) {
            this.chaseSpeed += 0.9;
        }
    }

    /**
     * Handles the death state of the endboss.
     */
    handleDeath() {
        if (this.isAlreadyDead) {
            return;
        }

        this.stopAllAnimations();
        this.playDeathAnimation();
        this.isAlreadyDead = true;
        this.world.stopBackgroundMusic();
        this.world.character.stopCharacter();
        this.showWinningScreenWithDelay();
    }

    /**
     * Displays the winning screen after a short delay.
     */
    showWinningScreenWithDelay() {
        setTimeout(() => {
            this.showWinningScreen();
        }, 1200);
    }

    /**
     * Plays the death animation.
     */
    playDeathAnimation() {
        if (this.deathAnimationInterval) return;
        let i = 0;
        this.deathAnimationInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_DEAD[i]];
            i++;
            if (i >= this.IMAGES_DEAD.length) {
                clearInterval(this.deathAnimationInterval);
                this.deathAnimationInterval = null;
            }
        }, this.frameInterval);
    }

    /**
     * Stops the hurt animation if active.
     */
    stopHurtAnimation() {
        if (this.hurtInterval) {
            clearInterval(this.hurtInterval);
            this.hurtInterval = null;
            this.isCurrentlyHurt = false;
        }
    }

    /**
     * Plays the endboss cry sound.
     */
    playCrySound() {
        if (!soundEnabled) return;
        this.endboss_cry.currentTime = 0;
        this.endboss_cry.play().catch(e => {
            console.warn('Endboss cry sound konnte nicht abgespielt werden:', e);
        });
    }

    /**
     * Displays the winning screen after defeating the endboss.
     */
    showWinningScreen() {
        this.world.showEndScreen('win');
        this.playWinningSound();
    }

    /**
     * Plays the winning sound effect.
     */
    playWinningSound() {
        this.winning_sound.pause();
        this.winning_sound.currentTime = 0;
        if (!soundEnabled) return;
        this.winning_sound.play().catch((e) => {
            console.warn('Winning sound konnte nicht abgespielt werden:', e);
        });
    }


}