/**
 * Represents a cloud that continuously moves across the background.
 */
class Cloud extends MoveableObject {
    width = 500;
    height = 250;

    CLOUDS_FLOATING = [
        './assets/img/5_background/layers/4_clouds/1.png',
        './assets/img/5_background/layers/4_clouds/2.png',
    ]

    /**
     * Creates a new cloud at the given position.
     *
     * @param {number} x - Horizontal position of the cloud.
     * @param {number} y - Vertical position of the cloud.
     * @param {number} [imageIndex=0] - Index of the cloud image to display.
     */    
    constructor(x, y, imageIndex = 0) {
        super();
        this.loadImage(this.CLOUDS_FLOATING[imageIndex % this.CLOUDS_FLOATING.length]);
        this.loadImages(this.CLOUDS_FLOATING);
        this.isStopped = false;
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Starts the cloud movement animation.
     * Moves the cloud to the left and repositions it
     * when it leaves the visible game area.
     */    
    animate() {
        setInterval(() => {
            if (this.isStopped) return;
            this.moveLeft();
            if (this.x + this.width < 0) {
                this.x += 3400;
            }
        }, 1000 / 60);
    }

}