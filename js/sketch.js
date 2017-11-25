function setup() {
  const myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('content');

  // initialize matterjs world
  engine = Engine.create();
  world = engine.world;

  // set gravity
  world.gravity.y = 1.5;

  // create pins
  const pinSpace = 4.5 * ballSize;
  const cols = (height * 0.4) / pinSpace;
  const rows = width / pinSpace;
  const allowanceFromTop = 350; // static for now
  for(let j = 0; j < cols; j++) {
    for(let i = 0; i < rows; i++) {
      let x = i * pinSpace;
      if(j % 2 === 0) {
        x += pinSpace / 2;
      } 
      const y = allowanceFromTop + (j * pinSpace);
      pins.push(new Pin(x, y));
    }
  }

  // add border boundaries
  boundaries.push(new Boundary(-1, height / 2, 1, height)); // left border
  boundaries.push(new Boundary(width + 1, height / 2, 1, height)); // right border
  boundaries.push(new Boundary(width / 2, height, width, 1)); // bottom border

  // add buckets
  boundaries.push(new Boundary(width / 2, height - 2, 30, 4, '#f00')); // test bot
  boundaries.push(new Boundary(width / 2 - 15, height - 25, 4, 50, '#0f0')); // test left
  boundaries.push(new Boundary(width / 2 + 15, height - 25, 4, 50, '#0f0')); // test left

  // const hole = ballSize + 2; // 2px for allowance
  // const holeBorder = 3;
  // const totalHoleSize = hole + (holeBorder * 2); 
  // const noOfHoles = 


  // const hashActLength = 15;
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

  // Generate pins
  // const pinSpace = (ballSize + (ballSize / 2));
  // for(let i = 0; i < width; i++) {
  //   const x = i * pinSpace;
  //   const y = 50;
  //   pins.push(new Pin(x, y));
  // }

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
