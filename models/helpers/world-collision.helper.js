/**
 * Handles enemy collision checks.
 *
 * @param {World} world Current game world.
 */
function checkEnemyCollisions(world) {
    world.level.enemies.forEach((enemy) => {
        handleCharacterEnemyCollision(world, enemy);
        limitCharacterMovementAtEndboss(world, enemy);
    });
}


/**
 * Handles collision between character and enemy.
 *
 * @param {World} world Current game world.
 * @param {MoveableObject} enemy Enemy object.
 */
function handleCharacterEnemyCollision(world, enemy) {
    if (!world.character.isColliding(enemy) || enemy.isDead()) {
        return;
    }
    if (isJumpingOnEnemy(world, enemy) && !(enemy instanceof Endboss)) {
        killChicken(world, enemy);
        bounceCharacter(world);
        return;
    }
    handleEnemyDamage(world, enemy);
}


/**
 * Makes the character bounce after defeating an enemy.
 *
 * @param {World} world Current game world.
 */
function bounceCharacter(world) {
    world.character.speedY = 25;
    world.character.y = 150;
    world.character.lastBounce = new Date().getTime();
}


/**
 * Applies damage to the character after enemy collision.
 *
 * @param {World} world Current game world.
 * @param {MoveableObject} enemy Enemy object.
 */
function handleEnemyDamage(world, enemy) {
    if (world.character.wasJustBouncing()) {
        return;
    }
    if (world.character.isHurt()) {
        return;
    }
    if (enemy instanceof Endboss) {
        world.character.hit(25);
    } else {
        world.character.hit();
    }
    world.character.playHurtSound();
    if (world.character.isStopped) {
        return;
    }
    world.statusBarHealth.setPercentage(
        world.character.energy
    );
}


/**
 * Prevents character from moving behind the endboss.
 *
 * @param {World} world Current game world.
 * @param {Endboss} enemy Endboss object.
 */
function limitCharacterMovementAtEndboss(world, enemy) {
    if (!(enemy instanceof Endboss)) {
        return;
    }

    if (world.character.x > enemy.x + 40) {
        world.character.x = enemy.x + 40;
    }
}


/**
 * Checks if character jumps on enemy.
 *
 * @param {World} world Current game world.
 * @param {MoveableObject} enemy Enemy object.
 * @returns {boolean}
 */
function isJumpingOnEnemy(world, enemy) {
    return world.character.isAboveGround()
        && world.character.speedY < 0
        && world.character.isColliding(enemy);

}


/**
 * Removes chicken enemy after death.
 *
 * @param {World} world Current game world.
 * @param {Chicken|ChickenSmall} chicken Enemy.
 */
function killChicken(world, chicken) {
    if (chicken.isDeadAlready) {
        return;
    }
    chicken.isDeadAlready = true;
    if (chicken instanceof Chicken || chicken instanceof ChickenSmall) {
        chicken.playChickenKilledSound();
    }

    chicken.setDeadState();
    setTimeout(() => {
        let index = world.level.enemies.indexOf(chicken);
        if (index !== -1) {
            world.level.enemies.splice(index, 1);
        }
    }, 5000);
}


/**
 * Checks bottle collisions with enemies.
 *
 * @param {World} world Current game world.
 */
function checkCollisionBottlesWithEnemies(world) {
    world.throwableObjects.forEach((bottle, bottleIndex) => {
        world.level.enemies.forEach((enemy) => {
            if (!bottle.isColliding(enemy)) {

                return;
            }

            if (enemy instanceof Endboss) {
                handleEndbossHit(world, enemy, bottle, bottleIndex);

            } else {

                handleChickenHit(world, enemy, bottle, bottleIndex);
            }
        });
    });
}


/**
 * Handles bottle hit on endboss.
 *
 * @param {World} world Current game world.
 * @param {Endboss} enemy Endboss.
 * @param {ThrowableObject} bottle Bottle.
 * @param {number} bottleIndex Bottle index.
 */
function handleEndbossHit(world, enemy, bottle, bottleIndex) {
    if (!enemy.isHurt()) {
        enemy.playCrySound();
        enemy.hit();

        world.statusBarEndboss.setPercentage(
            enemy.energy
        );
    }

    removeBottleAfterImpact(
        world,
        bottle,
        bottleIndex
    );
}


/**
 * Handles bottle hit on chicken.
 *
 * @param {World} world Current game world.
 * @param {Chicken|ChickenSmall} enemy Chicken.
 * @param {ThrowableObject} bottle Bottle.
 * @param {number} bottleIndex Bottle index.
 */
function handleChickenHit(world, enemy, bottle, bottleIndex) {
    if (bottle.hasHitEnemy) {
        return;
    }
    bottle.hasHitEnemy = true;

    killChicken(
        world,
        enemy
    );

    removeBottleAfterImpact(
        world,
        bottle,
        bottleIndex
    );
}


/**
 * Removes bottle after splash animation.
 *
 * @param {World} world Current game world.
 * @param {ThrowableObject} bottle Bottle.
 * @param {number} bottleIndex Bottle index.
 */
function removeBottleAfterImpact(world, bottle, bottleIndex) {
    bottle.deactivateBottleMovement();
    bottle.bottleSplashAnimate();
    setTimeout(() => {
        world.throwableObjects.splice(
            bottleIndex,
            1
        );
    }, 300);
}