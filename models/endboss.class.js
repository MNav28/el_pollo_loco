class Endboss extends MoveableObject {
    y = -20;
    height = 480;
    width = 320;
    moveInterval;
    //animationInterval;
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

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.endboss_cry = new Audio('./assets/audio/endboss_cry.mp3');
        this.winning_sound = new Audio('./assets/audio/winning_sound.mp3');
        this.speed = 1.2;
        this.x = 2900;
        this.offsetX = 40;
        this.offsetY = 130;
        this.offsetWidth = 70;
        this.offsetHeight = 140;
        this.isCurrentlyHurt = false;
        this.frameInterval = 200;
        this.totalCycles = 2;
        //this.animate();
        // Für Bewegung
        this.moveDistance = 0;
        this.direction = 1; // 1 = right, -1 = left
        this.maxDistance = 400;
        this.isAlreadyDead = false;
        this.hurtInterval = null;
        this.deathAnimationInterval = null;
        this.walkingAnimationInterval = null;
        this.isAlerting = false;
        this.alertAnimationInterval = null;
    }


    animate() {
        this.moveInterval = setInterval(() => {
            const character = this.world.character;
            const distance = Math.abs(this.x - character.x);
            if (distance <= 300 && !this.isCurrentlyHurt) {
                if (!this.isAlerting) {
                    this.stopWalkingAnimation();
                    this.faceCharacter(character);
                    this.isAlerting = true;
                    this.startAlertAnimation();
                }
            } else if (!this.isCurrentlyHurt) {
                if (this.isAlerting) {
                    this.isAlerting = false;
                    this.stopAlertAnimation();
                }
                this.startWalking();
            }
        }, 1000 / 60);
    }


    startWalking() {
        // movement
        if (this.direction === 1) {
            this.moveRight();
            this.otherDirection = true;
        } else {
            this.moveLeft();
            this.otherDirection = false;
        }

        this.moveDistance += this.speed;
        if (this.moveDistance >= this.maxDistance) {
            this.direction *= -1; // change direction
            this.moveDistance = 0;
        }

        // start walk Animation if not aktiv
        if (!this.walkingAnimationInterval) {
            this.walkingAnimationInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, this.frameInterval);
        }
    }


    faceCharacter(character) {
        if (character.x < this.x) {
            this.otherDirection = false;
            this.direction = -1;
        } else {
            this.otherDirection = true;
            this.direction = 1;
        }
    }


    startAlertAnimation() {
        if (this.alertAnimationInterval) return; // is already active
        this.alertAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 150);
    }


    stopAlertAnimation() {
        clearInterval(this.alertAnimationInterval);
        this.alertAnimationInterval = null;
    }


    stopWalkingAnimation() {
        if (this.walkingAnimationInterval) {
            clearInterval(this.walkingAnimationInterval);
            this.walkingAnimationInterval = null;
        }
    }


    hurtAnimation() {
        if (this.isDead() || this.isCurrentlyHurt) {
            return;
        }
        this.isCurrentlyHurt = true;
        let i = 0;
        let totalFrames = this.IMAGES_HURT.length * this.totalCycles;
        this.hurtInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_HURT[i % this.IMAGES_HURT.length]];
            i++;
            if (i >= totalFrames) {
                clearInterval(this.hurtInterval);
                this.hurtInterval = null;
                this.isCurrentlyHurt = false;
            }
        }, this.frameInterval);
    }


    hit() {
        if (this.isDead()) {
            if (this.isAlreadyDead) return;
            console.log('you won the game');
            this.stopAlertAnimation();
            this.stopWalkingAnimation();
            this.stopHurtAnimation();
            clearInterval(this.moveInterval);
            this.playDeathAnimation();
            this.isAlreadyDead = true;

            this.world.stopBackgroundMusic(); // stop background music
            this.world.character.stopAllActions(); // deactivate character

            setTimeout(() => {
                this.showWinningScreen();
            }, 1200);

            return;
        }

        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = new Date().getTime();
        this.hurtAnimation();
    }


    playDeathAnimation() {
        if (this.deathAnimationInterval) return;
        let i = 0;
        console.log('death animation showed');
        this.deathAnimationInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_DEAD[i]];
            i++;
            if (i >= this.IMAGES_DEAD.length) {
                clearInterval(this.deathAnimationInterval);
                this.deathAnimationInterval = null;
            }
        }, this.frameInterval);
    }


    stopHurtAnimation() {
        if (this.hurtInterval) {
            clearInterval(this.hurtInterval);
            this.hurtInterval = null;
            this.isCurrentlyHurt = false;
        }
    }

    playCrySound() {
        if (!soundEnabled) return;
        this.endboss_cry.currentTime = 0;
        this.endboss_cry.play().catch(e => {
            console.warn('Endboss cry sound konnte nicht abgespielt werden:', e);
        });
    }

    showWinningScreen() {
        const winningScreen = document.getElementById('winning-screen');
        // const soundButton = document.getElementById('sound-button');
        isGameActive = false;
        world.stopBackgroundMusic();
        this.playWinningSound();
        winningScreen.classList.remove('d-none');
        // soundButton.classList.add('d-none');
    }

    playWinningSound() {
        this.winning_sound.pause();
        this.winning_sound.currentTime = 0;
        if (!soundEnabled) return;
        this.winning_sound.play().catch((e) => {
            console.warn('Winning sound konnte nicht abgespielt werden:', e);
        });
    }

}