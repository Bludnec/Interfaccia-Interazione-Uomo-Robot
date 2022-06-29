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
   *
   * @param {dict} info Dizionario dove può essere presente Goal, X, Y.
   */
  motion(info) {
    if (info["Goal"] != undefined) {
      var nearestCell = findNearestCellToLocation(info["Goal"]);
      if (!(nearestCell == -1)) {
        cellPath = astarAlg(
          cellsList[cellIndex(this.position.x, this.position.y)],
          nearestCell
        );
      } else {
        console.log("Non posso arrivare in quella zona.");
      }
    }

    if (info["X"] != undefined && info["Y"] != undefined) {
      cellPath = astarAlg(
        cellsList[cellIndex(this.position.x, this.position.y)],
        cellsList[cellIndex(info["X"], info["Y"])]
      );
    }
  }

  /**
   * @param {dict} info Dizionario che può contenere Source (zone) e Theme(entity)
   */
  taking(info) {
    if (info["Source"] != undefined) {
      // Abbiamo informazioni della zona e dell'entità.
    } else {
      // Abbiamo solo informazioni sull'entità da prendere.
      var entSel;
      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id == info["Theme"]) {
          entSel = itemsList[i];
        }
      }
    }
  }

  moveTo(x, y) {
    updateAgentPosition(x.toString(), y.toString());
  }
}

function findNearestCellToEntity(entity) {
  var tempCell = -1;
  var cellCounter = 1000000;
  var path = astarAlg(
    cellsList[cellIndex(agent.position.x, agent.position.y)],
    cellsList[cellIndex(entity.position.x - 1, entity.position.y)]
  );
  if (path != -1) {
    cellCounter = path.length;
    tempCell = cellsList[cellIndex(entity.position.x - 1, entity.position.y)];
  }
  path = astarAlg(
    cellsList[cellIndex(agent.position.x, agent.position.y)],
    cellsList[cellIndex(entity.position.x + 1, entity.position.y)]
  );
  if (path != -1 && path.length < cellCounter) {
    cellCounter = path.length;
    tempCell = cellsList[cellIndex(entity.position.x + 1, entity.position.y)];
  }
  path = astarAlg(
    cellsList[cellIndex(agent.position.x, agent.position.y)],
    cellsList[cellIndex(entity.position.x, entity.position.y - 1)]
  );
  if (path != -1 && path.length < cellCounter) {
    cellCounter = path.length;
    tempCell = cellsList[cellIndex(entity.position.x, entity.position.y - 1)];
  }
  path = astarAlg(
    cellsList[cellIndex(agent.position.x, agent.position.y)],
    cellsList[cellIndex(entity.position.x, entity.position.y + 1)]
  );
  if (path != -1 && path.length < cellCounter) {
    cellCounter = path.length;
    tempCell = cellsList[cellIndex(entity.position.x, entity.position.y + 1)];
  }

  return tempCell;
}

function findNearestCellToLocation(location) {
  var cellCounter = 100000000;
  var tempCell = -1;
  for (var i = 0; i < cellsList.length; i++) {
    if (cellsList[i].zone == location) {
      var path = astarAlg(
        cellsList[cellIndex(agent.position.x, agent.position.y)],
        cellsList[i]
      );
      if (path.length < cellCounter) {
        cellCounter = path.length;
        tempCell = cellsList[i];
      }
    }
  }
  return tempCell;
}
