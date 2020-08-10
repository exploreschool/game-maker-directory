const gameEngine = new GameEngine();
var ctx = gameEngine.canv.getContext('2d');

var lvl = 1;
var points;
var lives; 
var missed; 
var d;
var ac;

var sp;
var generator;
var ship;
var evilShip;
var pews=[];
var evilPews = [];
var de;

var shipImg;
var evilShipImg;
var enemyImg;
var pewImg;
var evilPewImg;
var bossImg;
var back;

function move(){
  checkBounce(evilShip);
  checkMove(ship);

  evilShip.move();
  generator.move();
}

function drawPews(){
  for(let i =pews.length - 1; i >= 0; i-=1){
    let pew = pews[i];
    pew.move();
    ctx.drawImage(pewImg, pew.corX, pew.corY, pew.lenX*2, pew.lenY*2);
  }

  for(let i = evilPews.length - 1; i >= 0; i-=1){
    let pew = evilPews[i];
    pew.move();
    ctx.drawImage(evilPewImg, pew.corX, pew.corY, pew.lenX*2, pew.lenY*2);
  }
}

function drawPlayers(){
  ctx.drawImage(shipImg, ship.corX, ship.corY, ship.lenX, ship.lenY);
  ctx.drawImage(evilShipImg, evilShip.corX, evilShip.corY, evilShip.lenX,evilShip.lenY);
  for(let alien of generator.aliens())
  {
    ctx.drawImage(enemyImg, alien.corX, alien.corY, alien.lenX, alien.lenY);
  }
}

function dispose(){
  for(let i=pews.length-1; i>=0; i--){
    if(pews[i].corY <= 0){
      pews.splice(i, 1);
      missed+=1;
    }
}

for(let i= evilPews.length-1; i>=0; i--){
  if(evilPews[i].corY >= gameEngine.canv.height)
    evilPews.splice(i, 1);
  }
}

function checkHits(){
  for(let i =pews.length - 1; i >= 0; i-=1)
  {
    let pew =pews[i];
    for(let j = generator.alienboi.length-1; j >= 0; j-=1)
    {
      let other = generator.alienboi[j];
      if(pew.hascollided(other)){
        gameEngine.playSound("plus");
        points+=1;
        pews.splice(i,1);
        generator.alienboi.splice(j,1);
      }
    }
  }
}

function checkDamage(){
  for(let i =evilPews.length - 1; i >= 0; i-=1)
  {
    let pew = evilPews[i];
    if(pew.hascollided(ship)){
      this,gameEngine.playSound("donk");
      lives-=1;
      evilPews.splice(i,1);
    }
  }
}

function writeScore(){
  gameEngine.writeParagraph("<br>Points:"+points+"<br>" + "<br>Lives:"+lives+"<br>"
  + "<br>Missed:"+missed+"<br>" 
  + "<br>Time:" + (Date.now() - d)/1000 +"<br>");
}

function checkMove(sh){
  if(gameEngine.isKeyHeld("ArrowRight"))
    {
      sh.makemove(5,0);
    }

    if(gameEngine.isKeyHeld("ArrowLeft"))
    {
      sh.makemove(-5,0);
    }
}

function checkBounce(sh){
  if(sh.corX<0 || sh.corX>gameEngine.canv.width-sh.lenX){
    sh.velX *=-1;
    sp = 25 + Math.floor(Math.random() * (gameEngine.canv.width));
    console.log(evilPews);
  }
}


function shoot(){
  let pew = new Square([ship.mid[0], ship.corY],15,15);
  pew.velY = -5;
  gameEngine.playSound("laserShot");
  pews.push(pew);
}

function evilShoot(){
  let pew = new Square(evilShip.mid,15,15);
  pew.velY = 5;
  gameEngine.playSound("mintyAttack");
  evilPews.push(pew);
}

function handlePews(pews){
  let pos = [];
  for(let i = pews.length - 1; i >= 0; i-=1){
    let pew = pews[i];
    pew.move();
    pos = pos.concat(pew.pos);
  }
}

function dispose(){
  for(let i=pews.length-1; i>=0; i--){
    if(pews[i].corY <= 0){
      pews.splice(i, 1);
      missed+=1;
    }
  }

  for(let i=evilPews.length-1; i>=0; i--){
    if(evilPews[i].corY >= gameEngine.canv.height)
      evilPews.splice(i, 1);
  }
}
