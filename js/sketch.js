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
  space = width / 11;
  boundaries.push(new Boundary(-2, height / 2, 1, height)); // left border
  boundaries.push(new Boundary(width + 2, height / 2, 1, height)); // right border

  for(let i = 0; i < 12; i++) {
    let w, h, x, y;
    let col = color(returnColor(i));

    w = 4;
    h = 50;
    x = i * space + (w / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, col)); // left splitter

    w = space;
    h = 4;
    x = i * space + (space / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, col)); // ground

    w = 4;
    h = 50;
    x = i * space + space - (w / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, col)); // right splitter
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

function returnColor(index) {
    // set colors
    const colors = ['#D93033',     // color(217, 48, 51) red
                    '#ED3655',     // color(237, 54, 85) light red
                    '#F9220B',     // color(249, 34, 11) orange
                    '#F19736',     // color(241, 151, 54) light orange
                    '#8A35F2',     // color(138, 53, 242) violet
                    '#FF0080',     // color(255, 0, 128) pink
                    '#3571ED',     // color(53, 113, 237) blue
                    '#32E4F2',     // color(50, 228, 242) light blue
                    '#F5DF0F',     // color(245, 223, 15) yellow
                    '#985A28',     // color(152, 90, 40) brown
                    '#52C127',     // color(82, 193, 39) green
                    '#7BFB0A'];    // color(123, 251, 10) light green

    return colors[index];
}

function mouseClicked() {
  // generate balls :^)
  const b = new Ball(mouseX, 4, 8);
  balls.push(b);
}
