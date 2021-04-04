var ground, monkeyHand, reset,
    monkey, monkeyAutomatedCollider, gameState,
    monkeyAutomatedColliderMonkeyXAddNumber,
    waitageTime, score, time, PLAY, END, stones, bananas,
    singlePlayerButton, automatedPlayingButton, forest, timesCanStoneTouch;

var groundImage, monkeyHandImage, resetImage, monkeyImage, singlePlayerButtonImage, automatedPlayerButtonImage, bananaImage, stoneImage, monkeyJumpingImage, forestImage;

function preload() {
    groundImage = loadImage("ground.png");
    monkeyHandImage = loadImage("monkey_jump_hand.png");
    resetImage = loadImage("reset.png");
    monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
    singlePlayerButtonImage = loadImage("single_player.png");
    automatedPlayerButtonImage = loadImage("automated_gaming_mode.png");
    bananaImage = loadImage("banana.png");
    stoneImage = loadImage("stone.png");
    monkeyJumpingImage = loadImage("monkey-jumping_image.png");
    forestImage = loadImage("jungle.jpg");
}

function setup() {
    createCanvas(400, 400);
    doSetup();
}

//Call all the functions and set the background
function draw() {
    fill("red");
    textStyle(BOLD);
    background("lightgreen");

    // if (stones.length > 0) {
    //     console.log("----------------Stone X-------------: " + stones.get(0).x);
    // }

    // if (bananas.length > 0) {
    //     console.log("----------Bananas------------" + bananas.get(0).x);
    //     console.log("----------Bananas Velocity------------" + bananas.get(0).velocityX);
    // }
    // if (stones.length > 0) {
    //     console.log("----------Stones------------" + stones.get(0).x);
    //     console.log("----------Stones Velocity------------" + stones.get(0).velocityX);
    // }

    var velocityX = (forest.velocityX * 5) / 8;
    // console.log("VelocityX -- " + velocityX)
    if (stones.length > 0) {
        stones.get(0).velocityX = velocityX;
    }
    if (bananas.length > 0) {
        bananas.get(0).velocityX = velocityX;
    }
    monkeyHand.setCollider("rectangle", 0, 0, 20, 25, monkeyHand.rotation);
    monkey.collide(ground);
    monkeyHand.x = monkey.x + 10;
    monkeyHand.y = monkey.y - 5;
    monkeyAutomatedCollider.x = monkey.x
        + monkeyAutomatedColliderMonkeyXAddNumber;
    monkeyAutomatedCollider.y = monkey.y;

    if (timesCanStoneTouch <= 0) {
        gameState = END;
    }

    stones.collide(ground);
    bananas.collide(ground);
    monkey.velocityY += 0.8;

    if (forest.x < -15) {
        forest.x = 400;
    }

    monkeyHand.scale = monkey.scale;

    // Draw the sprites
    drawSprites();

    //External functions
    // setPropertiesOfObjects();
    controlGameWithGameStates();
    ground.width = 800;
}

