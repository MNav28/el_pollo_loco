class Bottle extends MoveableObject {

    salsa_bottle_images = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 
    ]

    constructor(x) {
        super();
        let randomIndex = Math.floor(Math.random() * this.salsa_bottle_images.length);
        this.loadImage(this.salsa_bottle_images[randomIndex]);
        this.x = x;
        this.y = 360;
        this.width = 50;
        this.height = 60;
        

    }
}