//initializing the game engine
const gameEngine = new GameEngine();
const width = gameEngine.getScreenWidth();
const height = gameEngine.getScreenHeight();
//let generator = new RGen();

let rnd = Math.random() * Math.PI/6 + Math.PI/6;
let rnd2 = Math.random() * Math.PI/6 + 2*Math.PI/3;
let rnd3 = Math.floor((Math.random() * 2) + 1);
if(rnd3 === 1)
{
  rnd3 = rnd;
}
else
{
  rnd3 = rnd2;
}
//radius = 15
let ball = new Circle(width/2, 65, 15, 6, rnd3); 
let rec = new Rectangle(370, 20, 490, 50, 15);

let rndX = Math.random() * (width - 10) + 5;
let miniRed = new Circle(rndX, height-5 , 4, 2, 3*Math.PI/2);
let coin = new Circle(rndX, height-5 , 4, 4, 3*Math.PI/2);
//let recs = generator.rect();

let rec11 = new Rectangle(60,280,110,300);
let rec12 = new Rectangle(140,280,190,300);
let rec13 = new Rectangle(220,280,270,300);
let rec14 = new Rectangle(300,280,350,300);
let rec15 = new Rectangle(380,280,430,300);
let rec16 = new Rectangle(460,280,510,300);
let rec17 = new Rectangle(540,280,590,300);
let rec18 = new Rectangle(620,280,670,300);
let rec19 = new Rectangle(700,280,750,300);

let rec21 = new Rectangle(60,350,110,370);
let rec22 = new Rectangle(140,350,190,370);
let rec23 = new Rectangle(220,350,270,370);
let rec24 = new Rectangle(300,350,350,370);
let rec25 = new Rectangle(380,350,430,370);
let rec26 = new Rectangle(460,350,510,370);
let rec27 = new Rectangle(540,350,590,370);
let rec28 = new Rectangle(620,350,670,370);
let rec29 = new Rectangle(700,350,750,370);

let rec31 = new Rectangle(60,420,110,440);
let rec32 = new Rectangle(140,420,190,440);
let rec33 = new Rectangle(220,420,270,440);
let rec34 = new Rectangle(300,420,350,440);
let rec35 = new Rectangle(380,420,430,440);
let rec36 = new Rectangle(460,420,510,440);
let rec37 = new Rectangle(540,420,590,440);
let rec38 = new Rectangle(620,420,670,440);
let rec39 = new Rectangle(700,420,750,440);

//array of rectangles
let blocks = [rec11,rec12,rec13,rec14,rec15,rec16,rec17,rec18,rec19,
rec21,rec22,rec23,rec24,rec25,rec26,rec27,rec28,rec29,
rec31,rec32,rec33,rec34,rec35,rec36,rec37,rec38,rec39]

function init()//A function that draws the initial blocks in the game
{
  for(let i =0; i<27; i++)
  {
    if(blocks[i].visible === true)
    {
      blocks[i].Draw(255, 255, 255, 255);
    }
  }   

  ball.Draw(10, 182, 250 ,255);
  rec.Draw(255, 255, 255, 255);

  if (redFlag === true)
  {
    miniRed.Draw(255, 0, 0, 255);
  }    
  if (cFlag === true)
  {
    coin.Draw(255,215,0, 255);
  }
}

function checkBlock(block)// delete block when the ball touches it
{  
  if ((block.visible === true) && (ball.yCenter + ball.rad + ball.speed >= block.y1))
  {
    if ((ball.xCenter + ball.rad > block.x1) && (ball.xCenter - ball.rad < block.x2))
    {
      gameEngine.playSound("whoosh");
      ball.angle = 2*Math.PI - ball.angle;
      block.Delete();
      block.visible = false;
      countScore++;
    }        
  } 
}

function touchBlock() // use the function checkBlock on 27 blocks
{
  for(let i = 0; i < 27; i++)
  {
    checkBlock(blocks[i]);
  }   
}
let cFlag = false;
let redFlag = false;
function initRedBall()
{
  rndX = Math.random() * (width - 10) + 5;
  miniRed.xCenter = rndX;
  miniRed.yCenter = height - 5;
  miniRed.Draw(255, 0, 0, 255);
  redFlag = true;
}
function initCoin()
{
  rndX = Math.random() * (width - 10) + 5;
  coin.xCenter = rndX;
  coin.yCenter = height - 5;
  coin.Draw(255, 0, 0, 255);
  cFlag = true;
}

