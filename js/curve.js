class Curve {
  constructor(p1, p2, p3, p4) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.p4 = p4
    this.verts = [p1, p2, p3, p4]
    this._color = color(255)

    const options = {
      isStatic: true
    }
    this.vertices = Matter.Vertices.create(this.verts)
    this.body = Bodies.fromVertices(150, height / 2 + 150, this.vertices, options)
    World.add(world, this.body) // add this object to the world of matterjs
  }

  show() {
    noFill();
    stroke(this._color);
    curve(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y, this.p4.x, this.p4.y)
  }
}