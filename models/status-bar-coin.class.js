/**
 * Displays the collected coin status bar.
 * Updates the displayed image based on the current coin percentage.
 */
class StatusBarCoin extends DrawableObject {
    x = 30;
    y = 80;
    width = 200;
    height = 60;

    IMAGES_STATUSBAR_COIN = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    percentage = 0;

    /**
     * Creates the coin status bar and loads all coin bar images.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_COIN);
        this.setPercentage(0);
    }

    /**
     * Updates the coin percentage and displays the corresponding image.
     *
     * @param {number} percentage - Current coin percentage.
     */ 
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_COIN[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the image index for the current coin percentage.
     *
     * @returns {number} Index of the coin status bar image.
     */
    getImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}