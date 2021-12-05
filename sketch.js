//global variable declaration
var bg, backgroundImg;
var score = 0

//function preload to load all the game assets
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImage = loadImage("images/iron.png");
  stoneImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImage = loadImage("images/spikes.png");
}

//body of function setup
function setup() {
  createCanvas(1000, 600);
  //bg sprite declared
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2;

  //iron sprite declared
  iron = createSprite(450,400,400,10);
  iron.addImage(ironImage);
  iron.scale = 0.3;
  iron.debug = true;
  iron.setCollider("rectangle",100,0,200,400)

  //ground sprite declared
  ground =createSprite(200,585,900,10)
  ground.visible=false;

  //declaration of groups
  stoneGroup = new Group();
  diamondGroup = new Group();
  spikeGroup = new Group();
}

//body of function draw
function draw() {
  //to move the background slowly
  bg.velocityY=4
  if (bg.y > 500){
    bg.y=bg.width/4;
  }

  //to move the iron sprite inside the canvas(towards right)
  if(keyDown("right")){
    iron.velocityX = +4;    
  }

  //to move the iron sprite inside the canvas(towards left)
  if(keyDown("left")){
    iron.velocityX = -4;    
  }
 
  //to prevent iron from escaping the y axis
  if(keyDown("up")){
    iron.velocityY = -9;    
  }

  //to let iron jump
    iron.velocityY = iron.velocityY + 0.5
    iron.collide(ground)//to prevent iron sprite from falling down

    generateStones();//calling of generateStones function

  for(var i=0 ; i< (stoneGroup).length ;i++){
      var temp = (stoneGroup).get(i);

      if(temp.isTouching(iron)){
          iron.collide(temp);
      }
  }

  generateDiamonds();//calling of generateDiamonds function

    for(var i = 0 ; i< (diamondGroup).length ;i++){
        var temp = (diamondGroup).get(i) ;
        
        if (temp.isTouching(iron)) {
          score++;//to increase the score by 1
          temp.destroy();
          temp=null;
          }            
        }

  generateSpikes();//calling of generateSpikes function

    for(var i=0 ; i< (spikeGroup).length ;i++){
      var temp = (spikeGroup).get(i);

      if(temp.isTouching(iron)){
          score = score -5;//to decrease the score by 5
          temp.destroy()
      }
  }
    
drawSprites();

textSize(20);//to increase the text size 
fill("yellow");
text("Diamonds Collected: "+ score ,400,50);//to display the score
}

//body of function generateStones
function generateStones(){
  if(frameCount % 70 === 0){
    //stone sprite declared
      var stone = createSprite(1200,120,40,10);
      stone.x = random(50,450);
      stone.addImage(stoneImage);
      stone.scale = 0.8;
      stone.velocityY = +5;

      stone.lifetime = 250;
      stoneGroup.add(stone);
  }
}

//body of function generateDiamonds
function generateDiamonds() {
  if (frameCount % 50 === 0) {
    //diamond sprite declared
    var diamond = createSprite(1200,120,40,10);
    diamond.x = random(80,350);
    diamond.addImage(diamondImage);
    diamond.scale = 0.4;
    diamond.velocityY = +3;

    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
    }
  }
//body of function generateSpikes
function generateSpikes(){
  if(frameCount % 90 === 0) {
    //spike sprite declared
    var spike = createSprite(1200,120,40,10);
    spike.x = random(50,450);
    spike.addImage(spikeImage);
    spike.scale = 0.8;
    spike.velocityY = +5;

    spike.lifetime = 250;
    spikeGroup.add(spike);
  }
}