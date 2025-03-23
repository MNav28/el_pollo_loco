class Coin extends MoveableObject {


    coin_images = [
        './assets/img/8_coin/coin_1.png', 
        './assets/img/8_coin/coin_2.png', 
    ];

    constructor() {
        super();
        this.loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.coin_images);
        this.x = Math.random() * 2400;
        this.y = Math.random() * 330;
        this.height = 80;
        this.width = 80;
        this.animate();
    }

    animate() {

        setInterval(() => {
           this.playAnimation(this.coin_images);
       }, 500);

   };

}