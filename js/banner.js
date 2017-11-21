class Banner {
  constructor(bucket, col) {
    this.w = 0
    this.h = 80
    this.x = 0
    this.y = (height / 2) - (this.h / 2)
    this.bucket = bucket
    this._color = color(col)
  }

  addWidth() {
    this.w += 40
  }

  show() {
    fill(this._color)
    noStroke()
    rect(this.x, this.y, this.w, this.h)

    fill(255)
    const fontSize = 20
    textFont("Verdana", fontSize)
    textAlign(CENTER)
    text(`YOU GOT ${this.bucket.toUpperCase()}!`, width / 2, (height / 2) + (fontSize / 3))
  }
}
