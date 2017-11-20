class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 10
    this._color = color(0, 255, 0)
  }

  show() {
    fill(this._color)
    stroke(this._color)

    let pos = this.body.position // from matterjs position
    push() // push and pop to avoid getting the ball way off screen because of translate
    translate(pos.x, pos.y)
    ellipse(0, 0, this.r * 2)
    pop()
  }
}