/**
 * Represents a normal chicken enemy that walks through the level
 * and can be defeated by the character.
 */
class Chicken extends MoveableObject {
    y = 360;
    height = 60;
    width = 80;
    moveInterval;
    animationInterval;
    
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD_CHICKEN =  './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'

    /**
     * Creates a new chicken enemy at the given x position.
     *
     * @param {number} x - Horizontal position of the enemy.
     */    
    constructor(x) {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.25;
        this.isStopped = false;
        this.animate();
        this.offsetX = 10;
        this.offsetY = 10;
        this.offsetWidth = 30;
        this.offsetHeight = 20;
    }

    /**
     * Starts the movement and walking animation of the enemy.
     */
    animate() {
        this.moveInterval = setInterval(() => {
            if (this.isStopped) return;
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (this.isStopped) return;
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * Sets the enemy to its dead state and stops all animations.
     */    
    setDeadState() {
        this.loadImage(this.IMAGE_DEAD_CHICKEN);
        this.energy = 0;
    
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        this.speed = 0;
    }
}