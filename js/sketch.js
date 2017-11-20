const Engine = Matter.Engine,
      World  = Matter.World,
      Bodies = Matter.Bodies;

let engine,
    world,
    balls = [],
    pins = [],
    boundaries = [];

// set colors
const colors = {'a': '#D93033',     // color(217, 48, 51) red
                'b': '#ED3655',     // color(237, 54, 85) light red
                'c': '#F9220B',     // color(249, 34, 11) orange
                'd': '#F19736',     // color(241, 151, 54) light orange
                'e': '#8A35F2',     // color(138, 53, 242) violet
                'f': '#FF0080',     // color(255, 0, 128) pink
                'g': '#3571ED',     // color(53, 113, 237) blue
                'h': '#32E4F2',     // color(50, 228, 242) light blue
                'i': '#F5DF0F',     // color(245, 223, 15) yellow
                'j': '#985A28',     // color(152, 90, 40) brown
                'k': '#52C127',     // color(82, 193, 39) green
                'l': '#7BFB0A'};    // color(123, 251, 10) light green

const hash = window.location.hash.substr(1);

let pause = false;

function setup() {
  createCanvas(480, 640);

  // initialize matterjs world
  engine = Engine.create();
  world = engine.world;

  // set gravity
  world.gravity.y = 1.5;

  // create pins
  const cols = 10;
  const rows = 10;
  let space = width / cols;
  for(let j = 0; j < cols; j++) {
    for(let i = 0; i < rows + 1; i++) {
      let x = i * space;
      if(j % 2 === 0) {
        x += space / 2;
      }
      let y = 120 + j * space;
      pins.push(new Pin(x, y));
    }
  }

  // create boundaries
  const hashActLength = hash.length - 1;
  space = width / hashActLength;

  // Add border boundaries
  boundaries.push(new Boundary(-2, height / 2, 1, height)); // left border
  boundaries.push(new Boundary(width + 2, height / 2, 1, height)); // right border

  // Buckets
  for(let i = 0; i < hashActLength + 1; i++) {
    let w, h, x, y;
    const label = hash.charAt(i + 1);

    w = 4;
    h = 50;
    x = i * space + (w / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, label)); // left splitter

    w = space;
    h = 4;
    x = i * space + (space / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, label)); // ground

    w = 4;
    h = 50;
    x = i * space + space - (w / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, label)); // right splitter
  }
}

function draw() {
  background(41);

  // Run the matterjs simulation
  Engine.update(engine);

  // Display all pins
  for(let i = 0; i < pins.length; i++) {
    pins[i].show();
  }

  // Display all particles
  for(let i = 0; i < balls.length; i++) {
    balls[i].show();
  }

  // Display all boundaries
  for(let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
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

function mouseClicked() {
  // generate balls :^)
  const label = hash.charAt(0); // get the first letter of hash
  const b = new Ball(mouseX, 4, label);
  balls.push(b);
}
