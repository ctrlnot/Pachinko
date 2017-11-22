class Pin extends Circle {
  constructor(x, y) {
    super(x, y)
    this.r = 4
    this._color = color(93)

    const options = {
      isStatic: true,
      restitution: 1,
      friction: 0
    }
    this.body = Bodies.circle(this.x, this.y, this.r, options)
    this.body.label = "pin"
    World.add(world, this.body) // add this object to the world of matterjs
  }
}
