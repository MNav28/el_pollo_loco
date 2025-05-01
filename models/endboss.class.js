class Endboss extends MoveableObject {
    y = -20;
    height = 480;
    width = 320;
    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);   
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2900;  
        this.offsetX = 40;
        this.offsetY = 130;
        this.offsetWidth = 70;
        this.offsetHeight = 140;
        this.isCurrentlyHurt = false;
        this.frameInterval = 200;
        this.totalCycles = 2;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isCurrentlyHurt) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, this.frameInterval);
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