function controlGameWithGameStates() {
    //When the game is not yet started
    if (gameState === "notStarted") {
        waitageTime += 1;
        ground.velocityX = 0;
        // Print all the texts
        textSize(20);
        text('Press these buttons to start playing, control the monkey with'
            + ' the arrow keys and spacebar if you are not in '
            + 'automated gaimng mode.'
            + ' Else, if you are, enjoy watching!', 5, 290, 395);
        textSize(18);
        // fill("black");
        text("Play with", 60, 195, 180, 235);
        text("Controlling", 60, 220, 180, 235);
        textSize(14);
        text("Enter Automated ", 232.5, 205);
        text("Gaming mode", 232.5, 230);

        //Set some properties for the objects when game is not started
        monkey.visible = false;
        monkey.scale = 0.075;
        timesCanStoneTouch = 2;
        monkeyHand.visible = false;
        singlePlayerButton.visible = true;
        automatedPlayingButton.visible = true;
        reset.visible = false;
        score = 0;
        time = 0;
        //Check which button is pressed to start the game
        if (mousePressedOver(singlePlayerButton)) {
            gameState = PLAY[0];
        }

        if (mousePressedOver(automatedPlayingButton)) {
            gameState = PLAY[1];
        }

    }
    //Do something when the game state is not equal to not started
    if (gameState != "notStarted") {
        //Write some texts when the game state is not equal to not started
        textSize(23);
        // fill("black");
        text("Survival Time: " + time, 100, 50);
        text("Score: " + score, 100, 120);
        text("Times you can touch the stones: " + timesCanStoneTouch, 10, 85);
        text("MouseX " + mouseX, 250, 170);
        text("MouseY " + mouseY, 250, 230);
    }

    //When the player wants to control the game himself
    if (gameState === PLAY[0]) {
        //Set some properties
        time += Math.round((World.frameRate / 30));
        monkey.visible = true;
        monkeyHand.visible = true;
        singlePlayerButton.visible = false;
        automatedPlayingButton.visible = false;
        // Spawn the objects
        spawnStones();
        spawnBananas();
        // forest.setVelocity(-1 * ((3 + 2 * time / 50)), 0);
        forest.setVelocity(-1 * ((3 + time / 50)), 0);
        if (keyDown("space") || keyDown("up")) {
            if (monkey.y > 320) {
                monkey.velocityY -= 14;
            }
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
        }

        if (stones.length > 0) {
            if (monkey.isTouching(stones)) {
                // if (((stones.get(0).x) - monkey.x) < (monkey.width + stones.width) / 2) {
                // gameState = END;
                stones.get(0).x = 30;
                timesCanStoneTouch -= 1;
            }
        }

        if (monkey.y < 317/* || forest.velocityX === 0*/) {
            // monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
            monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
            monkeyHand.visible = true;
            monkeyHand.rotationSpeed = 16;
        } else {
            monkey.changeAnimation("monkey", monkeyImage);
            monkeyHand.visible = false;
        }
        if (keyWentDown("space") || keyWentDown("up")) {
            monkeyHand.pointTo(190, 390);
        }

        // if (forest.velocityX === 0) {
        //     bananas.setVelocityYEach(0);
        // }

        if (bananas.length > 0) {
            if (monkey.isTouching(bananas) || monkeyHand.isTouching(bananas)) {
                bananas.destroyEach();
                score += 2;
                if (monkey.scale < 1) {
                    monkey.scale *= 1.05;
                }
            }
        }
    }

    // Perform some actions when the player is just seeing the game
    if (gameState === PLAY[1]) {
        // Automated gaming mode has been entered
        monkey.visible = true;
        monkeyHand.visible = true;
        singlePlayerButton.visible = false;
        automatedPlayingButton.visible = false;
        forest.setVelocity(-1 * ((3 + 2 * time / 50)), 0);

        // Spawn the objects
        spawnStones();
        spawnBananas();
        time += Math.round((World.frameRate / 30));

        // Check for the conditions and perform the actions
        // if (forest.velocityX === 0) {
        //     monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
        // }
        if (monkey.y < 317) {
            monkey.changeAnimation("monkey", monkeyImage);
        }
        if (stones.length > 0) {
            if (monkey.isTouching(stones)) {
                // if (((stones.get(0).x) - monkey.x) < (monkey.width + stones.width) / 2) {
                // gameState = END;
                stones.get(0).x = 30;
                timesCanStoneTouch -= 1;
            }
        }

        if (bananas.length > 0) {
            if (monkey.isTouching(bananas) || monkeyHand.isTouching(bananas)) {
                bananas.destroyEach();
                score += 2;
                if (monkey.scale < 1) {
                    monkey.scale *= 1.05;
                }
            }
        }

        if (stones.length > 0 && monkeyAutomatedCollider.isTouching(stones) && monkey.y > 320) {
            monkey.velocityY = -14;
        }

        if (bananas.length > 0 && monkeyAutomatedCollider.isTouching(bananas) && monkey.y > 320) {
            monkey.velocityY = -14;
        }

        if (monkey.y < 317/* || forest.velocityX === 0*/) {
            monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
            monkeyHand.visible = true;
            monkeyHand.rotationSpeed = 16;
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
            monkeyHand.visible = false;
        }

    }

    // When the game has been ended, perform the following actions
    if (gameState === END) {
        //Player lost!
        monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
        monkey.rotation = -120;
        monkey.y += 0.4;
        monkeyHand.x -= monkey.x;
        monkeyHand.visible = true;
        monkeyHand.rotationSpeed = 0;
        forest.velocityX = 0;
        stones.setVelocityXEach(-14);
        bananas.setVelocityXEach(-8);
        text("Game Over! Don't you want to play again?" +
            "                                  :D", 15, 195, 385);
        reset.visible = true;
        reset.addImage("reset", resetImage);
        if (mousePressedOver(reset)) {
            gameState = "notStarted";
            monkey.rotation = 0;
        }
    }

}

