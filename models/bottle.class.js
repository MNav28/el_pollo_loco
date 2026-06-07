/**
 * Represents a collectible salsa bottle in the game world.
 */
class Bottle extends MoveableObject {

    SALSA_BOTTLE_IMAGES = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 
    ]

    /**
     * Creates a new bottle at the given x position
     * and randomly selects one of the bottle images.
     *
     * @param {number} x - Horizontal position of the bottle.
     */    
    constructor(x) {
        super();
        let randomIndex = Math.floor(Math.random() * this.SALSA_BOTTLE_IMAGES.length);
        this.loadImage(this.SALSA_BOTTLE_IMAGES[randomIndex]);
        this.x = x;
        this.y = 360;
        this.width = 50;
        this.height = 60;
        this.offsetX = 15;
        this.offsetY = 10;
        this.offsetWidth = 31;
        this.offsetHeight = 20;

    }
}