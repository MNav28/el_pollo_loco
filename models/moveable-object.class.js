/**
 * Base class for all movable game objects.
 * Provides movement, gravity, collision detection,
 * health management and animation functionality.
 */
class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Creates a new movable object.
     */
    constructor() {
        super();
        this.isDeadAlready = false;
        this.chicken_killed_sound = new Audio('./assets/audio/kill_enemy.mp3');
    }

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }

    /**
     * Checks whether the object is above the ground.
     *
     * @returns {boolean} True if the object is above ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 150;
        }
    }

    /**
     * Checks whether this object collides with another object.
     *
     * @param {MoveableObject} obj - Object to check collision against.
     * @returns {boolean} True if both objects overlap.
     */
    isColliding(obj) {
        return (this.x + this.offsetX + this.width - this.offsetWidth) >= (obj.x + obj.offsetX) &&
            (this.x + this.offsetX) <= (obj.x + obj.offsetX + obj.width - obj.offsetWidth) &&
            (this.y + this.offsetY + this.height - this.offsetHeight) >= (obj.y + obj.offsetY) &&
            (this.y + this.offsetY) <= (obj.y + obj.offsetY + obj.height - obj.offsetHeight);
    }

    /**
     * Reduces the object's energy by the given damage amount.
     *
     * @param {number} [damage=7] - Amount of damage to apply.
     */
    hit(damage = 7) {
        this.energy -= damage;

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether the object is dead.
     *
     * @returns {boolean} True if energy is zero.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks whether the object was hit recently.
     *
     * @returns {boolean} True if the hurt state is still active.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Plays an animation by cycling through image frames.
     *
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Plays the chicken defeated sound effect.
     */
    playChickenKilledSound() {
        if (!soundEnabled) return;
        this.chicken_killed_sound.currentTime = 0;
        this.chicken_killed_sound.play().catch(e => {
            console.warn('Chicken killed sound konnte nicht abgespielt werden:', e);
        });
    }

    
}
