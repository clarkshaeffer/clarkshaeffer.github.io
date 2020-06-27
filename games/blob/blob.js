var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         //gravity: { y: 800 },
    //         // debug: false
    //        }
    // },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    // this.load.image('sky', 'assets/sky.png');
    // this.load.image('ground', 'assets/platform.png');
    // this.load.image('star', 'assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // this.load.spritesheet('dude', 'assets/dude.png',
    this.load.image('blob', 'assets/blob.png');
    this.load.image('candy', 'assets/candy.png');
    this.load.image('villain1', 'assets/villain1.png');
    this.load.image('villain2', 'assets/villain2.png');
    this.load.image('villain3', 'assets/villain3.png');
    this.load.image('grid', 'assets/grid.png');

    frameWidth: 32; 
    frameHeight: 48; 

}

var score = 0;
var scoreText; 
var gameOver = false;
var turn = 0;

function create ()
{
    //this.cameras.main.setBackgroundColor(0x0000ff);

    // platforms = this.physics.add.staticGroup();

    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    /*
    Player - 85x80 
    Villain - 70x70
    Candy - 59x56
    Grid - 800x600

    */

    // if sprite :
    //player = this.add.sprite
    //player.scale.setTo(2, 2);
    //player.anchor.setTo(0.5, 0.5);
        // if physics image:
    //player = this.physics.add.image(100, 450, 'blob');
    
    start_x = 450;
    start_y = 350;
    grid = this.add.image(400, 300, 'grid');
    player = this.add.image(450, 350, 'blob');
    candy = this.add.image(250, 250, 'candy');
    v1 = this.add.image(50, 50, 'villain1');
    // v2 = this.add.image(750, 50, 'villain2');
    // v3 = this.add.image(750, 550, 'villain3');
    villains = this.add.group();
    villains.add(v1);
    // villains.add(v2);
    // villains.add(v3);
    // console.log(villains.getChildren()[0].x);
    // console.log(villains.getLength());


    //player.setBounce(0.5);
    //player.setCollideWorldBounds(true);
    // player.body.setGravityY(300);

    // this.anims.create({
    //     key: 'left',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.anims.create({
    //     key: 'turn',
    //     frames: [ { key: 'dude', frame: 4 } ],
    //     frameRate: 20
    // });

    // this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    
    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: { x: 12, y: 5, stepX: 70 }
    // });
    // stars.children.iterate(function (child) {
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });
    
    // bombs = this.physics.add.group();
    //this.physics.add.collider(player, candy, collectCandy, null, this);
    
    // this.physics.add.collider(bombs, platforms);
    // this.physics.add.collider(player, bombs, hitBomb, null, this);
    // this.physics.add.collider(player, platforms);
    // this.physics.add.collider(stars, platforms);
    // this.physics.add.overlap(player, stars, collectStar, null, this);

    // begin receiving user keyboard input
    cursors = this.input.keyboard.createCursorKeys();

    
    // scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });


}

