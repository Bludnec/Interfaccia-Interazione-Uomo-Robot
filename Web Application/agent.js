class Agent {
  constructor(id, i, j) {
    this.id = id;
    this.name = "robot";
    this.i = i;
    this.j = j;

    /* Calcolo le vere coordinate dell'oggetto */
    this.x = i * w;
    this.y = j * w;
  }

  show(img) {
    image(img, this.x, this.y, w, w);
  }
  moveUp() {
    if (this.j - 1 >= 0) {
      this.j -= 1;
      this.y = this.j * w;
    } else {
      console.log("Non posso andare su.");
    }
  }
  moveDown() {
    if (this.j + 1 < rows) {
      this.j += 1;
      this.y = this.j * w;
    } else {
      console.log("Non posso andare giù.");
    }
  }

  moveRight() {
    if (this.i + 1 < cols) {
      this.i += 1;
      this.x = this.i * w;
    } else {
      console.log("Non posso andare a destra.");
    }
  }

  moveLeft() {
    if (this.i - 1 >= 0) {
      this.i -= 1;
      this.x = this.i * w;
    } else {
      console.log("Non posso andare a destra.");
    }
  }
}
