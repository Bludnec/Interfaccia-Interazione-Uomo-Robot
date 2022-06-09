class Agent {
  constructor(id, position) {
    this.id = id;
    this.name = "robot";

    this.position = position;

    /* Calcolo le vere coordinate dell'oggetto */
    this.mapX = this.position.x * w;
    this.mapY = this.position.y * w;
  }

  show() {
    image(agentImage, this.mapX, this.mapY, w, w);
    console.log(agent);
  }
  moveUp() {
    if (
      this.position.y - 1 >= 0 &&
      !cellsList[cellIndex(this.position.x, this.position.y)].walls[0] &&
      possMoveOn(this.position.x, this.position.y - 1) == true
    ) {
      this.position.y -= 1;
      this.mapY = this.position.y * w;
    } else {
      console.log("Non posso andare su.");
    }
  }
  moveDown() {
    if (
      this.position.y + 1 < rows &&
      !cellsList[cellIndex(this.position.x, this.position.y)].walls[2] &&
      possMoveOn(this.position.x, this.position.y + 1) == true
    ) {
      this.position.y += 1;
      this.mapY = this.position.y * w;
    } else {
      console.log("Non posso andare giù.");
    }
  }

  moveRight() {
    if (
      this.position.x + 1 < cols &&
      !cellsList[cellIndex(this.position.x, this.position.y)].walls[1] &&
      possMoveOn(this.position.x + 1, this.position.y) == true
    ) {
      this.position.x += 1;
      this.mapX = this.position.x * w;
    } else {
      console.log("Non posso andare a destra.");
    }
  }

  moveLeft() {
    if (
      this.position.x - 1 >= 0 &&
      !cellsList[cellIndex(this.position.x, this.position.y)].walls[3] &&
      possMoveOn(this.position.x - 1, this.position.y) == true
    ) {
      this.position.x -= 1;
      this.mapX = this.position.x * w;
    } else {
      console.log("Non posso andare a destra.");
    }
  }
  moveTo(toCell) {
    this.position.x = toCell.i;
    this.position.y = toCell.j;
    this.mapX = this.position.x * w;
    this.mapY = this.position.y * w;
  }

  motion() {}
}
