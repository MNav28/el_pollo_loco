/**
 * Displays the collected bottle status bar.
 * Updates the displayed image based on the current bottle percentage.
 */
class StatusBarBottle extends DrawableObject {
    x = 30;
    y = 0;
    width = 200;
    height = 60;

    IMAGES_STATUSBAR_BOTTLE = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];

    percentage = 0;

    /**
     * Creates the bottle status bar and loads all bottle bar images.
     */    
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_BOTTLE);
        this.setPercentage(0);
    }

    /**
     * Updates the bottle percentage and displays the corresponding image.
     *
     * @param {number} percentage - Current bottle percentage.
     */    
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_BOTTLE[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Returns the image index for the current bottle percentage.
     *
     * @returns {number} Index of the bottle status bar image.
     */    
    getImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }

}