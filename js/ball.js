class Ball extends Circle {
  constructor(x, y) {
    super(x, y)
    this._color = color(0, 255, 0)

    const options = {
      restitution: 0.5,
      friction: 0
    }
    this.body = Bodies.circle(this.x, this.y, this.r, options)
    this.body.label = "ball"
    World.add(world, this.body) // add this object to the world of matterjs
  }

  getSize() {
    return this.r
  }
}
