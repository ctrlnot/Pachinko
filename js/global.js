// Set global variables from matterjs
const Engine = Matter.Engine,
      World  = Matter.World,
      Events = Matter.Events,
      Bodies = Matter.Bodies;

// Set global ball size for scaling
const ballSize = 10; // 10px

// Set global variables for objects
let engine,
    world,
    balls = [],
    pins = [],
    boundaries = [];

let pause = false;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // generate balls :^)
  if(mouseX > 0 && mouseX < width) { // to make sure ball isn't off canvas
    const b = new Ball(mouseX, mouseY);
    balls.push(b);
  }
}

function keyPressed() {
  // Pause when spacebar is pressed
  if (key === ' ') {
    if (pause) {
      pause = false;
      noLoop();
    } else {
      pause = true;
      loop();
    }
  }
}
