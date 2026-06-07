/**
 * Displays the endboss health status bar and updates
 * the displayed image based on the current health percentage.
 */
class StatusBarEndboss extends DrawableObject {
    x = 500;
    y = 8;
    width = 200;
    height = 60;

    IMAGES_STATUSBAR_ENDBOSS = [
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    percentage = 100;


    /**
    * Creates a new endboss status bar and loads all status bar images.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.setPercentage(100);
    }

    /**
    * Updates the current health percentage and displays
    * the corresponding status bar image.
    *
    * @param {number} percentage Current health percentage of the endboss.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_ENDBOSS[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Returns the image index that matches the current health percentage.
    *
    * @returns {number} Index of the status bar image.
    */
    getImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 1) {
            return 1;
        } else {
            return 0;
        }
    }


}