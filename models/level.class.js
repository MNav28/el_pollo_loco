/**
 * Represents a game level and stores all level objects.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 2900; 

    /**
     * Creates a new level with all game objects.
     *
     * @param {MoveableObject[]} enemies - All enemies in the level.
     * @param {Cloud[]} clouds - All clouds in the level.
     * @param {BackgroundObject[]} backgroundObjects - Background elements of the level.
     * @param {Bottle[]} bottles - Collectible bottles in the level.
     * @param {Coin[]} coins - Collectible coins in the level.
     */    
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }

    
}