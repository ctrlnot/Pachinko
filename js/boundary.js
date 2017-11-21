class Boundary {
  constructor(x, y, w, h, label = "") {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.label = label
    this._color = this.getColor();

    const options = {
      isStatic: true
    }
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options)
    // only add label to bottom bucket (the 4 is from setup where I created bot bucket height)
    if(this.h === 4) {
      this.body.label = `${this.label}-Bucket`
    }
    World.add(world, this.body) // add this object to the world of matterjs
  }

  getColor() {
    return this.label ? color(colors[this.label]) : color(255);
  }

  show() {
    fill(this._color)
    stroke(this._color)

    let pos = this.body.position // from matterjs position
    push() // push and pop to avoid getting the ball way off screen because of translate
    translate(pos.x, pos.y)
    rectMode(CENTER)
    rect(0, 0, this.w, this.h)
    pop()
  }
}