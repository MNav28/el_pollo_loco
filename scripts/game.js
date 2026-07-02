let canvas;
let world;
let keyboard = new Keyboard();
let soundEnabled = true;
let isGameActive = false;
const DEBUG_FRAME = false;

/**
 * Initializes the game canvas and loads user settings.
 */
function init() {
    canvas = document.getElementById('canvas')
    loadSoundState();
    checkDeviceOrientation();
    initKeyboardEvents();
}

/**
 * Starts a new game.
 */
function startGame() {
    prepareGameUI();
    initializeGameWorld();
    startGameAudio();
}

/**
 * Hides menu elements and shows game controls.
 */
function prepareGameUI() {
    const startScreen = document.getElementById('start-screen');
    const infoSettings = document.getElementById('info-settings-wrapper');
    const mobilePanel = document.getElementById('control-mobile-panel');

    startScreen.classList.add('d-none');
    infoSettings.classList.add('d-none');
    mobilePanel.classList.remove('d-none');
}

/**
 * Creates and initializes the game world.
 */
function initializeGameWorld() {
    initLevel();

    world = new World(canvas, keyboard);
    world.keyboard.initMobileButtons();

    isGameActive = true;
}

/**
 * Starts background music if sound is enabled.
 */
function startGameAudio() {
    if (soundEnabled) {
        world.playBackgroundMusic();
    }
}

/**
 * Initializes keyboard controls for desktop input.
 */
function initKeyboardEvents() {

    window.addEventListener("keydown", (e) => {

        switch (e.code) {

            case "ArrowLeft":
                keyboard.LEFT = true;
                break;

            case "ArrowRight":
                keyboard.RIGHT = true;
                break;

            case "ArrowUp":
                keyboard.UP = true;
                break;

            case "ArrowDown":
                keyboard.DOWN = true;
                break;

            case "Space":
                keyboard.SPACE = true;
                break;

            case "KeyD":
                keyboard.D = true;
                break;
        }
    });


    window.addEventListener("keyup", (e) => {

        switch (e.code) {

            case "ArrowLeft":
                keyboard.LEFT = false;
                break;

            case "ArrowRight":
                keyboard.RIGHT = false;
                break;

            case "ArrowUp":
                keyboard.UP = false;
                break;

            case "ArrowDown":
                keyboard.DOWN = false;
                break;

            case "Space":
                keyboard.SPACE = false;
                break;

            case "KeyD":
                keyboard.D = false;
                break;
        }
    });
}

/**
 * Opens the information overlay with custom content.
 *
 * @param {string} htmlContent The HTML content to display.
 */
function openInfoOverlay(htmlContent) {
    const overlay = document.getElementById('overlay-info');
    const content = document.getElementById('overlay-info-content');

    content.innerHTML = htmlContent;
    overlay.classList.remove('d-none');
}

/**
 * Closes the information overlay.
 */
function closeInfoOverlay() {
    const overlay = document.getElementById('overlay-info');
    overlay.classList.add('d-none');
}

/**
 * Checks the current device orientation and displays
 * the orientation overlay if necessary.
 */
function checkDeviceOrientation() {
    const isMobile = window.innerWidth <= 900;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (isMobile && isPortrait) {
        showOrientationOverlay();
    } else {
        hideOrientationOverlay();
    }
}

/**
 * Displays the orientation warning overlay.
 */
function showOrientationOverlay() {
    const overlay = document.getElementById('orientation-overlay');
    overlay.classList.remove('d-none');
    document.body.classList.add('no-scroll');
}

/**
 * Hides the orientation warning overlay.
 */
function hideOrientationOverlay() {
    const overlay = document.getElementById('orientation-overlay');
    overlay.classList.add('d-none');
    document.body.classList.remove('no-scroll');
}

/**
 * Restarts the game after a win or loss.
 */
function restartGame() {
    isGameActive = false;
    world.stopBackgroundMusic();
    const endScreen = document.getElementById('end-screen');
    endScreen.classList.add('d-none');
    const soundIcon = document.getElementById('sound-icon-wrapper');
    soundIcon.classList.remove('d-none');
    startGame();
}

/**
 * Returns the player to the start menu.
 */
function returnToStartMenu() {
    isGameActive = false;
    world.stopBackgroundMusic();
    const endScreen = document.getElementById('end-screen');
    const startScreen = document.getElementById('start-screen');
    const infoSettings = document.getElementById('info-settings-wrapper');
    const soundIcon = document.getElementById('sound-icon-wrapper');
    endScreen.classList.add('d-none');
    startScreen.classList.remove('d-none');
    infoSettings.classList.remove('d-none');
    soundIcon.classList.remove('d-none');
}

/**
 * Toggles game sound on or off.
 */
function toggleSound() {
    soundEnabled = !soundEnabled;
    updateSoundIcon();
    saveSoundState();
    if (!soundEnabled) {
        if (world) {
            world.stopBackgroundMusic();
            world.character.stopAllSounds();
        }
    } else {
        if (isGameActive && world) {
            world.playBackgroundMusic();
        }
    }
}

/**
 * Saves the current sound setting to local storage.
 */
function saveSoundState() {
    localStorage.setItem('soundEnabled', soundEnabled);
}

/**
 * Loads the saved sound setting from local storage.
 */
function loadSoundState() {
    const savedSoundState = localStorage.getItem('soundEnabled');

    if (savedSoundState !== null) {
        soundEnabled = savedSoundState === 'true';
    }

    updateSoundIcon();
}

/**
 * Updates the sound icon according to the current sound state.
 */
function updateSoundIcon() {
    const soundIcon = document.getElementById('sound-icon');

    if (!soundIcon) return;

    if (soundEnabled) {
        soundIcon.src = './assets/img/volume_on.png';
    } else {
        soundIcon.src = './assets/img/volume_off.png';
    }
}



window.addEventListener('resize', checkDeviceOrientation);
window.addEventListener('orientationchange', checkDeviceOrientation);