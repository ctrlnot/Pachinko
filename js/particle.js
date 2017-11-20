class Particle {
  constructor(x, y, label) {
    this.x = x
    this.y = y
    this.r = 10
    this.label = label
    this._color = this.getColor()
  }

  getColor() {
    return this.label ? color(colors[this.label]) : color(255)
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