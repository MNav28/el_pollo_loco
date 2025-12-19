let canvas;
let world;
let keyboard = new Keyboard();

function init() {

    canvas = document.getElementById('canvas')


    console.log('Canvas is ready, but world not started yet');
}


function startGame() {
    const startScreen = document.getElementById('start-screen');
    const soundButton = document.getElementById('sound-button');

    startScreen.classList.add('d-none');

    soundButton.classList.remove('d-none');
    initLevel();

    world = new World(canvas, keyboard);
    world.keyboard.initMobileButtons();
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

function openOverlay(htmlContent) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('overlay-content');

    content.innerHTML = htmlContent;
    overlay.classList.remove('d-none');
}

function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
}
