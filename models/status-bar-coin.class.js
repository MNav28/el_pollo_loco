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

    percentage = 100;


    constructor() {
        super();     
        this.loadImages(this.IMAGES_STATUSBAR_COIN);    
        this.setPercentage(100); 
    }

    // setPercentage(50);
    setPercentage(percentage) {  // um das jeweilige image anzuzeigen aus dem array
        this.percentage = percentage;  // => 0 ...5
        let path = this.IMAGES_STATUSBAR_COIN[this.getImageIndex()];  
        this.img = this.imageCache[path];
    }

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