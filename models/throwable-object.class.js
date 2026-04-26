class ThrowableObject extends MoveableObject {

    height = 60;
    width = 50;

    salsa_bottle_rotation_images = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    salsa_bottle_splash = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]


    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.salsa_bottle_rotation_images);
        this.loadImages(this.salsa_bottle_splash);
        //this.throw();
        this.throwInterval = null;
        this.offsetX = 15;
        this.offsetY = 10;
        this.offsetWidth = 31;
        this.offsetHeight = 20;
    }


    throwAnimate() {
        this.speedY = 25;
        this.applyGravity();

        this.throwInterval = setInterval(() => {
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
            this.playAnimation(this.salsa_bottle_rotation_images);
        }, 25);
    }

    bottleSplashAnimate() {
        this.playAnimation(this.salsa_bottle_splash);
    }

    deactivateBottleMovement() {
        clearInterval(this.throwInterval);
        this.throwInterval = null;
        this.speedX = 0
        this.speedY = 0
    }

}