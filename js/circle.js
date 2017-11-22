class Circle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = ballSize // global var for scaling
    this._color = color(255)
  }

  show() {
    fill(this._color)
    stroke(this._color)

    const pos = this.body.position // from matterjs position
    push() // push and pop to avoid getting the ball way off screen because of translate
    translate(pos.x, pos.y)
    ellipse(0, 0, this.r * 2)
    pop()
  }
}
