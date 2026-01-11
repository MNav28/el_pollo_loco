let canvas;
let world;
let keyboard = new Keyboard();
let soundEnabled = true;
let isGameActive = false;

function init() {

    canvas = document.getElementById('canvas')

    checkDeviceOrientation();
    console.log('Canvas is ready, but world not started yet');
}


function startGame() {
    const startScreen = document.getElementById('start-screen');

    startScreen.classList.add('d-none');
    initLevel();

    world = new World(canvas, keyboard);
    world.keyboard.initMobileButtons();
    isGameActive = true;

    if (soundEnabled) {
        world.playBackgroundMusic();
    }
    console.log('My Character is', world.character);
}


window.addEventListener("keydown", (e) => {
    //console.log(e)  

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})


window.addEventListener("keyup", (e) => {
    //console.log(e)  


    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})


function openInfoOverlay(htmlContent) {
    const overlay = document.getElementById('overlay-info');
    const content = document.getElementById('overlay-info-content');

    content.innerHTML = htmlContent;
    overlay.classList.remove('d-none');
}


function closeInfoOverlay() {
    const overlay = document.getElementById('overlay-info');
    overlay.classList.add('d-none');
}


function checkDeviceOrientation() {
    const isMobile = window.innerWidth <= 900;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (isMobile && isPortrait) {
        showOrientationOverlay();
    } else {
        hideOrientationOverlay();
    }
}


function showOrientationOverlay() {
    const overlay = document.getElementById('orientation-overlay');
    overlay.classList.remove('d-none');
    document.body.classList.add('no-scroll');
}


function hideOrientationOverlay() {
    const overlay = document.getElementById('orientation-overlay');
    overlay.classList.add('d-none');
    document.body.classList.remove('no-scroll');
}


function restartGame() {
    isGameActive = false;
    world.stopBackgroundMusic();
    const gameOverScreen = document.getElementById('gameover-screen');
    const winningScreen = document.getElementById('winning-screen');
    gameOverScreen.classList.add('d-none');
    winningScreen.classList.add('d-none');
    startGame();
}


function returnToStartMenu() {
    isGameActive = false;
    world.stopBackgroundMusic();
    const winningScreen = document.getElementById('winning-screen');
    const gameOverScreen = document.getElementById('gameover-screen');
    const startScreen = document.getElementById('start-screen');
    gameOverScreen.classList.add('d-none');
    winningScreen.classList.add('d-none');
    startScreen.classList.remove('d-none');
}


function toggleSound() {
    const soundIcon = document.getElementById('sound-icon');
    if (soundEnabled) {
        console.log('sound icon clicked');
        soundIcon.src = "./assets/img/volume_off.png";
        soundEnabled = false;
        world.stopBackgroundMusic();
        world.character.stopAllSounds();
    } else {
        console.log('sound icon clicked');
        soundIcon.src = "./assets/img/volume_on.png";
        soundEnabled = true;
        if (isGameActive) {
            world.playBackgroundMusic();
        }
    }
}


window.addEventListener('resize', checkDeviceOrientation);
window.addEventListener('orientationchange', checkDeviceOrientation);