class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;  

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;      
        this.movingCloud();
    }

    movingCloud() {
        setInterval(() => {
            this.x -= this.speed; 
        }, 1000/60);  
    }
   
}