function setPropertiesOfObjects() {
    // Set the properties of the objects
    // stones.setVelocityEach((forest.velocityX * 5) / 8), 0;
    // bananas.setVelocityEach((forest.velocityX * 5) / 8, 0);
    // stones.setVelocityEach(- 1 * (ground.velocityX * 5) / 8, 0);
    // bananas.setVelocityEach(- 1 * (ground.velocityX * 5) / 8, 0);
    monkeyHand.setCollider("rectangle", 0, 0, 20, 25, monkeyHand.rotation);
    monkey.collide(ground);
    monkeyHand.x = monkey.x + 10;
    monkeyHand.y = monkey.y - 5;
    monkeyAutomatedCollider.x = monkey.x
        + monkeyAutomatedColliderMonkeyXAddNumber;
    monkeyAutomatedCollider.y = monkey.y;
    if (forest.velocityX <= 0 && forest.velocityX > -23) {
        forest.velocityX = -1 * ((3 + 2 * time / 50));
    }

    stones.collide(ground);
    bananas.collide(ground);
    monkey.velocityY += 0.8;
    if (forest.x < - 100) {
        forest.x = 300;
    }

}

function doSetup() {
    ground = createSprite(200, 200, 400, 50);
    ground.y = (400 - (ground.height / 2));
    ground.visible = false;

    timesCanStoneTouch = 2;

    forestImage.width = 800;
    // forestImage.height = 400;
    forestImage.scale = 0.5;
    forest = createSprite(200, 200);
    forest.addImage("forest", forestImage);
    forest.width = 800;
    forest.height = 400;
    forest.depth = -100;

    monkeyHand = createSprite();
    monkeyHand.addImage("monkey_hand", monkeyHandImage);
    monkeyHand.scale = 0.1;
    monkeyHand.rotation = 180;

    reset = createSprite(200, 275);
    reset.visible = false;

    monkey = createSprite(100, 180);
    monkey.scale = 0.075;
    monkey.addAnimation("monkey", monkeyImage);
    monkey.addImage("monkey-jumping", monkeyJumpingImage);

    monkeyAutomatedCollider = createSprite(0, 0, 65, 305);
    monkeyAutomatedCollider.visible = false;

    score = 0;
    time = 0;
    PLAY = ["Solo", "Automated"];
    END = 0;
    gameState = "notStarted";

    stones = createGroup();
    bananas = createGroup();

    monkeyAutomatedCollider = createSprite(0, 0, 65, 305);
    monkeyAutomatedCollider.visible = false;

    score = 0;
    time = 0;
    PLAY = ["Solo", "Automated"];
    END = 0;
    gameState = "notStarted";

    stones = createGroup();
    bananas = createGroup();

    singlePlayerButton = createSprite(110, 220);
    singlePlayerButton.addImage("single_player", singlePlayerButtonImage);
    singlePlayerButton.scale = 2;
    automatedPlayingButton = createSprite(290, 220);
    automatedPlayingButton.addImage("automated_gaming_mode", automatedPlayerButtonImage);
    automatedPlayingButton.scale = 2;
}

function spawnBananas() {
    if (World.frameCount % 110 === 0) {
        //Spawn the bananas when the condition is true
        // console.log("Creating New Banana");
        bananas.destroyEach();
        bananas.clear();
        var bananaY = random(190, 290);
        var banana = createSprite(450, bananaY);
        banana.addImage("banana", bananaImage);
        banana.scale = 0.05;
        bananas.add(banana);
        banana.velocityY += 0.5;
        monkeyAutomatedColliderMonkeyXAddNumber = random(70, 90);
        // banana.setVelocity(- 1 * (ground.velocityX * 5) / 8, 0);
    }
}

function spawnStones() {
    if (World.frameCount % 180 === 0) {
        //Spawn the stones when the condition is true
        // console.log("Creating New Stone");
        stones.destroyEach();
        stones.clear();
        var stone = createSprite(500, 200);
        stone.addImage("stone", stoneImage);
        stone.scale = 0.1;
        stone.setCollider("circle", 0, 0, 105);
        stone.rotationSpeed = forest.velocityX * 5 / 3;
        stone.velocityY += 10;
        stones.add(stone);
        monkeyAutomatedColliderMonkeyXAddNumber = random(70, 90);
        // stone.setVelocity(- 1 * (ground.velocityX * 5) / 8, 0);
    }
}