class Cloud extends MoveableObject {
    //y = 20;
    width = 500;
    height = 250;

    clouds_floating = [
        './assets/img/5_background/layers/4_clouds/1.png',
        './assets/img/5_background/layers/4_clouds/2.png',
    ]

    constructor(x, y, imageIndex = 0) {
        super();
        this.loadImage(this.clouds_floating[imageIndex % this.clouds_floating.length]);
        this.loadImages(this.clouds_floating);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < 0) {
                this.x += 3400;
            }
        }, 1000 / 60);
    }

}