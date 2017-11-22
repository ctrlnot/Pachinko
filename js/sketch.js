function setup() {
  const myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('content');

  // initialize matterjs world
  engine = Engine.create();
  world = engine.world;

  // set gravity
  world.gravity.y = 1.5;

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
  boundaries.push(new Boundary(width / 2, height + 1, width, 1)); // bottom border

  // // Add buckets
  // const hashActLength = 60 - 1;
  // const bucketSpace = width / hashActLength;
  // for(let i = 0; i < hashActLength + 1; i++) {
  //   let w, h, x, y;

  //   w = 4;
  //   h = 50;
  //   x = i * bucketSpace + (w / 2);
  //   y = height - (h / 2);
  //   boundaries.push(new Boundary(x, y, w, h)); // left bucket border

  //   w = bucketSpace;
  //   h = 4;
  //   x = i * bucketSpace + (bucketSpace / 2);
  //   y = height - (h / 2);
  //   boundaries.push(new Boundary(x, y, w, h)); // bottom bucket border

  //   w = 4;
  //   h = 50;
  //   x = i * bucketSpace + bucketSpace - (w / 2);
  //   y = height - (h / 2);
  //   boundaries.push(new Boundary(x, y, w, h)); // right bucket border
  // }
}

function draw() {
  background(41);

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
}
