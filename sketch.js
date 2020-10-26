var PLAY = 1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground,invisbleGround;
var r;
var survivalTime;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  invisibleGround=createSprite(150,50,900,10);
  invisibleGround.visible=false;
  
  
  bananaGroup=new Group();
  obstacleGroup=new Group();
  
  
  score=0;
}


function draw() {

  
  background(255);
 if(gameState === PLAY){
    
     
  Food();
  Obstacles();
  
   if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score=score+1;
      
      }
   
   
   
  if(ground.x<0){
  ground.x=ground.width/2;
    }
  
  if(keyDown("space")){
     monkey.velocityY=-15;
    }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  monkey.collide(invisibleGround);
  
  survivalTime=0;

  
  stroke("black");
  textSize(20);
  fill("white");
  text(" Score :"+ score,300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text(" SurvivalTime"+ survivalTime,100,50);
}
  if(obstacleGroup.isTouching(monkey)){
     gameState=END;
     obstacleGroup.setVelocityEach=0;
     bananaGroup.setVelocityEach=0;
     obstacleGroup.destroyEach();
     bananaGroup.destroyEach();
     monkey.destroy();
     ground.destroy();
     }
  
  
  
  drawSprites();
  }

function Food(){
  
if (World.frameCount % 80 ==0) {
  banana=createSprite(300,100,40,10);
    banana.y=Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.velocityX=-3;
  banana.scale=0.1;
  banana.lifetime=100;
  bananaGroup.add(banana);
     }
}

function Obstacles(){
  
  if(World.frameCount % 300 == 0){
    obstacle=createSprite(400,320,40,40);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime=150;
    obstacle.velocityX=-3;
    obstacle.scale=0.2;
    obstacleGroup.add(obstacle);
}
  
  
  
}


