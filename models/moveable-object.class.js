class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    constructor() {
        super();
        this.isDeadAlready = false;
        this.chicken_killed_sound = new Audio('./assets/audio/kill_enemy.mp3');
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 150;
        }
    }
 

    isColliding(obj) {
        return (this.x + this.offsetX + this.width - this.offsetWidth) >= (obj.x + obj.offsetX) &&
            (this.x + this.offsetX) <= (obj.x + obj.offsetX + obj.width - obj.offsetWidth) &&
            (this.y + this.offsetY + this.height - this.offsetHeight) >= (obj.y + obj.offsetY) &&
            (this.y + this.offsetY) <= (obj.y + obj.offsetY + obj.height - obj.offsetHeight);
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }

    
    playChickenKilledSound() {
        if (!soundEnabled) return;
        this.chicken_killed_sound.currentTime = 0;
        this.chicken_killed_sound.play().catch(e => {
            console.warn('Chicken killed sound konnte nicht abgespielt werden:', e);
        });
    }
}
