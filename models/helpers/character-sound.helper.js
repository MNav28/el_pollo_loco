/**
* Plays or stops the walking sound.
*/
function handleWalkingSound(character) {

    if (!soundEnabled) {
        character.walking_sound.pause();
        character.walking_sound.currentTime = 0;
        return;
    }

    if (character.isWalking() && !character.isAboveGround()) {

        if (character.walking_sound.paused) {
            character.walking_sound.play().catch((e) => {
                console.warn('Laufsound konnte nicht abgespielt werden:', e);
            });
        }

    } else {

        character.walking_sound.pause();
        character.walking_sound.currentTime = 0;
    }
}


/**
* Plays the jump sound once per jump.
*/
function handleJumpSound(character) {
    if (!soundEnabled) {
        character.jump_sound.pause();
        character.jump_sound.currentTime = 0;
        return;
    }
    if (character.isAboveGround() && !character.isJumpSoundPlayed) {
        character.isJumpSoundPlayed = true;
        character.jump_sound.currentTime = 0;
        character.jump_sound.play().catch((e) => {
            console.warn('Jump sound konnte nicht abgespielt werden:', e);
        });
    }
    if (!character.isAboveGround() && character.isJumpSoundPlayed) {
        character.isJumpSoundPlayed = false;
    }
}


/**
* Plays the collecting sound when coins or bottles are collected.
*/
function handleCollectingSound(character) {
    if (!soundEnabled || character.isStopped) return;
    let coinsAmountChanged = character.world.collectedCoins > character.lastCollectedCoins;
    let bottlesAmountChanged = character.world.collectedBottles > character.lastCollectedBottles;

    if ((coinsAmountChanged || bottlesAmountChanged)) {
        character.collecting_sound.currentTime = 0;
        character.collecting_sound.play().catch((e) => {
            console.warn('Collecting sound konnte nicht abgespielt werden:', e);
        });
    }
    character.lastCollectedCoins = character.world.collectedCoins;
    character.lastCollectedBottles = character.world.collectedBottles;
}