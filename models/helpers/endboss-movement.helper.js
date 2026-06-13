/**
 * Handles the chasing state of the endboss.
 *
 * @param {Endboss} endboss The endboss instance.
 * @param {Character} character The player character.
 * @returns {boolean} True if the endboss is chasing.
 */
function handleChasing(endboss, character) {
    if (endboss.isChasing && !endboss.isCurrentlyHurt) {
        chaseCharacter(endboss, character);
        return true;
    }
    return false;
}


/**
 * Activates alert state when the character is nearby.
 *
 * @param {Endboss} endboss The endboss instance.
 * @param {Character} character The player character.
 */
function handleAlertState(endboss, character) {
    if (!endboss.isAlerting) {
        endboss.stopWalkingAnimation();
        faceCharacter(endboss, character);
        endboss.isAlerting = true;
        endboss.startAlertAnimation();
    }
}


/**
 * Handles the default patrol behavior.
 *
 * @param {Endboss} endboss The endboss instance.
 */
function handlePatrolState(endboss) {
    if (endboss.isCurrentlyHurt || endboss.isChasing) {
        return;
    }
    if (endboss.isAlerting) {
        endboss.isAlerting = false;
        endboss.stopAlertAnimation();
    }
    endboss.startWalking();
}


/**
 * Turns the endboss towards the character.
 *
 * @param {Endboss} endboss The endboss instance.
 * @param {Character} character The player character.
 */
function faceCharacter(endboss, character) {
    let distance = character.x - endboss.x;
    if (Math.abs(distance) < 40) {
        return;
    }
    if (distance < 0) {
        endboss.otherDirection = false;
        endboss.direction = -1;
    } else {
        endboss.otherDirection = true;
        endboss.direction = 1;
    }
}


/**
 * Moves the endboss towards the character.
 *
 * @param {Endboss} endboss The endboss instance.
 * @param {Character} character The player character.
 */
function chaseCharacter(endboss, character) {
    faceCharacter(endboss, character);
    let distance = Math.abs(character.x - endboss.x);
    if (hasReachedCharacter(endboss, distance)) {

        return;
    }
    endboss.leaveAlertState();
    moveTowardsCharacter(endboss, character);
    endboss.ensureWalkingAnimation();
}


/**
 * Checks whether the endboss reached the character.
 *
 * @param {Endboss} endboss The endboss instance.
 * @param {number} distance Distance to character.
 * @returns {boolean} True if target is reached.
 */
function hasReachedCharacter(endboss, distance) {
    if (distance < 40) {
        endboss.stopWalkingAnimation();
        if (!endboss.isAlerting) {
            endboss.isAlerting = true;
            endboss.startAlertAnimation();
        }
        return true;
    }
    return false;
}


/**
 * Moves the endboss closer to the character.
 *
 * @param {Endboss} endboss The endboss instance.
 * @param {Character} character The player character.
 */
function moveTowardsCharacter(endboss, character) {
    if (character.x < endboss.x) {
        endboss.x -= endboss.chaseSpeed;
    } else {
        endboss.x += endboss.chaseSpeed;
    }
}