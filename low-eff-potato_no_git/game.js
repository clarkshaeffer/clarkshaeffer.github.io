const SCREENWIDTH = 800; // screen width
const SCREENHEIGHT = 600; // screen height
let keySpace, keyLeft, keyRight, keyUp, keyA, keyD, keyW, keyZ;
let movespeed = 2;
let spawn_rate = 0.0002;
let points = 0;
let high_score = 0;
let start_text, points_text, game_over_text;
let game_over = false;
let punched = false;
let fighter;
let potatoes = [];
let potato_frame_choice = [0,1,2];
let box_top, box_left, box_right;
let start = true;
let killer;
let song;

class Game extends Phaser.Scene {
    constructor() {
        super({
			key: "Game"
		});
    }

    preload() {
        this.load.spritesheet('fighter', 'assets/7-9_fighter_240_288.png', {
            frameWidth: 240,
            frameHeight: 288
        });
        this.load.spritesheet('potato_big', 'assets/potatoes_50_64.png', {
            frameWidth: 50,
            frameHeight: 64
        });
		this.load.spritesheet('potato_explode', 'assets/potatoes_explode.png', {
            frameWidth: 50,
            frameHeight: 64
		});
		this.load.image('box_horiz', 'assets/box_horiz_80_48.png');
		this.load.image('box_vert', 'assets/box_vert_48_80.png');
		this.load.audio('rhino', 'assets/Rhino.wav');
	}
    create() {
		song = this.sound.add("rhino", { loop: true });
		song.play();
		points_text = this.add.text(0,0, 'punched: ' + points);
		game_over_text = this.add.text(50, 100, '');
		game_over_text.setVisible(false);
		start_text = this.add.text(50, 100, 'Time for more training.\nPunch the potatoes!\nPress space to start.');
		start_text.setVisible(false);
		box_top = this.add.image(SCREENWIDTH / 2 - 10, SCREENHEIGHT / 2 - 16, 'box_horiz');
		box_left = this.add.image(254, SCREENHEIGHT - 180, 'box_vert');
		box_right = this.add.image(549, SCREENHEIGHT - 180, 'box_vert');
		fighter = this.add.sprite(SCREENWIDTH / 2, SCREENHEIGHT - 144, 'fighter');

		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('potato_explode', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: 0
		});


		this.cameras.main.setBackgroundColor(0x344166);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

