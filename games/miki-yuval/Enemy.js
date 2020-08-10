class Alien
{
  constructor(corner, lenX, lenY) {
    this.corX = corner[0];
    this.corY = corner[1];
    this.lenX = lenX;
    this.lenY = lenY;
    this.pos = this.buildPos();
  }

  buildPos(){
    let pos = [];
    for(let i = 0; i <= this.lenX; i++){
      for(let j = 0; j <= this.lenY; j++){
        pos.push([i+this.corX,j+this.corY]);
      }
    }
    return pos;
  }

  draw(){
    
    gameEngine.fillPixels(this.pos, 0,0,255,255);

  }

  makemove(moveX,moveY){
    this.corX += moveX;
    this.corY += moveY;
    this.pos = this.buildPos();
  }
}

class AGen
{
  constructor(width = 65 ,marginX = 50, marginY = 50,sizeX = 40, sizeY = 60, rows = 3, cols = 8, vel = 1)
  {
    this.marginX = marginX;
    this.marginY = marginY;
    this.cols = cols;
    this.rows = rows;
    this.width = width;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.alienboi = [];
    this.vel = vel;

    for(let i = 0; i < this.cols; i += 1)
    {
      for(let j = 0; j < this.rows; j += 1)
        this.alienboi.push(new Alien([this.marginX + i * this.width,this.marginY + j*this.width],this.sizeX, this.sizeY, [255,0,0,255]));
    }
    this.foo = new Alien([this.marginX, this.marginY], this.sizeX, this.sizeY);
  }

  move(){
    let jump = 0;
    if(this.foo.corX < this.marginX || 
       this.foo.corX >= gameEngine.canv.width-this.marginX-this.cols*this.width)
    {
      this.vel*=-1;
      jump=25;
    }
    for(let a of this.alienboi){
      a.makemove(this.vel,jump);
    }
    this.foo.makemove(this.vel,jump);
  }

  aliens(){
    return this.alienboi;
  }
}

