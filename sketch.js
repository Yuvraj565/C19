var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();

  climbersGroup = new Group();

  ghost = createSprite(200, 200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;

  invisibleBlockGroup = new Group();

  spookySound.loop();

}

function draw() {
  background(200);
  if (gameState == "play"){
    if (keyDown("UP_ARROW")){
      ghost.velocityY = -6
    }
  
    ghost.velocityY += 0.5
  
    if (keyDown("LEFT_ARROW")){
      ghost.x -= 10
    }  
  
    if (keyDown("RIGHT_ARROW")){
      ghost.x += 10
    }  
  
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>599){
      gameState = "end";
    }
  
    if(tower.y > 400){
        tower.y = 300
      }
    spawn_doors();
    drawSprites();
  }
  
  if(gameState == "end"){
    textSize(70)
    stroke("yellow");
    fill("yellow");
    text("GAME OVER", 300, 100);
  }
  

}


function spawn_doors(){
  if(frameCount%150 == 0){
    door = createSprite(random(100, 500), -50);
    door.addImage(doorImg);
    climber = createSprite(door.x, 15);
    climber.addImage(climberImg);

    invisibleBlock = createSprite(door.x, 20, climber.width, 10)
    invisibleBlock.velocityY = 4
    invisibleBlock.visible = false
    invisibleBlockGroup.add(invisibleBlock)

    door.velocityY = 4;
    door.lifetime = 160;
    climber.velocityY = 4;
    climber.lifetime = 160;
    doorsGroup.add(door);
    climbersGroup.add(climber);

    ghost.depth = climber.depth+1;
  }
}