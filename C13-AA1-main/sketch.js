var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var gameState=START
var START =1
var END =0




var score;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  clout = loadImage("cloud.png")
   cactus1 = loadImage("obstacle1.png")
  cactus2 = loadImage("obstacle2.png")
  cactus3 = loadImage("obstacle3.png")
  cactus4 = loadImage("obstacle4.png")
  cactus5 = loadImage("obstacle5.png")
  cactus6 = loadImage("obstacle6.png")
  reintentar = loadImage("restart.png")
  gameoverr = loadImage("gameOver.png")
  //die = loadSound("die.mp3")
  //checkpoint = loadSound("checkpoint.mp3")
  //jump = loadSound("jump.mp3")
}

function setup() {

  createCanvas(600,200)
 
  cactus_group=new Group();
  nube_group=new Group();

  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generar numeros aleatorios
  var rand =  Math.round(random(1,100))
 
 //sprite gameover
 gameOver= createSprite (300,100)
 gameOver.addImage(gameoverr)
 //sprite restart
 restart= createSprite(300,140);
restart.addImage(reintentar);
}

function draw() {
  //establecer color de fondo
  background(180);
 //game start
 if (gameState===START){
  spawnClouds();
  spawnCactus();
  gameOver.visible=false;
  restart.visible=false;


  console.log("start")
   //trex saltar
   if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    //jump.play();
  }
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  
  }
  
   //evitar que el Trex caiga
   trex.collide(invisibleGround)
 

 if (cactus_group.isTouching(trex)){
   gameState=END;
   die.play ();

}
}  
 
 if (gameState===END){
   ground.velocityX=0;
   gameOver.visible=true;
   restart.visible=true;
   cactus_group.setVelocityXEach(0);
   nube_group.setVelocityXEach(0); // velocity Y 
}
  
  drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
if (frameCount %70 ===0){
  cloud=createSprite(600,100,35,8);
  cloud.velocityX=-3;
  cloud.addImage(clout);
  cloud.y=Math.round(random(10, 60));
  console.log ("esta es la profundidad del trex " + trex.depth);
cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
cloud.lifetime=300
nube_group.add(cloud)
}
 
}
function spawnCactus(){
 if (frameCount %60 === 0){
  var cactus=createSprite(600,155,10,40);
  cactus.velocityX=-4;
  var rand = (Math.round(random(1,6)))
  switch (rand){
    case 1: cactus.addImage(cactus1); 
    break;
     case 2: cactus.addImage(cactus2); 
    break;
     case 3: cactus.addImage(cactus3); 
    break;
     case 4: cactus.addImage(cactus4); 
    break;
     case 5: cactus.addImage(cactus5); 
    break;
     case 6: cactus.addImage(cactus6); 
    break;
     default: break;
     cactus_group.add(cactus) // este no va aqui 
  }
  cactus.scale=0.5
   // ponlo aqui
 }

}

function reset (){
 // faltan todas estas instrucciones 
}
