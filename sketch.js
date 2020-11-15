
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload()
  {


    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

  }

function setup()
  {

    var survivalTime = 0;
  //createCanvas(600,400);  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);  
  monkey.scale=0.1;

  ground = createSprite(300,350,1200,10);  
  ground.velocityX=-4;
  ground.x= ground.width/2;  

  foodGroup=createGroup();
  obstacleGroup = createGroup();  

  score = 0;

  }


function draw()
  {
  background("white");

    //adding ground 
  if(ground.x<0)
  {
    ground.x=ground.width/2;

  }  
    //jumping the monkey
    if(keyDown("space")&&monkey.y>=250)
      {
        monkey.velocityY=-12;
      }
    monkey.velocityY=monkey.velocityY+0.8;
    monkey.collide(ground);

    Banana();
    Obstacle();

    stroke("black");
    textSize(20);
    fill("black");
    text("Score : "+score,500,50);

        //game stops when monkey touches obstacles
        if(obstacleGroup.isTouching(monkey))
        {
          ground.velocityX = 0;
          monkey.velocityX = 0;
          monkey.velocityY = 0;
          obstacleGroup.setVelocityXEach(0);
          foodGroup.setVelocityXEach(0);
          obstacleGroup.setLifetimeEach(-1);
          foodGroup.setLifetimeEach(-1);
        }

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time : "+survivalTime , 100,50 );


  drawSprites();  

  }

  function Banana(){
    if(frameCount % 60===0)
    {
      //creating bananas and spawning them at different frame and giving them lifetime , scaling it and giving velocity
      banana = createSprite(600,120,20,20);
      banana.addImage(bananaImage);
      banana.velocityX=-5;
      banana.scale=0.08;
      foodGroup.add(banana);
    }
  }
  function Obstacle()
  {
    //creating obstacles and spawning them at different frame and giving them lifetime , scaling it and giving velocity
    if(frameCount % 300===0){
      obstacle = createSprite(800,320,10,40);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-3;
      obstacle.scale=0.2;
      obstacleGroup.add(obstacle);
    }
  }
