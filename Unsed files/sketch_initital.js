//Declare all global variables
var ground, monkeyHand, reset,
  monkey, monkeyAutomatedCollider, gameState,
  monkeyAutomatedColliderMonkeyXAddNumber,
  waitageTime, score, time, PLAY, END, stones, bananas,
  singlePlayerButton, automatedPlayingButton, forest;

var groundImage, monkeyHandImage, resetImage, monkeyImage, singlePlayerButtonImage, automatedPlayerButtonImage, bananaImage, stoneImage, monkeyJumpImage, forestImage;

function preload() {
  groundImage = loadImage("ground.png");
  monkeyHandImage = loadImage("monkey_jump_hand.png");
  resetImage = loadImage("reset.png");
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  singlePlayerButtonImage = loadImage("single_player.png");
  automatedPlayerButtonImage = loadImage("automated_gaming_mode.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  monkeyJumpImage = loadImage("monkey_jump.png");
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
  background(255, 255, 255);
  stones.setVelocityEach((ground.velocityX * 5) / 8), 0;
  bananas.setVelocityEach((ground.velocityX * 5) / 8, 0);
  monkeyHand.setCollider("rectangle", 0, 0, 20, 25, monkeyHand.rotation);
  monkey.collide(ground);
  monkeyHand.x = monkey.x + 10;
  monkeyHand.y = monkey.y - 5;
  monkeyAutomatedCollider.x = monkey.x
    + monkeyAutomatedColliderMonkeyXAddNumber;
  monkeyAutomatedCollider.y = monkey.y;
  if (ground.velocityX <= 0 && ground.velocityX > -23) {
    ground.velocityX = -1 * ((3 + 2 * time / 50));
  }
  console.log("---------------- Stones ----------------" + stones);
  console.log("---------------- Stones length ----------------" + stones.length);
  console.log("---------------- Ground ----------------" + ground);
  console.log("---------------- Bananas ----------------" + bananas);
  console.log("---------------- Bananas length ----------------" + bananas.length);

  // stones.collide(ground);
  bananas.collide(ground);
  monkey.velocityY += 0.8;
  if (forest.x < -15) {
    forest.x = 400;
  }

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
    text("Play with", 85, 195, 180, 235);
    text("Controlling", 85, 220, 180, 235);
    textSize(14);
    text("Enter Automated ", 232.5, 205);
    text("Gaming mode", 232.5, 230);

    // text("Enter Automated Gaming Mode", 220.5, 205, 200, 250);

    //Set some properties for the objects when game is not started
    monkey.visible = false;
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
    forest.setVelocity(-1 * ((3 + 2 * time / 50)), 0);

    if (forest.velocityX === 0) {
      monkey.addAnimation("monkey", monkeyImage);
    }
    if (keyDown("space") || keyDown("up")) {
      if (monkey.y > 320) {
        monkey.velocityY -= 11.3;
      }
    }
    else {
      monkey.changeAnimation("monkey", monkeyImage);
    }

    if (stones.length > 0 && monkey.isTouching(stones)) {
      //if (stones.length > 0) {
      // if (((stones.get(0).x) - monkey.x) < (monkey.width + stones.width) / 2) {
      gameState = END;
      // }
    }

    if (monkey.y < 320 || forest.velocityX === 0) {
      monkey.addImage("monkey_jump", monkeyJumpImage);
      monkeyHand.visible = true;
      monkeyHand.rotationSpeed = 16;
    } else {
      monkey.changeAnimation("monkey", monkeyImage);
      monkeyHand.visible = false;
    }
    if (keyWentDown("space") || keyWentDown("up")) {
      monkeyHand.pointTo(190, 390);
    }

    if (forest.velocityX === 0) {
      bananas.setVelocityYEach(0);
    }

    if (bananas.length > 0) {
      if (monkey.isTouching(bananas) || monkeyHand.isTouching(bananas)) {
        //if ((((bananas.get(0).x) - monkey.x) < (monkey.width + bananas.width) / 2) 
        //|| (((bananas.get(0).x) - monkeyHand.x) < (monkeyHand.width + bananas.width) / 2)) {
        bananas.destroyEach();
        score += 5;
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
    if (forest.velocityX === 0) {
      monkey.changeAnimation("monkey_jump", monkeyJumpImage);
    }
    if (monkey.y < 320) {
      monkey.changeAnimation("monkey", monkeyImage);
    }
    if (stones.length > 0 && monkey.isTouching(stones)) {
      //if (stones.length > 0 && ((stones.get(0).x) - monkey.x) < (monkey.width + stones.width) / 2) {
      gameState = END;
    }

    if (bananas.length > 0) {
      if (monkey.isTouching(bananas) || monkeyHand.isTouching(bananas)) {
        //if ((((bananas.get(0).x) - monkey.x) < (monkey.width + bananas.width) / 2) 
        //|| (((bananas.get(0).x) - monkeyHand.x) < (monkeyHand.width + bananas.width) / 2)) {
        bananas.destroyEach();
        score += 5;
      }
    }

    if (stones.length > 0 && monkeyAutomatedCollider.isTouching(stones) && monkey.y > 320) {
      monkey.velocityY = -11.3;
    }

    if (bananas.length > 0 && monkeyAutomatedCollider.isTouching(bananas) && monkey.y > 320) {
      monkey.velocityY = -11.3;
    }

    if (monkey.y < 320 || forest.velocityX === 0) {
      monkey.changeAnimation("monkey_jump", monkeyJumpImage);
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
    monkey.changeAnimation("monkey_jump", monkeyJumpImage);
    monkey.rotation = -120;
    monkey.y += 0.4;
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
  stones.setVelocityEach((forest.velocityX * 5) / 8), 0;
  bananas.setVelocityEach((forest.velocityX * 5) / 8, 0);
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
  // console.log("---------------- Stones ----------------"+stones);
  // console.log("---------------- Stones length ----------------"+ stones.length);
  // console.log("---------------- Ground ----------------"+ground);
  // console.log("---------------- Bananas ----------------"+bananas);
  // console.log("---------------- Bananas length ----------------"+bananas.length);

  // stones.collide(ground);
  // bananas.collide(ground);
  monkey.velocityY += 0.8;
  if (forest.x < 100) {
    forest.x = 300;
  }

}

function doSetup() {
  // The setup for all the globally defined variables and other things
  // groundImage.width = 800;
  // groundImage.height = 80;
  ground = createSprite(200, 200, 400, 50);
  // ground.addImage("ground", groundImage);
  // ground.width = 800;
  // ground.height = 80;
  ground.y = (400 - (ground.height / 2));

  forestImage.width = 800;
  forestImage.height = 400;
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
  monkey.scale = 0.1;

  monkeyAutomatedCollider = createSprite(0, 0, 65, 305);
  monkeyAutomatedCollider.visible = false;

  score = 0;
  time = 0;
  PLAY = ["Solo", "Automated"];
  END = 0;
  gameState = "notStarted";

  stones = createGroup();
  bananas = createGroup();

  // textSize(20);
  // fill("black");

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
    bananas.destroyEach();
    s.destroyEach();
    bananas.clear();
    //Spawn the stones when the condition is true
    var stone = createSprite(500, 200);
    stone.addImage("stone", stoneImage);
    stone.scale = 0.1;
    stone.setCollider("circle", 0, 0, 105);
    stone.rotationSpeed = forest.velocityX * 5 / 3;
    stone.velocityY += 10;
    stones.add(stone);
    o//nkeyAutomatedColliderMonkeyXAddNumber = random(70, 90);
  }
}