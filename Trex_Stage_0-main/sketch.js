
var trex ,trex_running,edges,ground,groundImage,invisibleGround,cloud,cloudImage,obstacles,obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6,obstaclesGroup,cloudsGroup;
var score=0;
var gameState="play";
var trex_collideImage;
var gameOverImage,restartImage,gameOver,restart;
var jumpSound,dieSound,checkPointSound;
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacleImage1=loadImage("obstacle1.png");
  obstacleImage2=loadImage("obstacle2.png");
  obstacleImage3=loadImage("obstacle3.png");
  obstacleImage4=loadImage("obstacle4.png");
  obstacleImage5=loadImage("obstacle5.png");
  obstacleImage6=loadImage("obstacle6.png");
  trex_collideImage=loadImage("trex_collided.png")
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkPointSound=loadSound("checkPoint.mp3")
}

function setup(){
 createCanvas(600,200)
 trex=createSprite(50,160,20,50)
 trex.addAnimation("running",trex_running)
 trex.scale=0.5;
 edges=createEdgeSprites();
 ground=createSprite(200,180,800,10);
 ground.addImage(groundImage);
 invisibleGround=createSprite(200,190,800,10)
 invisibleGround.visible=false;
 obstaclesGroup=new Group();
 cloudsGroup=new Group();
 gameOver=createSprite(300,80,30,20);
 gameOver.addImage(gameOverImage);
 restart=createSprite(300,140,30,20)
 restart.addImage(restartImage);
 trex.setCollider("circle",0,0,45)
  trex.debug=false;     

}

function draw(){
  background(180);
  text("Score :"+score,500,50);
  if (gameState==="play"){
   ground.velocityX=-2;
   score=score+Math.round(frameCount/100);
   if (ground.x<0){
       ground.x=200;
     }
   if (keyDown("space") && trex.y>=160){
       trex.velocityY=-5;
       jumpSound.play();
     }
     trex.velocityY=trex.velocityY+0.15;
   spawnCloud();
   spawnObstacles();
   if (obstaclesGroup.isTouching(trex)){
       gameState="end";
       dieSound.play();
     }
     restart.visible=false;
     gameOver.visible=false;
  }
   else if(gameState==="end"){
   ground.velocityX=0;
   trex.velocityY=0;
   trex.changeAnimation("running",trex_collideImage);
   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
   restart.visible=true;
   gameOver.visible=true;    
  }
 // console.log(trex.y);
  trex.collide(invisibleGround);
  //console.log(frameCount);

  if(mousePressedOver(restart)){
       reset();
  }
  drawSprites();
}

function spawnCloud(){
 if (frameCount%60===0){
  cloud=createSprite(590,60,40,10);
  cloud.y=Math.round(random(10,70));
  cloud.velocityX=-2; 
  cloud.addImage(cloudImage);
  cloud.scale=0.5;
  cloud.depth=trex.depth;
  trex.depth= trex.depth+1;
  //console.log(trex.depth);
  //console.log(cloud.depth); 
  cloud.lifetime=300;
  cloudsGroup.add(cloud);
 }
}
 function spawnObstacles(){
  if(frameCount%90===0){
  obstacles=createSprite(590,165,10,40)
  obstacles.velocityX=-6;   
  var ran=Math.round(random(1,6));
  //console.log(ran);
  switch (ran){
    case 1:obstacles.addImage(obstacleImage1);
           break;
    case 2:obstacles.addImage(obstacleImage2);
           break;
    case 3:obstacles.addImage(obstacleImage3);
           break;
    case 4:obstacles.addImage(obstacleImage4);
           break;
    case 5:obstacles.addImage(obstacleImage5);
           break; 
    case 6:obstacles.addImage(obstacleImage6);
           break;
    default:break;             
  }
  obstacles.scale=0.5;
  obstacles.lifetime=300;
  obstaclesGroup.add(obstacles);
  }

 }
 function reset(){
  gameState="play";
  restart.visible=false;
  gameOver.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;

 }