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
  }
  moveUp() {
    if (
      this.position.y - 1 >= 0 &&
      !cellsList[cellIndex(this.position.x, this.position.y)].walls[0]
    ) {
      updateAgentPosition(
        this.position.x.toString(),
        (this.position.y - 1).toString()
      );
    } else {
      console.log("Non posso andare su.");
    }
  }
  moveDown() {
    if (
      this.position.y + 1 < rows &&
      !cellsList[cellIndex(this.position.x, this.position.y)].walls[2]
    ) {
      updateAgentPosition(
        this.position.x.toString(),
        (this.position.y + 1).toString()
      );
    } else {
      console.log("Non posso andare giù.");
    }
  }

  moveRight() {
    if (
      this.position.x + 1 < cols &&
      !cellsList[cellIndex(this.position.x, this.position.y)].walls[1]
    ) {
      updateAgentPosition(
        (this.position.x + 1).toString(),
        this.position.y.toString()
      );
    } else {
      console.log("Non posso andare a destra.");
    }
  }

  moveLeft() {
    if (
      this.position.x - 1 >= 0 &&
      !cellsList[cellIndex(this.position.x, this.position.y)].walls[3]
    ) {
      updateAgentPosition(
        (this.position.x - 1).toString(),
        this.position.y.toString()
      );
    } else {
      console.log("Non posso andare a destra.");
    }
  }
  /**
   * Movimento verso le coordinate scelte o
   * in una location scelta.
   */
  motion(x, y, location) {
    if (arguments.length == 2) {
      // verso un punto
      cellPath = astarAlg(
        cellsList[cellIndex(this.position.x, this.position.y)],
        cellsList[cellIndex(x, y)]
      );
      console.log(cellPath);
    } else if (arguments.length == 1) {
      //verso una location
    }
  }

  moveTo(x, y) {
    updateAgentPosition(x.toString(), y.toString());
  }
}
