const Engine = Matter.Engine,
      World  = Matter.World,
      Events = Matter.Events,
      Bodies = Matter.Bodies;

let engine,
    world,
    balls = [],
    pins = [],
    boundaries = [],
    banner;

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

let ended = false;
let pause = false;

function setup() {
  createCanvas(480, 640);

  // check if the hash is valid
  if(hash.length < 1) {
    gameMachineBroke();
  }
  for(let i = 1; i < hash.length; i++) {
    const char = hash.charAt(i); // avoid the first one :^)
    const allKeys = Object.keys(colors); // get all keys in colors object

    if(allKeys.indexOf(char) === -1) gameMachineBroke(); // if not found BROKE!
  }

  // initialize matterjs world
  engine = Engine.create();
  world = engine.world;

  // set gravity
  world.gravity.y = 1.5;

  // collision event after world setup
  let settled = false; // to avoid multiple collision on one bucket
  Events.on(engine, 'collisionEnd', (e) => {
    const pairs = e.pairs;
    for(let i = 0; i < pairs.length; i++) {
      const labelA = pairs[i].bodyA.label;
      const labelB = pairs[i].bodyB.label;

      for(col in colors) {
        const bucketName = `${col}-Bucket`;
        if((labelA === "ball" && labelB === bucketName) || (labelA === bucketName && labelB === "ball")) {
          // add end banner
          if(!settled) {
              banner = new Banner(col, colors[col]);
              settled = true;
              ended = true;
          }
        }
      }
    }
  });

  // create pins
  const cols = 12;
  const rows = 12;
  const pinSpace = width / cols;
  for(let j = 0; j < cols; j++) {
    for(let i = 0; i < rows + 1; i++) {
      let x = i * pinSpace;
      if(j % 2 === 0) {
        x += pinSpace / 2;
      }
      let y = 120 + j * pinSpace;
      pins.push(new Pin(x, y));
    }
  }

  // Add border boundaries
  boundaries.push(new Boundary(-2, height / 2, 1, height)); // left border
  boundaries.push(new Boundary(width + 2, height / 2, 1, height)); // right border

  // Add buckets
  const hashActLength = hash.length - 1;
  const bucketSpace = width / hashActLength;
  for(let i = 0; i < hashActLength + 1; i++) {
    let w, h, x, y;
    const label = hash.charAt(i + 1);

    w = 4;
    h = 50;
    x = i * bucketSpace + (w / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, label)); // left bucket border

    w = bucketSpace;
    h = 4;
    x = i * bucketSpace + (bucketSpace / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, label)); // bottom bucket border

    w = 4;
    h = 50;
    x = i * bucketSpace + bucketSpace - (w / 2);
    y = height - (h / 2);
    boundaries.push(new Boundary(x, y, w, h, label)); // right bucket border
  }
}

function draw() {
  background(41);

  // Starting message or someting
  fill(255);
  noStroke();
  const fontSize = 20;
  textFont("Verdana", fontSize);
  textAlign(CENTER);
  text(`Click anywhere to start!`, width / 2, 40);

  // Run the matterjs simulation
  Engine.update(engine);

  // Display all pins
  for(let i = 0; i < pins.length; i++) {
    pins[i].show();
  }

  // Display all balls
  for(let i = 0; i < balls.length; i++) {
    balls[i].show();
  }

  // Display all boundaries
  for(let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }

  // Display result when pachinko is ended
  if(ended) {
    banner.addWidth();
    banner.show();
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
  if(!ended && balls.length < 1) {
    const label = hash.charAt(0); // get the first letter of hash
    if(mouseX > 0 && mouseX < width) { // to make sure ball isn't off canvas
      const b = new Ball(mouseX, 4, label);
      balls.push(b);
    }
  }
}

function gameMachineBroke() {
  alert("Pachinko machine broke! Do not mess with the url ffs -_- or contact the one who gave you this link!");
  noLoop();
}