function restart()
{
  for(let i =0; i<27; i++) 
  {
    blocks[i].visible = true;
    gameEngine.clear();    
  }      
}

function isWin()// cheack if the player won
{
  for(let i = 0; i <27; i++)
  {
    if(blocks[i].visible === true)
    {
      return false;
    }
  }
  return true;
}

function isLost() //Game Over
{  
  if (ball.yCenter < rec.y2 && (ball.xCenter - ball.rad <= rec.x2 || ball.xCenter + ball.rad >= rec.x1))
  {
    return true;
  }
  if (miniRed.yCenter - miniRed.rad < rec.y2 && (miniRed.xCenter - miniRed.rad <= rec.x2 && miniRed.xCenter + miniRed.rad >= rec.x1))
  {
    return true;
  }
  return false;
}

function lostScreen()
{
  gameEngine.writeParagraph("<p><br>Game Over 💀</p>your score is: "+ countScore + "<br> You got: "+ coins + " coins");    
  gameEngine.playSound("ohNo");
  gameEngine.stopMainLoop();       
  init();    
  console.log("Game Over"); 
  console.log(countScore);
  restart();  
}

function winScreen()
{
    gameEngine.writeParagraph("<p><br>You Won 👑</p>your score is: "+ countScore + "<br> You got: "+ coins + " coins");  
    gameEngine.stopMainLoop();       
    init();    
    console.log("Game Over"); 
    console.log(countScore);
    restart(); 
}

function touchCoin()
{
  if (coin.yCenter < 50 && coin.yCenter > 45 && (coin.xCenter - coin.rad <= rec.x2 && coin.xCenter + coin.rad >= rec.x1))
  {
    return true;
  }
  return false;
}

function touchBoard()
{
  if ((ball.yCenter - ball.rad <= rec.y2) && (ball.xCenter - ball.rad < rec.x2) && (ball.xCenter + ball.rad > rec.x1))
  {
    return true;
  }
  return false;
}

let countScore = 0;
let coins = 0;
let num =1;
let rndTime = 0;

function notTouchEdge()
{
  if ((ball.yCenter + ball.rad + ball.speed < height) && (ball.xCenter - ball.rad - ball.speed > 0) && (ball.xCenter + ball.rad + ball.speed < width))
  {
    return true;
  }
  return false;
}

function moveCoins()
{
  if (redFlag === false)
  {
    initRedBall();
  }
  else if (miniRed.yCenter > 10) //flag is true
  {
    miniRed.Move();
  }
  else
  {
    miniRed.Delete();
    redFlag = false;
  }


  if (cFlag === false)
  {
    initCoin();
  }
  else if (coin.yCenter > 10) //flag is true
  {
    coin.Move();
  }
  else
  {
    coin.Delete();
    cFlag = false;
  }
}


function mainLoop(data)
{     
  gameEngine.writeParagraph("<br>⭐ Score: "+ countScore +"<br>" + "💰 Coins: " + coins);  
  gameEngine.clear();

  ball.Move();   

  if (isLost()) //checks if the player loses
  {
    lostScreen();
  }

  touchBlock(); //checks if the ball touches any block   

  if(isWin())
  {
    winScreen();
  }
  
  if (touchCoin()) //checks if the ball touches yellow coin
  {
    cFlag = false;
    coin.Delete();
    coins++;
  }

  if (touchBoard()) //checks if the ball touches the board
  {
    ball.angle = 2*(Math.PI) - ball.angle;
  }  

  if (notTouchEdge()) //ensures that the ball doesn't touch the right, left and top edges
  {
    ball.Move();    
  }
  else
  {
    ball.angle = num*Math.PI - ball.angle; //changes ball's angle
    num++;
    ball.Move();
  }

  //moves the board
  if (gameEngine.isKeyHeld("ArrowRight")&& (rec.x2 + rec.step < width)) //right
  {
    gameEngine.clear();
    rec.MoveRight();
  }

  if (gameEngine.isKeyHeld("ArrowLeft") && (rec.x1 - rec.step > 0)) //left
  {
    gameEngine.clear();
    rec.MoveLeft();
  }    

  moveCoins();

  init();   
 
} 

gameEngine.startMainLoop(mainLoop, {});