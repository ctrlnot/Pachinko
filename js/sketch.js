const Engine = Matter.Engine,
      World  = Matter.World,
      Bodies = Matter.Bodies;

let engine,
    world,
    balls = [],
    pins = [],
    boundaries = [];

let pause = false;

function setup() {
  createCanvas(500, 600);

  // initialize matterjs world
  engine = Engine.create();
  world = engine.world;

  // set gravity
  world.gravity.y = 1.5;

  // create pins
  const cols = 11;
  const rows = 10;
  const space = width / cols;
  for(let j = 0; j < cols; j++) {
    for(let i = 0; i < rows + 1; i++) {
      let x = i * space;
      if(j % 2 === 0) {
        x += space / 2;
      }
      let y = space + j * space;
      pins.push(new Pin(x, y));
    }
  }

  // create boundaries
  boundaries.push(new Boundary(-1, height / 2, 1, height)); // left
  boundaries.push(new Boundary(width + 1, height / 2, 1, height)); // right 
  boundaries.push(new Boundary(width / 2, height + 1, width, 1)); // bottom
}

function draw() {
  background(51);

  // generate balls :^)
  if(frameCount % 60 === 0) {
    balls.push(new Ball(200, 50, 10));
  }

  // run the matterjs simulation
  Engine.update(engine);

  // Display all pins
  for(let i = 0; i < pins.length; i++) {
    pins[i].show();
  }

  // Display all particles
  for(let i = 0; i < balls.length; i++) {
    balls[i].show();
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
