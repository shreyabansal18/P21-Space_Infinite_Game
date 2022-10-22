var space, spaceImg;
var rocket, rocketImg;
var meteor, meteorImg, meteorsGroup;
var gameState = "play";


function preload(){
spaceImg = loadImage("space.jpg");
rocketImg = loadImage("rocket.png");
meteorImg = loadImage("meteor.png");

}

function setup() {
 createCanvas(600,600)
 space = createSprite(300,300);
  space.addImage("space",spaceImg);
  space.velocityY = 1;
  rocket = createSprite(200,200,50,50);
  rocket.addImage("rocket",rocketImg);
  rocket.scale = 0.03
  meteorsGroup = new Group();
}

function draw() {
    if(space.y > height){
        space.y = 300
      } 
    
    if (gameState === "play") {
    
      if(keyDown(LEFT_ARROW)){
          rocket.x = rocket.x - 3;
      }
      if(keyDown(RIGHT_ARROW)){
    
            rocket.x = rocket.x + 3;
      }
      if(keyDown("space")){
        rocket.velocityY = -10;
      }
    
    rocket.velocityY = rocket.velocityY + 0.8;
    
      if(meteorsGroup.isTouching(rocket) || rocket.y > 600){
        rocket.destroy();
        gameState = "end";
      }
      
      spawnMeteors();
    }
    drawSprites();
    
    
    if (gameState === "end"){
        space.velocityY = 0;
        meteorsGroup.setVelocityYEach(0)
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over", 230,250)
      }
    }
    function spawnMeteors()
    {
    
     if (frameCount % 240 === 0) {
       var meteor = createSprite(200,10);
       meteor.x=random(100,500)

       meteor.addImage("meteor",meteorImg);
       
       meteor.velocityY = 1;

       rocket.depth = meteor.depth
       meteor.depth +=1;
       
       meteor.lifetime = 800;
       meteor.scale = 0.05
       meteor.debug = true;

       meteorsGroup.add(meteor);
     }
   }
   
   