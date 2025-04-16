class ChickenSmall extends MoveableObject {
    y = 370;
    height = 50;
    width = 60;
    moveInterval;
    animationInterval;
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png', 
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD_CHICKEN =  './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'

    constructor(x) {
        super();
        this.loadImage('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speed = 0.65 + Math.random() * 0.25;
        this.animate();
        this.offsetX = 10;
        this.offsetY = 10;
        this.offsetWidth = 30;
        this.offsetHeight = 20;
    }

    animate() {
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    setDeadState() {
        this.loadImage(this.IMAGE_DEAD_CHICKEN);  
        this.energy = 0;
    
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        this.speed = 0;
    }
}