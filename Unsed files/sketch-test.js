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
    background("lightgreen");
    drawSprites();
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
      bananas.clear();
      var bananaY = random(190, 290);
      var banana = createSprite(450, bananaY);
      banana.addImage("banana", bananaImage);
      banana.scale = 0.1;
      bananas.add(banana);
      banana.velocityY += 0.5;
      monkeyAutomatedColliderMonkeyXAddNumber = random(70, 90);
    }
  }
  
  function spawnStones() {
    if (World.frameCount % 180 === 0) {
      //Spawn the stones when the condition is true
      var stone = createSprite(500, 200);
      stone.addImage("stone", stoneImage);
      stone.scale = 0.1;
      stone.setCollider("circle", 0, 0, 105);
      stone.rotationSpeed = forest.velocityX * 5 / 3;
      stone.velocityY += 10;
      stones.add(stone);
      monkeyAutomatedColliderMonkeyXAddNumber = random(70, 90);
    }
  }