class Boundary {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this._color = color(255);

    const options = {
      isStatic: true
    }
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options)
    World.add(world, this.body) // add this object to the world of matterjs
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
