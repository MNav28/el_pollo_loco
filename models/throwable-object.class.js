class ThrowableObject extends MoveableObject {

    height = 60;
    width = 50;
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.throw();
    }

    throw() {  
        this.speedY = 25 ;        
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}