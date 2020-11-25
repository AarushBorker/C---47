var PLAY = 1;
var END = 0;
var gameState = PLAY;

var good, good_running, good_collided;

var alien, alien_idle, alien_attack;

var ground, invisibleGround, groundImage;

var bg;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  good_running =   loadAnimation("PNG/Knight/Run/run6.png",);
  good_attack = loadAnimation("PNG/Knight/Run_Attack/run_attack4.png")
  good_dead = loadAnimation("PNG/Knight/death/death4.png");
  
  groundImage = loadImage("PNG/City4/Bright/NewCity4.jpg");

  alien_idle = loadAnimation("2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0000_idle_1.png")
  alien_attack1 = loadAnimation("2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0035_fire_1.png","2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0036_fire_2.png","2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0037_fire_3.png",
  "2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0038_fire_4.png","2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0039_fire_5.png",
  "2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0040_fire_6.png","2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0041_fire_7.png",
  "2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0042_fire_8.png","2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0043_fire_9.png",
  "2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0044_fire_10.png","2d-Game-Alien-Character-Free-Sprite/alien/PNG/alien_green/green__0045_fire_11.png")
  //groundImage = loadImage("PNG/City4/Bright/City4.jpg");
  /*
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  */
/* 
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
*/
  //jumpSound = loadSound("jump.mp3");
  //dieSound = loadSound("die.mp3");
  //checkPointSound = loadSound("checkPoint.mp3"); 
}

function setup() {
  createCanvas(600, 200);
  
 bg = createSprite(850,60);

 bg.addImage(groundImage);
 bg.scale= 0.3;
 bg.debug = true;
 bg.velocityX = -6
 bg.setCollider("rectangle",0,0,4000,650)
 /*
  ground = createSprite(-100,20,600,20);
  ground.addImage("ground",groundImage);
  //'/ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.scale = 0.35;
  ground.debug = true;
*/
  good = createSprite(50,180,20,50);
  good.addAnimation("running", good_running);
  good.addAnimation("collided", good_dead);
  good.scale = 1.0;

  alien = createSprite(550,180,20,50)
  alien.addAnimation("attack", alien_attack1)
  alien.addAnimation("idle", alien_idle)
  alien.scale = 0.4


  /* 
  gameOver = createSprite(300,100);
 
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  */
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space") && good.y >= 159) {
      //jumpSound.play();
      good.velocityY = -14;
    }
  
    good.velocityY = good.velocityY + 0.8
  
    if (bg.x < -300){
      bg.x = 850;
    }
  
    good.collide(invisibleGround);
    
  
    //spawnObstacles();
    
    if (score>0 && score%100 === 0){
      //checkPointSound.play();
    }
  
    if(obstaclesGroup.isTouching(good)){
     // dieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    bg.velocityX = 0;
    good.velocityY = 0;
    //obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    good.changeAnimation("dead",good_dead);
    
    //set lifetime of the game objects so that they are never destroyed
    //obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}
/*
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    good.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
  }
}
*/
function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}