function setup() {
  const myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('content');
}

function draw() {
  background(51);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
