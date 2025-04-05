class ThrowableObject extends MoveableObject {

    height = 60;
    width = 50;

    salsa_bottle_rotation_images = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]


    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.salsa_bottle_rotation_images);
        //this.throw();
        this.throwInterval = null;
    }

    /*
    throw() {  
        this.speedY = 25 ;        
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }  */

        
    throwAnimate() {
        this.speedY = 25;
        this.applyGravity();

        this.throwInterval = setInterval(() => {
            this.x += 10;
            this.playAnimation(this.salsa_bottle_rotation_images);
        }, 25);
    }
}