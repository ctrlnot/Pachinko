class Ball extends Particle {
  constructor(x, y) {
    super(x, y)

    const options = {
      restitution: 0.5,
      friction: 0
    }
    this.body = Bodies.circle(this.x, this.y, this.r, options)
    World.add(world, this.body) // add this object to the world of matterjs
  }
}