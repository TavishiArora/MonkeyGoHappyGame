//declaring the variables

var monkey , monkey_running;
var ground;
var banana ,bananaImage, BananasGroup, obstacle, obstacleImage;
var obstaclesGroup;

function preload(){
  
  //loading the animations
  
  monkey_running =loadAnimation 
  ("sprite_0.png","sprite_1.png","sprite_2.png",
  "sprite_3.png","sprite_4.png","sprite_5.png",
  "sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  //creating canvas
  createCanvas(600,500);
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  //creating ground
  ground=createSprite(400,350,900,10);
  ground.velocityX= -8;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  //creatimg the new groups
  BananasGroup=new Group();
  obstaclesGroup = new Group();
  
  var survivalTime=0;
}

function draw() {
  
  //creating the background
  background(225);
  
  //text
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime,100,50);
  
  //moving the ground
  if(ground.x>400){ 
    ground.x=ground.width/2;
  }
  
  //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
    
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //to stop it from falling down
  monkey.collide(ground);
  
  //calling the functions
  spawnObstacles();
  spawnBananas();
  
  drawSprites();
}

function spawnBananas(){
  if (frameCount % 80 === 0){
    var Banana = createSprite(600,165,10,40);
    Banana.addImage(bananaImage);
    Banana.scale=0.2;
    Banana.velocityX = -3;
    Banana.x = Math.round(random(100,200));
    Banana.lifetime=250;
    BananasGroup.add(Banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(400,350,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX = -2;
    obstacle.x = Math.round(random(50,150));
    obstacle.collide(ground);
    obstacle.lifetime=250;
    obstacle.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    obstaclesGroup.add(obstacle);
  }
}