class Banner {
  constructor(w) {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = height
  }

  addWidth() {
    this.w++
  }

  show() {
    fill(255)
    noStroke()
    rect(this.x, this.y, this.w, this.h)
  }

}