/**
 * Represents a collectible coin in the game world.
 * Coins are placed at random positions and animated continuously.
 */
class Coin extends MoveableObject {


    COIN_IMAGES = [
        './assets/img/8_coin/coin_1.png', 
        './assets/img/8_coin/coin_2.png', 
    ];

    /**
     * Creates a new coin with a random position
     * and starts its animation.
     */    
    constructor() {
        super();
        this.loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = Math.random() * 2400;
        this.y = Math.random() * (330 - 50) + 50;
        this.height = 80;
        this.width = 80;
        this.offsetX = 28;
        this.offsetY = 25;
        this.offsetWidth = 52;
        this.offsetHeight = 50;
        this.animate();
    }

    /**
     * Starts the coin animation by alternating
     * between the available coin images.
     */    
    animate() {

        setInterval(() => {
           this.playAnimation(this.COIN_IMAGES);
       }, 500);

   };

}