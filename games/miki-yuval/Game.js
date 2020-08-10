function reset(){

  points = 0;
  lives = 3;
  missed = 0; 
  d = Date.now();
  ac = 0;
  sp = 0;
  ship = new Square([gameEngine.canv.width-50, gameEngine.canv.height-50],40,40);
  evilShip = new Square([25,25],60,20);
  evilShip.velX = 2.5;
  pews=[];
  evilPews = [];
  de = 25;

}


function first_lvl(){
  generator = new AGen(65 ,50,50,40,60,3,3,1);
  shipImg = document.getElementById('tux');
  evilShipImg  = document.getElementById('resistor');
  enemyImg  = document.getElementById('enem');
  pewImg = document.getElementById('one');
  evilPewImg = document.getElementById('zero');
  back = document.getElementById('back1');
}

function com_lvl(){
  generator = new AGen(65,50,80,40,40,4,6,2);
  shipImg = document.getElementById('tux');
  evilShipImg  = document.getElementById('kb');
  evilShip.vel = 20;
  evilShip.lenY*=2;
  enemyImg  = document.getElementById('com');
  pewImg = document.getElementById('mouse');
  evilPewImg = document.getElementById('loading');
  back = document.getElementById('back3');
}

function os_lvl()
{
  evilShip.lenY = 60;
  generator = new AGen(60,40,90,50,50,4,7,2);
  shipImg = document.getElementById('tux');
  evilShipImg  = document.getElementById('win');
  enemyImg  = document.getElementById('gnu');
  pewImg = document.getElementById('fire');
  evilPewImg = document.getElementById('light');
  back = document.getElementById('back2')
}

function java_lvl()
{
  evilShip.lenY = 60;
  generator = new AGen(60,40,90,50,50,5,5,3);
  evilShip.vel = 100;
  generator.vel = 5;
  shipImg = document.getElementById('tux');
  evilShipImg  = document.getElementById('coffee');
  enemyImg  = document.getElementById('duke');
  pewImg = document.getElementById('turing');
  evilPewImg = document.getElementById('loading');
  back = document.getElementById('back4')
}


function loop(){

  if(generator.alienboi.length === 0){
    console.log("LVL: " + lvl);
    lvl++;
    play();
  }

  gameEngine.clear("darkgreen");
  ctx = gameEngine.canv.getContext('2d');
  ctx.drawImage(back, 0, 0, gameEngine.canv.width, gameEngine.canv.height);
  
  de+=1;

  dispose();
  move();
  checkHits();
  checkDamage();

  if((gameEngine.isKeyHeld(" ") || gameEngine.isKeyHeld("ArrowUp")) && de>25)
  {
    shoot();
    de = 0;
  }

  if(sp >= evilShip.corX && sp <= evilShip.corX + evilShip.lenX)
  {
    evilShoot();
    sp=-10;
  }

  drawPews();
  drawPlayers();

  writeScore();

  if(lives===0){
    lvl = 0;
    play();
  }
}


function play0(){
  gameEngine.stopMainLoop();
  lose();
}

function play1(){
  reset();
  first_lvl();
  gameEngine.startMainLoop(loop, {});
}

function play2(){
  gameEngine.stopMainLoop();
  reset();
  com_lvl();
  gameEngine.startMainLoop(loop, {});
}

function play3(){
  gameEngine.stopMainLoop();
  reset();
  os_lvl();
  gameEngine.startMainLoop(loop, {});
}

function play4()
{
  gameEngine.stopMainLoop();
  reset();
  java_lvl();
  gameEngine.startMainLoop(loop, {});
}

function play_win(){
   gameEngine.stopMainLoop();
    win();
}

function play(){
  if(lvl === 0)
  {
    play0();
  }

  else if(lvl === 1)
  {
    play1();
  }
  
  else if(lvl === 2)
  {
    play2();
  }

  else if(lvl === 3)
  {
    play3();
  }

  else if(lvl === 4)
  {
    play4();
  }

  else if(lvl === 5)
  {
    play_win();
  }
} 

function lose(){
  reset();
  ctx.clearRect(0, 0, gameEngine.canv.width, gameEngine.canv.height);
  back = document.getElementById('backdeath')
  ctx.drawImage(back, 0, 0, gameEngine.canv.width, gameEngine.canv.height);
}

function win(){
  reset();
  ctx.clearRect(0, 0, gameEngine.canv.width, gameEngine.canv.height);
  back = document.getElementById('win2')
  ctx.drawImage(back, 0, 0, gameEngine.canv.width, gameEngine.canv.height);
}