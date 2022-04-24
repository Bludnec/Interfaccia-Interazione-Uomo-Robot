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
    if (
      this.j - 1 >= 0 &&
      !cellsList[cellIndex(this.i, this.j)].walls[0] &&
      findElement(this.i, this.j - 1) == null
    ) {
      this.j -= 1;
      this.y = this.j * w;
    } else {
      console.log("Non posso andare su.");
    }
  }
  moveDown() {
    if (
      this.j + 1 < rows &&
      !cellsList[cellIndex(this.i, this.j)].walls[2] &&
      findElement(this.i, this.j + 1) == null
    ) {
      this.j += 1;
      this.y = this.j * w;
    } else {
      console.log("Non posso andare giù.");
    }
  }

  moveRight() {
    if (
      this.i + 1 < cols &&
      !cellsList[cellIndex(this.i, this.j)].walls[1] &&
      findElement(this.i + 1, this.j) == null
    ) {
      this.i += 1;
      this.x = this.i * w;
    } else {
      console.log("Non posso andare a destra.");
    }
  }

  moveLeft() {
    if (
      this.i - 1 >= 0 &&
      !cellsList[cellIndex(this.i, this.j)].walls[3] &&
      findElement(this.i - 1, this.j) == null
    ) {
      this.i -= 1;
      this.x = this.i * w;
    } else {
      console.log("Non posso andare a destra.");
    }
  }
}
