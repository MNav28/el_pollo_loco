class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;



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


    initMobileButtons() {
        this.mobileBtnLeft();
        this.mobileBtnRight();
        this.mobileBtnJump();
        this.mobileBtnThrow();
    };

}

