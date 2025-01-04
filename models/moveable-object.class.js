class MoveableObject {   
    x = 100;
    y = 400;
    img;
    
    loadImage(path) {               
        this.img = new Image() 
        this.img.src = path;
    }                           

    moveRight() {
        console.log('moveing right');
    }

    moveLeft() {
        console.log('moveing left ');
    }
}