import Phaser from "phaser";
import Assets from "../constants/assets";
import Inputs from "../constants/inputs";
import Physics from "../constants/physics";

const config = {
    // WebGL
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin, manages physics simulation
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

function preload() {
    // this context is our scene
    this.load.image(Assets.Sky.key, Assets.Sky.file);
    this.load.image(Assets.Bird.key, Assets.Bird.file);
    this.load.image(Assets.Pipe.key, Assets.Pipe.file);
}

let bird = null;
let pipe = null;

const initialBirdPosition = { x: config.width * 0.1, y: config.height / 2 }
let totalDelta = null;

function create() {
    this.add.image(0, 0, Assets.Sky.key).setOrigin(0, 0);

    bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, Assets.Bird.key).setOrigin(0);
    bird.body.gravity.y = Physics.GRAVITY ;
    pipe = this.physics.add.sprite(300, 100, Assets.Pipe.key).setOrigin(0);
    this.input.on(Inputs.Mouse.LEFT_MOUSE_DOWN, flap);

    this.input.keyboard.on(Inputs.Keys.SPACE_DOWN, flap);
}

function update(time, delta) {
    if (bird.y > config.height || bird.y < -bird.height) {
        restartBirdPosition();
    }
}

function flap() {
    bird.body.velocity.y = -Physics.VELOCITY;
}

function restartBirdPosition() {
    bird.x = initialBirdPosition.x;
    bird.y = initialBirdPosition.y;
    bird.body.velocity.y = 0;
}

new Phaser.Game(config);

