class Endboss extends MoveableObject {
    y = -20;
    height = 480;
    width = 320;
    moveInterval;
    animationInterval;
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
        this.walkingAnimationInterval = null; // Walking-Animations-Intervall
    }


    animate() {
        this.moveInterval = setInterval(() => {
            const character = this.world.character;
            const distance = Math.abs(this.x - character.x);

            if (distance > 300 && !this.isCurrentlyHurt) {
                this.startWalking();
            } else {
                this.stopWalkingAnimation();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            const character = this.world.character;

            if (!this.isCurrentlyHurt) {
                this.playHurtIfNeeded();
                this.playAlertIfNear(character);
            }
        }, this.frameInterval);
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


    playHurtIfNeeded() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
    }


    playAlertIfNear(character) {
        const distance = Math.abs(this.x - character.x);

        if (distance <= 300 && !this.isCurrentlyHurt) {
            if (this.direction === 1 && character.x < this.x) {
                this.otherDirection = true;  
            } else if (this.direction === -1 && character.x > this.x) {
                this.otherDirection = false;
            }

            this.playAnimation(this.IMAGES_ALERT);
        }
    }


    stopWalkingAnimation() {
        if (this.walkingAnimationInterval) {
            clearInterval(this.walkingAnimationInterval);
            this.walkingAnimationInterval = null;
        }
    }


    hurtAnimation() {
        if (this.isCurrentlyHurt) {
            return;
        }
        this.isCurrentlyHurt = true;
        let i = 0;
        let totalFrames = this.IMAGES_HURT.length * this.totalCycles;
        const hurtInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_HURT[i % this.IMAGES_HURT.length]];
            i++;
            if (i >= totalFrames) {
                clearInterval(hurtInterval);
                this.isCurrentlyHurt = false;
            }
        }, this.frameInterval);
    }


    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

}