function update ()
{
    if (turn === 0)
    {

    }
    if (turn >= 1)
    {
        chase();
    }
    // console.log("turn: " + turn);
    //console.log(villains.getChildren()[0].texture.key);
    {

        //console.log(player.x);
        //console.log(player.y);
        //player.setVelocityX(160);
        // player.anims.play('left', true);

        duration = 1000;
        //if (cursors.left.isDown)

        // if user presses left and player is not on left edge of screen
        if (turn == 0)
        {
            if (this.input.keyboard.checkDown(cursors.left, duration) && player.x > 50)
            {
                // player goes left 100 pixels
                player.x -= 100;
                turn++;
            }
            // if user presses right and player is not on right edge of screen
            else if (this.input.keyboard.checkDown(cursors.right, duration) && player.x < 750)
            {
                // player goes right 100 pixels
                player.x += 100;
                turn++;
            }
            // if user presses up and player is not on top edge of screen
            else if (this.input.keyboard.checkDown(cursors.up, duration) && player.y > 50)
            {
                // player goes up 100 pixels
                player.y -= 100;
                turn++;
            }
            // if user presses down and player is not on bottom edge of screen
            else if (this.input.keyboard.checkDown(cursors.down, duration) && player.y < 550)
            {
                // player goes down 100 pixels
                player.y += 100;
                turn++;
            }
        }

        for (i = 0; i < villains.getLength(); i++)
        {
            if (player.x == candy.x && player.y == candy.y) 
            {
                score++; // score goes up 1
                console.log("score: " + score); // print score to console
                //console.log("positions: " + villains[0].x); // print score to console
                //console.log(villains);
                random_x = (Phaser.Math.Between(0,7) * 100) + 50; // generate random number for candy's x position (in grid format)
                random_y = (Phaser.Math.Between(0,5) * 100) + 50; // generate random number for candy's x position
                // while the number generated is the candy's position - to prevent going to the same place
                // OR while the number generated is the position of a villain
                while ((random_x == candy.x && random_y == candy.y) || (random_x == villains.getChildren()[i].x && random_y == villains.getChildren()[i].y)) 
                {
                    // regenerate the random numbers
                    random_x = (Phaser.Math.Between(0,7) * 100) + 50; 
                    random_y = (Phaser.Math.Between(0,5) * 100) + 50;
                }
                //set candy's position to random number generates
                candy.x = random_x;
                candy.y = random_y;
            } // end if player is at candy's location

            if (player.x == villains.getChildren()[i].x && player.y == villains.getChildren()[i].y)
            {
                // console.log("OH NOOOOOOOO");
                // gameOver = true;
                // this.scene.pause();
                console.log("Game over");
                score = 0;
                player.x = start_x;
                player.y = start_y;
                // this.scene.resume();
                
                // Refreshes the page:
                // location.reload();
            }
            //console.log(villains.getChildren()[i].x + ", " + villains.getChildren()[i].y)
        }
    } // end while(!gameOver)

    //this.pause();

    // for (i = 0; i < villains.getLength(); i++)
    // {
    //     console.log("x :  ", villains.get());
    // }
    function chase()
    {
        //console.log("chase");
        
        if (turn == 1)
        {
            for (i = 0; i < villains.getLength(); i++) // go through all villains
            {
                if (villains.getChildren()[i].texture.key == "villain1") // if the villain is red
                {
                    // if to the right or down of player, distance is positive. Else, is negative.
                    x_distance = villains.getChildren()[i].x - player.x;
                    y_distance = villains.getChildren()[i].y - player.y;
                    console.log("x_distance " + x_distance);
                    console.log("y_distance " + y_distance);
                    console.log("abs " + Math.abs(x_distance));
                    
                    if(Math.abs(x_distance) > Math.abs(y_distance)) // if farther away on the x axis
                    {
                        if(x_distance < 0) // if to the left
                        {
                            villains.getChildren()[i].x +=100; // go right
                        }
                        else if(x_distance >= 0) // else if to the right
                        {
                            villains.getChildren()[i].x -=100; // go left
                        }

                    }
                    else if (Math.abs(x_distance < Math.abs(y_distance)))
                    {
                        if(y_distance < 0) // if up
                        {
                            villains.getChildren()[i].y +=100; // go down
                        }
                        else if(y_distance >= 0) // else if down
                        {
                            villains.getChildren()[i].y -=100; // go up
                        }
                    }
                    else if (Math.abs(x_distance) == Math.abs(y_distance))
                    {
                        //if ()
                    }
                }
            }
            turn ++;
        }
        else if (turn == 2)
        {
            for (i = 0; i < villains.getLength(); i++)
            {
                if (villains.getChildren()[i].texture.key == "villain2")
                {
                    villains.getChildren()[i].x += 100;
                }
            }
            turn ++;
        }
        else if (turn == 3)
        {
            for (i = 0; i < villains.getLength(); i++)
            {
                if (villains.getChildren()[i].texture.key == "villain3")
                {
                    villains.getChildren()[i].x += 100;
                }
            }
        }
        turn = 0;
        //this.time.addEvent(500);
    }
} // end update()


// function hitBomb(player, bomb)
// {
//     this.physics.pause();

//     player.setTint(0xff0000);

//     player.anims.play('turn');

//     gameOver = true;
// }