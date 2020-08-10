"use strict";

// initializing the game engine
const gameEngine = new GameEngine();
let x = Math.floor(Math.random() * 530 + 5);
let y = Math.floor(Math.random() * 400 + 5);
let size = Math.floor(Math.random() * 50 + 45);
let X_obs = Math.floor(Math.random() * 530 + 5);
let Y_obs = Math.floor(Math.random() * 400 + 5);
let Size_obs = Math.floor(Math.random() * 50 + 45);
let diff_color = 2; // Math.floor(Math.random() * 3 + 1);
let score = 0;
let should_paint = true;
let start_time = Math.round(Date.now() / 1000);
let message = "";

function mainLoop(data) {
  gameEngine.clear();
  detect_mouse();
  should_makesquare();
  message += "<br>Your score:" + score;
  time();
  gameEngine.writeParagraph(message);
  message = "";
  end();
}
gameEngine.startMainLoop(mainLoop, {});

function callback(x, y) {
  let pixels = gameEngine.getScreenPixels();
  let what_color = pixels.getPixel(x, y);
  console.log(`y coordinate ${y}, x coordinate ${y}`);
  console.log(pixels.getPixel(x, y));
  if (what_color[1] === 255) {
    should_paint = false;
    score += 1;
    sound();
    respawn();
  } else if (what_color[1] === 0) {
    message = "<br>You lost because you</br>werent precise enought";
    gameEngine.writeParagraph(message);
    sound_lose();
    gameEngine.clear();
    gameEngine.stopMainLoop();
  } else if (what_color[1] === 254) {
    score -= 1;
    sound_obs();
    respawn();
  }
}

function detect_mouse() {
  gameEngine.callOnClick(callback);
}

function respawn() {
  x = Math.floor(Math.random() * 530 + 5);
  y = Math.floor(Math.random() * 400 + 5);
  diff_color = 2; //Math.floor(Math.random() * 3 + 1);
  X_obs = Math.floor(Math.random() * 530 + 5);
  Y_obs = Math.floor(Math.random() * 400 + 5);
  Size_obs = Math.floor(Math.random() * 50 + 45);
  should_paint = true;
  if (score === 6 || 7 || 8 || 9 || 10) {
    size = Math.floor(Math.random() * 40 + 35);
  } else if (score === 11 || 12 || 13 || 14 || 15) {
    size = Math.floor(Math.random() * 35 + 30);
    score += 1;
  } else if (score === 16 || 17 || 18 || 19 || 20) {
    size = Math.floor(Math.random() * 30 + 25);
    score += 2;
  }
}

function should_makesquare() {
  if (should_paint === true) {
    makesquare(x, y, size);
    makesquare_obstacle(X_obs, Y_obs, Size_obs);
  }
}

function makesquare(xpos, ypos, size) {
  let positions = [];
  for (let y = ypos; y < size + ypos; y += 1) {
    for (let x = xpos; x < size + xpos; x += 1) {
      positions.push([x, y]);
    }
  }
  if (diff_color === 1) {
    gameEngine.fillPixels(positions, 255, 0, 0, 255);
  }
  if (diff_color === 2) {
    gameEngine.fillPixels(positions, 0, 255, 0, 255);
  }
  if (diff_color === 3) {
    gameEngine.fillPixels(positions, 0, 0, 255, 255);
  }
}

function sound() {
  gameEngine.playSound("laserShot");
}

function end() {
  if (score === 25) {
    message = "<br>You won by<br/> reaching 25 points";
    gameEngine.writeParagraph(message);
    gameEngine.clear();
    gameEngine.stopMainLoop();
  }
}

function makesquare_obstacle(xpos, ypos, size) {
  let positions = [];
  for (let y = ypos; y < size + ypos; y += 1) {
    for (let x = xpos; x < size + xpos; x += 1) {
      positions.push([x, y]);
    }
  }
  gameEngine.fillPixels(positions, 50, 50, 50, 254);
}

function sound_obs() {
  gameEngine.playSound("incorrect");
}

function time() {
  let current_time = Math.round(Date.now() / 1000);
  let time_since_start = current_time - start_time;
  message += "<br>Time:" + time_since_start;
  if (time_since_start === 30) {
    message = "<br>You lost because you</br>werent fast enought";
    gameEngine.writeParagraph(message);
    gameEngine.clear();
    gameEngine.stopMainLoop();
  }
}

function sound_lose() {
  gameEngine.playSound("incorrectHit");
}
