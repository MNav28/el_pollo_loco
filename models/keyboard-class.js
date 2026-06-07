/**
 * Manages keyboard and mobile input states for the game controls.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    /**
     * Registers touch events for the left movement button.
     */
    mobileBtnLeft() {
        const btn = document.getElementById('btnLeft');
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
    }

    /**
     * Registers touch events for the right movement button.
     */    
    mobileBtnRight() {
        const btn = document.getElementById('btnRight');
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
    }

    /**
     * Registers touch events for the jump button.
     */
    mobileBtnJump() {
        const btn = document.getElementById('btnJump');
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

    }

    /**
     * Registers touch events for the throw button.
     */
    mobileBtnThrow() {
        const btn = document.getElementById('btnThrow');
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }

    /**
     * Initializes all mobile control buttons.
     */
    initMobileButtons() {
        this.mobileBtnLeft();
        this.mobileBtnRight();
        this.mobileBtnJump();
        this.mobileBtnThrow();
    };

    
}

