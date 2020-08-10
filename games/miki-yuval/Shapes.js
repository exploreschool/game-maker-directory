class Circle{
  constructor(center, rad) {
    this.centX = center[0];
    this.centY = center[1];
    this.rad = rad; 
    this.velX = 0;
    this.velY = 0;
    this.pos = this.buildPos();
  }

  buildPos(){
    let pos = []; 
    for(let y = this.centY - this.rad; y<=this.centY+this.rad; y++){
      for(let x = this.centX - this.rad; x<=this.centX+this.rad; x++){
        if((x-this.centX)**2 + (y-this.centY)**2 < this.rad**2){
          pos.push([x,y]);
        }
      }
    }
    return pos;
  }

  draw(){
    gameEngine.fillPixels(this.pos,  0,0,255,255);
  }

  makemove(moveX, moveY){
    this.centX += moveX;
    this.centY += moveY;
    this.pos = this.buildPos();
    //draw();
  }

  acc(accX, accY){
    this.velX+=accX;
    this.velY+=accY;
  }
  
  move(){
    this.centX += this.velX;
    this.centY += this.velY;
    this.pos = this.buildPos();
    //draw();
  }

  checkBounces(){
    if(this.centX < this.rad || this.centX >= gameEngine.canv.width){
      this.velX*=-1;}
    
    if(this.centY < this.rad || this.centY >= gameEngine.canv.height-this.rad){
      this.velY*=-1;
      this.centY = this.rad;
    }
  }
}


class Square{
  constructor(corner, lenX, lenY) {
    this.corX =corner[0];
    this.corY = corner[1];
    this.lenX = lenX;
    this.lenY = lenY;
    this.velX = 0;
    this.velY = 0;
    this.mid = [this.corX + this.lenX/2, this.corY + this.lenY/2];
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

  makemove(moveX, moveY){
    this.corX += moveX;
    this.corY += moveY;
    this.pos = this.buildPos();
    this.mid = [this.corX + this.lenX/2, this.corY + this.lenY/2];
    //draw();
  }

  move(){
    this.corX += this.velX;
    this.corY += this.velY;
    this.pos = this.buildPos();
    this.mid = [this.corX + this.lenX/2, this.corY + this.lenY/2];
    //draw();
  }

  hascollided(other){
    let AB = other.corX >= this.corX - other.lenX &&  other.corX <= this.corX  + this.lenX && other.corY >= this.corY - other.lenY &&  other.corY<= this.corY + this.lenY;

    if(AB)
      return true;

    return false;
  }

  hascollided1(other){
    return false;
  }
}