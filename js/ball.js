class Ball extends Particle {
  constructor(x, y, label = "") {
    super(x, y, label)
    this.r = 8

    const options = {
      restitution: 0.5,
      friction: 0
    }
    this.body = Bodies.circle(this.x, this.y, this.r, options)
    this.body.label = "ball"
    World.add(world, this.body) // add this object to the world of matterjs
  }
}
