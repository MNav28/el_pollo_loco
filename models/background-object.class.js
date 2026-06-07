/**
 * Represents a static background element in the game world.
 * Background objects are used to build the scrolling scenery.
 */
class BackgroundObject extends MoveableObject{

    width = 720; 
    height = 480;  

    /**
     * Creates a new background object.
     *
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background object.
     */    
    constructor(imagePath, x) {  
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; 
    }
}