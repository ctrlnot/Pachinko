class Pin extends Particle {
  constructor(x, y, label = "") {
    super(x, y, label)
    this.r = 4

    const options = {
      isStatic: true,
      restitution: 1,
      friction: 0
    }
    this.body = Bodies.circle(this.x, this.y, this.r, options)
    World.add(world, this.body) // add this object to the world of matterjs
  }

  getColor() {
    return this.label ? color(colors[this.label]) : color(93);
  }
}