		points_text.setVisible(false);
		start_text.setVisible(true);
		this.scene.launch('Paused');
		this.scene.pause();

    } // end create()

    update() {
		points_text.setText('punched: ' + points);

		// FIGHTER FRAME
        if(keyRight.isDown || keyD.isDown) {
			fighter.setFrame(1);
        }
        else if(keyLeft.isDown || keyA.isDown) {
			fighter.setFrame(2);
        }
		else if( keyUp.isDown || keyW.isDown) {
			fighter.setFrame(3);
		}
		else {
			fighter.setFrame(0);
			punched = false;
		}


		// SPAWN POTATO
		if (Math.random() <= spawn_rate) {
			let frame = potato_frame_choice[Math.floor(Math.random()*potato_frame_choice.length)]; // random in array
			let top_left_right = potato_frame_choice[Math.floor(Math.random()*potato_frame_choice.length)]; // random in array
			let x, y;
			if (top_left_right === 0) { // top
				x = SCREENWIDTH / 2 - 10;
				y = -32;
			}
			else if (top_left_right === 1) { // left
				x = -32;
				y = SCREENHEIGHT - 180;
			}
			else if (top_left_right === 2) { // right
				x = SCREENWIDTH + 32;
				y = SCREENHEIGHT - 180;
			}
			potatoes.push(this.add.sprite(x, y, 'potato_big', frame));
		}


		// FOR EACH POTATO
		for (let i = 0; i < potatoes.length; i++) {
			// top
			if (potatoes[i].x === SCREENWIDTH / 2 - 10) {
				potatoes[i].y += movespeed;
				if (potatoes[i].y >= box_top.y - 56 && potatoes[i].y <= box_top.y + 56 && fighter.frame.name === 3 && !punched ) {
					punched = true;
					potatoes[i].x += 1;
					points += 1;
					potatoes[i].anims.play('explode', true);
					potatoes[i].once('animationcomplete', () => {
						if (potatoes[i]) {
							potatoes[i].y += SCREENHEIGHT * 2;
						}
					})
				}
				if (Math.floor(potatoes[i].y) >= box_top.y + 57 && Math.floor(potatoes[i].y) <= box_top.y + 100 && potatoes[i].frame.texture.key === "potato_big") {
					killer = potatoes[i];
					game_over = true;
				}
			}

			// left
			if (potatoes[i].x < SCREENWIDTH / 2 - 15) {
				potatoes[i].x += movespeed;
				if (potatoes[i].y === SCREENHEIGHT - 180 && potatoes[i].x >= box_left.x - 49 && potatoes[i].x <= box_left.x + 49 && fighter.frame.name === 2 && !punched ) {
					punched = true;
					potatoes[i].y += 1;
					points += 1;
					potatoes[i].anims.play('explode', true);
					potatoes[i].once('animationcomplete', () => {
						if (potatoes[i]) {
							potatoes[i].x += SCREENWIDTH * 2;
						}
					})
				}
				if (Math.floor(potatoes[i].x) >= box_left.x + 50 && Math.floor(potatoes[i].x) <= box_left.x + 100 && potatoes[i].frame.texture.key === "potato_big") {
					killer = potatoes[i];
					game_over = true;
				}
			}
			
			// right
			if (potatoes[i].x > SCREENWIDTH / 2) {
				potatoes[i].x -= movespeed;
				if (potatoes[i].y === SCREENHEIGHT - 180 && potatoes[i].x >= box_right.x - 49 && potatoes[i].x <= box_right.x + 49 && fighter.frame.name === 1 && !punched ) {
					punched = true;
					potatoes[i].y += 1;
					points += 1;
					potatoes[i].anims.play('explode', true);
					potatoes[i].once('animationcomplete', () => {
						if (potatoes[i]) {
							potatoes[i].x -= SCREENWIDTH * 2;
						}
					})
				}
				if (Math.floor(potatoes[i].x) <= box_right.x - 50 && Math.floor(potatoes[i].x) >= box_right.x - 100 && potatoes[i].frame.texture.key === "potato_big") {
					killer = potatoes[i];
					game_over = true;
				}
			}

			if (potatoes[i].x > SCREENWIDTH + 64 || potatoes[i].y > SCREENHEIGHT || potatoes[i].x < - 64) { // if out of bounds
				potatoes[i].destroy() // destroy sprite
				potatoes.splice(i, 1) // remove from potatoes array
			}
		}
		spawn_rate += 0.00002;
		movespeed += 0.000001;

		if (game_over) {
			fighter.setTint('0xeb4034');
			if (points > high_score) {
				high_score = points;
			}
			game_over_text.setText('game over\npunches this time: ' + points + '\nhigh score: ' + high_score + '\npress space to restart');
			game_over_text.setVisible(true);
			points_text.setVisible(false);
			
			this.scene.launch('Paused');
			this.scene.pause();
		}

		if (keyZ.isDown) {
			this.scene.launch('Paused');
			this.scene.pause();
		}
    } // end update()
};

class Paused extends Phaser.Scene {
    constructor() {
        super({
			key: "Paused"
		});
    }

	preload() {

	}

	create() {

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		// if (killer) {
		// 	console.log('x');
		// 	console.log(killer.x);
		// 	console.log('y');
		// 	console.log(killer.y);
		// }
	}
	
	update() {
		if (keySpace.isDown) {
			if (start) {
				start_text.setVisible(false);
				points_text.setVisible(true);
				this.scene.resume('Game');
				this.scene.pause();
				start = false;
			}
			else {
				game_over = false;
				points = 0;
				fighter.clearTint();
				game_over_text.setVisible(false);
				points_text.setVisible(true);
				movespeed = 1.5;
				spawn_rate = 0.0001;
				for (let i = 0; i < potatoes.length; i++) {
					// console.log(potatoes[i].x)
					potatoes[i].destroy();
				}
				potatoes = [];
				this.scene.resume('Game');
				this.scene.pause();
			}
		}
	}

};
const config = {
    type: Phaser.AUTO,
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    scene: [
		Game,
		Paused
	]
};
const game = new Phaser.Game(config);