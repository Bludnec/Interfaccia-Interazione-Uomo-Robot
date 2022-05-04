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

  show() {
    image(agentImage, this.x, this.y, w, w);
  }
  moveUp() {
    if (
      this.j - 1 >= 0 &&
      !cellsList[cellIndex(this.i, this.j)].walls[0] &&
      possMoveOn(this.i, this.j - 1) == true
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
      possMoveOn(this.i, this.j + 1) == true
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
      possMoveOn(this.i + 1, this.j) == true
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
      possMoveOn(this.i - 1, this.j) == true
    ) {
      this.i -= 1;
      this.x = this.i * w;
    } else {
      console.log("Non posso andare a destra.");
    }
  }
  moveTo(toCell) {
    this.i = toCell.i;
    this.j = toCell.j;
    this.x = this.i * w;
    this.y = this.j * w;
  }

  motion(goal, direction, path, manner, area, distance, source) {
    /* Imposto la velocità del robot in base a manner */
    switch (manner) {
      case "quickly":
        frameRate = 10;
      case "slowly":
        frameRate = 0.5;
    }
    /**
     * Faccio partire la ricerca A* e il movimento del robot
     * per raggiungere il goal e se ha un path richiesto
     * chiamo A* e lo inserisco
     */
    if (goal != null) {
      var goalObject;
      for (var i = 0; i < itemsList.length; i++) {
        if ((itemsList[i].id = goal)) {
          goalObject = itemsList[i];
        }
      }
      if (path != null) {
        astarAlg(agent, goal, path);
      } else {
        astarAlg(agent, goal);
      }
    }
    /**
     * Faccio muovere il robot nella "direction" richiesta
     */
    if (direction != null) {
      this.move(direction);
    }
    /**
     * Faccio muovere il robot nell'"area" richiesta
     */
    if (area != null) {
      astar_search(this.i, this.j, area);
    }

    /* Reimposto il framerate se è stato modificato */
    frameRate = 10;
  }
}
