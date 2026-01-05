class Character extends MoveableObject {
    height = 280;
    width = 120;
    y = 155;
    //y = 80;
    speed = 10;
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_LONG_IDLE = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;

    constructor() {
        super();
        this.walking_sound = new Audio('./assets/audio/walking1.mp3');
        this.jump_sound = new Audio('./assets/audio/jump.mp3');
        this.collecting_sound = new Audio('./assets/audio/collecting.mp3');
        this.snoring_sound = new Audio('./assets/audio/snoring.mp3');
        this.hurt_sound = new Audio('./assets/audio/hurt.mp3');
        this.gameover_sound = new Audio('./assets/audio/game_over_sound.mp3');
        this.isJumpSoundPlayed = false;
        this.isSnoringSoundPlaying = false;
        this.lastCollectedCoins = 0;
        this.lastCollectedBottles = 0;
        this.isStopped = false;
        this.isDeadAlreadyHandled = false;
        this.loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.offsetX = 35;
        this.offsetY = 130;
        this.offsetWidth = 65;
        this.offsetHeight = 140;
        this.idleTime = 0;
        //this.playSnoringSound();
    }

    animate() {
        this.animateMovement();
        this.animateCharacterStates();
        this.animateIdle();
        this.animateLongIdle();
        this.trackIdleTime();

        setInterval(() => {
            this.handleSnoringSound();
        }, 200);
    }

    animateMovement() {
        setInterval(() => {
            if (this.isStopped) return;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
            this.handleWalkingSound();
            this.handleJumpSound();
            this.handleCollectingSound();
        }, 1000 / 60);
    }

    animateCharacterStates() {
        setInterval(() => {
            if (this.isStopped) return;
            if (this.isDead()) {
                console.log('Gameover, you lost the game!');
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.isDeadAlreadyHandled) {
                    this.isDeadAlreadyHandled = true;

                    this.stopAllActions();
                    this.world.stopBackgroundMusic();

                    setTimeout(() => {
                        this.showGameoverScreen();
                    }, 1200);
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    animateIdle() {
        setInterval(() => {
            if (this.isStopped) return;
            if (this.isIdle() && !this.isLongIdle()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);
    }

    animateLongIdle() {
        setInterval(() => {
            if (this.isStopped) return;
            if (this.isLongIdle()) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        }, 200);
    }

    trackIdleTime() {
        setInterval(() => {
            if (this.isIdle()) {
                this.idleTime += 100;
            } else {
                this.idleTime = 0;
            }
        }, 100);
    }

    isIdle() {
        return !this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.SPACE &&
            !this.isAboveGround() &&
            !this.isHurt() &&
            !this.isDead();
    }

    isLongIdle() {
        return this.idleTime >= 5000;
    }

    isWalking() {
        return (
            (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
            (this.world.keyboard.LEFT && this.x > 0)
        );
    }

    handleWalkingSound() {
        if (this.isWalking() && !this.isAboveGround()) {
            if (!this.walking_sound.playing) {
                this.walking_sound.play().catch((e) => {
                    console.warn('Laufsound konnte nicht abgespielt werden:', e);
                });

            }
        } else {
            this.walking_sound.pause();
            this.walking_sound.currentTime = 0;
        }
    }

    handleJumpSound() {
        if (this.isAboveGround() && !this.isJumpSoundPlayed) {
            this.isJumpSoundPlayed = true;
            this.jump_sound.currentTime = 0;
            this.jump_sound.play().catch((e) => {
                console.warn('Jump sound konnte nicht abgespielt werden:', e);
            });
        }
        if (!this.isAboveGround() && this.isJumpSoundPlayed) {
            this.isJumpSoundPlayed = false;
        }
    }

    handleCollectingSound() {
        let coinsAmountChanged = this.world.collectedCoins > this.lastCollectedCoins;
        let bottlesAmountChanged = this.world.collectedBottles > this.lastCollectedBottles;

        if ((coinsAmountChanged || bottlesAmountChanged)) {
            this.collecting_sound.currentTime = 0;
            this.collecting_sound.play().catch((e) => {
                console.warn('Collecting sound konnte nicht abgespielt werden:', e);
            });
        }
        this.lastCollectedCoins = this.world.collectedCoins;
        this.lastCollectedBottles = this.world.collectedBottles;
    }

    handleSnoringSound() {
        if (!soundEnabled || this.isStopped) {
            this.stopSnoringSound();
            return;
        }

        if (this.isLongIdle() && !this.isSnoringSoundPlaying) {
            this.snoring_sound.currentTime = 0;
            this.snoring_sound.play().catch((e) => {
                console.warn('Snoring sound konnte nicht abgespielt werden:', e);
            });
            this.isSnoringSoundPlaying = true;
        }

        if (!this.isLongIdle() && this.isSnoringSoundPlaying) {
            this.stopSnoringSound();
        }
    }

    stopSnoringSound() {
        this.snoring_sound.pause();
        this.snoring_sound.currentTime = 0;
        this.isSnoringSoundPlaying = false;
    }

    playHurtSound() {
        if (!soundEnabled || this.isStopped) return;
        //this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;
        this.hurt_sound.play().catch((e) => {
            console.warn('Hurt sound konnte nicht abgespielt werden:', e);
        });
    }

    stopAllActions() {
        // set flag to stop running Animation
        this.isStopped = true;
    }

    stopAllSounds() {
        this.walking_sound.pause();
        this.jump_sound.pause();
        this.collecting_sound.pause();
        this.snoring_sound.pause();
        this.hurt_sound.pause();
        this.gameover_sound.pause();

        this.walking_sound.currentTime = 0;
        this.jump_sound.currentTime = 0;
        this.collecting_sound.currentTime = 0;
        this.snoring_sound.currentTime = 0;
        this.hurt_sound.currentTime = 0;
        this.gameover_sound.currentTime = 0;
    }

    showGameoverScreen() {
        const gameoverScreen = document.getElementById('gameover-screen');
        // const soundButton = document.getElementById('sound-button');
        this.stopAllActions();
        this.world.stopBackgroundMusic();
        this.playGameoverSound();
        // soundButton.classList.add('d-none');
        gameoverScreen.classList.remove('d-none');
    }

    playGameoverSound() {
        this.gameover_sound.pause();
        this.gameover_sound.currentTime = 0;

        this.gameover_sound.play().catch((e) => {
            console.warn('Gameover sound konnte nicht abgespielt werden:', e);
        });
    }



    // jump() {
    // }
}

