class DrawableObject {
    img; // das aktuelle Bild
    imageCache = {}; // zum zwischenspeichern von Bildern; chache = Zwischenspeicher
    currentImage = 0;
    x = 100;
    y = 250;
    height = 150;
    width = 100;




    loadImage(path) {
        this.img = new Image()
        this.img.src = path;
    }

    drawObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ChickenSmall || this instanceof Bottle || this instanceof Coin || this instanceof Endboss  || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offsetX,
                this.y + this.offsetY,
                this.width - this.offsetWidth, 
                this.height - this.offsetHeight 
            );
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}