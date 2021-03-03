var space, spaceImg;
var asteroid1, asteroid2, asteroid3, asteroidGroup;
var laser,laserImage, laserGroup;
var spaceShip, spaceShipImg;
var blast, blastImg;

var explosionSound, laserSound;

var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  spaceImg = loadImage("space.png");
  spaceShipImg = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("asteroid1.png");
  asteroid2 = loadImage("asteroid2.png");
  asteroid3 = loadImage("asteroid3.png");
  blastImg = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laserSound.mp3");
}

function setup() {
  createCanvas(1000,700);

  space = createSprite(250, 350, 30, 20);
  space.addImage(spaceImg);
  space.velocityY = 4

  spaceShip = createSprite(300,540);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale = 0.6;

  laserGroup = createGroup();
  asteroidGroup = createGroup();
}

function draw() {
  background(12,7,22); 
  
  Asteroids();
  
  if(gameState === PLAY) {
    
    stroke("white");
    fill("white");
    textSize(20);
    text("Score : " + score, 400,40);

  if(space.y > 800) {
    space.y = 300;
  }

  if(keyDown("right") && spaceShip.x < 1200) {
    spaceShip.x = spaceShip.x + 10;
  }

  if(keyDown("left") && spaceShip.x > 60) {
    spaceShip.x = spaceShip.x - 10;
  }

  if(keyDown("space")) {
    laser = createSprite(300,540);
    laser.addImage(laserImage);
    laser.x = spaceShip.x;
    laser.velocityY = -7;
    laser.scale = 0.3;
    laserSound.play();

    laserGroup.add(laser);
  }

  if(asteroidGroup.isTouching(laserGroup)) {
    asteroidGroup.destroyEach();
    laserGroup.destroyEach();
    explosionSound.play();
    score = score + 5;
  }
}

else if(gameState === END) {
  if(spaceShip.isTouching(asteroidGroup)) {
    asteroidGroup.destroyEach();
    spaceShip.destroy();

    var blast = createSprite(300,540);
    blast.addImage(blastImg);
    blast.lifetime = 25;
    explosionSound.play();
    //gameState = END;
  }
  space.velocityY = 0;
}


  
drawSprites();
}

function Asteroids() {
  if(frameCount % 100 === 0) {
    var asteroid = createSprite(200,100,50,50);
    asteroid.lifetime = 190;
    asteroid.scale = 0.5;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1 : asteroid.addImage(asteroid1);
      break;
      case 2 : asteroid.addImage(asteroid2);
      break;
      case 3 : asteroid.addImage(asteroid3);
      break;
      default : break;
    }

    asteroidGroup.add(asteroid1);
  }
}