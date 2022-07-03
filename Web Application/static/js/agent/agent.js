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

  // FRAME
  /**
   * @param {dict} info Il robot si muove verso un GOAL.
   */
  arriving(info) {
    if (info["GOAL"] != undefined) {
      var nearestCell = findNearestCellToLocation(info["GOAL"]);
      if (!(nearestCell == -1)) {
        cellPath = astarAlg(
          cellsList[cellIndex(this.position.x, this.position.y)],
          nearestCell
        );
      } else {
        console.log("Non posso arrivare in quella zona.");
      }
    }
  }

  attaching(info) {}
  /**
   * @param {info} info Dizionario dove può essere presente GOAL (endpoint), PATH,
   * SOURCE (start) e THEME.
   */
  bringing(info) {
    /**
     * se c'è motion ci spostiamo in quella zona e poi facciamo
     * taking (source theme) e releasing(loc = goal, theme)
     */
    if (info["PATH"] != undefined) {
      // MOTION
      var entityZoneToRelease;
      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id == info["PATH"]) {
          entityZoneToRelease = itemsList[i];
          break;
        }
      }
      if (entityZoneToRelease != undefined) {
        // L'agente arrivare vicino ad un'entità.
        var cellaVicinoEntità = findNearestCellToEntity(entityZoneToRelease);
        cellPath = astarAlg(
          cellsList[cellIndex(this.position.x, this.position.y)],
          cellaVicinoEntità
        );
      } else {
        var nearestCell = findNearestCellToLocation(info["PATH"]);
        if (!(nearestCell == -1)) {
          cellPath = astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            nearestCell
          );
        }
      }
    }
    // TAKING
    var entSel;
    for (var i = 0; i < itemsList.length; i++) {
      if (itemsList[i].id == info["THEME"]) {
        entSel = itemsList[i];
      }
    }
    var nearCell = findNearestCellToEntity(entSel);
    var path = astarAlg(
      cellsList[cellIndex(this.position.x, this.position.y)],
      nearCell
    );
    for (var i = 0; i < path.length; i++) {
      cellPath.push(path[i]);
    }
    // MANIPULATION
    var newInfo = {
      THEME: info["THEME"],
    };
    cellPath.push(["MANIPULATION", newInfo]);

    newInfo = {
      LOCATION_OF_CONFINEMENT: info["GOAL"],
      THEME: info["THEME"],
    };
    cellPath.push(["RELEASING", newInfo]);
  }

  change_direction(info) {}

  change_operational_state(info) {}

  closure(info) {}

  /**
   * @param {*} info  Dizionario che può contenere THEME (entità)
   */
  manipulation(info) {
    if (info["THEME"] != undefined) {
      if (entityTakenByAgent == undefined) {
        var entity;
        for (var i = 0; i < itemsList.length; i++) {
          if (itemsList[i].id == info["THEME"]) {
            entity = itemsList[i];
          }
        }
        if (
          (cellsList[cellIndex(entity.position.x, entity.position.y)]
            .walls[0] == "false" &&
            this.position.x == entity.position.x &&
            this.position.y == entity.position.y - 1) ||
          (cellsList[cellIndex(entity.position.x, entity.position.y)]
            .walls[1] == "false" &&
            this.position.x == entity.position.x + 1 &&
            this.position.y == entity.position.y) ||
          (cellsList[cellIndex(entity.position.x, entity.position.y)]
            .walls[2] == "false" &&
            this.position.x == entity.position.x &&
            this.position.y == entity.position.y + 1) ||
          (cellsList[cellIndex(entity.position.x, entity.position.y)]
            .walls[3] == "false" &&
            this.position.x == entity.position.x - 1 &&
            this.position.y == entity.position.y)
        ) {
          // TO DO: cambiare posizione dell'entità presa in -1
          updateEntityPosition(entity.id, -1, -1, 0);
          setTimeout(function () {
            entityTakenByAgent = entity;
            getAllEntity();
          }, 200);
        }
      }
    }
    console.log("Manip: ", entityTakenByAgent);
  }

  /**
   * DA CAMBIARE
   * @param {dict} info Dizionario dove può essere presente GOAL, PATH E THEME(?)
   */
  motion(info) {
    if (info["GOAL"] != undefined) {
      if (info["PATH"] != undefined) {
        // se path è una zona
        var nearestCell = findNearestCellToLocation(info["PATH"]);
        if (!(nearestCell == -1)) {
          var path = astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            nearestCell
          );
          for (var i = 0; i < path.length; i++) {
            cellPath.push(path[i]);
          }
          if (path.length > 1) {
            this.position.x = path[path.length - 1].x;
            this.position.y = path[path.length - 1].y;
          }
        }
        // se path è un oggetto
        var entityZoneToRelease;
        for (var i = 0; i < itemsList.length; i++) {
          if ((itemsList[i].id = info["PATH"])) {
            entityZoneToRelease = itemsList[i];
          }
        }
        if (entityZoneToRelease != undefined) {
          // L'agente deve spostarsi vicino ad un'entità.
          var cellaVicinoEntità = findNearestCellToEntity(entityZoneToRelease);
          var path = astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            cellaVicinoEntità
          );
          for (var i = 0; i < path.length; i++) {
            cellPath.push(path[i]);
          }
          if (path.length > 1) {
            this.position.x = path[path.length - 1].x;
            this.position.y = path[path.length - 1].y;
          }
        }
      }
      var nearestCell = findNearestCellToLocation(info["GOAL"]);
      if (!(nearestCell == -1)) {
        var path = astarAlg(
          cellsList[cellIndex(this.position.x, this.position.y)],
          nearestCell
        );
        for (var i = 0; i < path.length; i++) {
          cellPath.push(path[i]);
        }
      }
      var entityZoneToRelease;
      for (var i = 0; i < itemsList.length; i++) {
        if ((itemsList[i].id = info["GOAL"])) {
          entityZoneToRelease = itemsList[i];
          break;
        }
      }
      if (entityZoneToRelease != undefined) {
        // L'agente arrivare vicino ad un'entità.
        var cellaVicinoEntità = findNearestCellToEntity(entityZoneToRelease);
        var path = astarAlg(
          cellsList[cellIndex(this.position.x, this.position.y)],
          cellaVicinoEntità
        );
        for (var i = 0; i < path.length; i++) {
          cellPath.push(path[i]);
        }
      }
    }
  }

  /**
   * @param {dict} info Dizionario che può contenere THEME e LOCATION_OF_CONFINEMENT
   */
  releasing(info) {
    console.log("Releas: ", entityTakenByAgent);
    if (entityTakenByAgent != undefined) {
      if (entityTakenByAgent.id == info["THEME"]) {
        if (info["LOCATION_OF_CONFINEMENT"] != undefined) {
          // L'agente sa dove deve lasciare l'entità che ha in mano.
          var entityZoneToRelease;
          for (var i = 0; i < itemsList.length; i++) {
            if (itemsList[i].id == info["LOCATION_OF_CONFINEMENT"]) {
              entityZoneToRelease = itemsList[i];
            }
          }
          if (entityZoneToRelease != undefined) {
            // L'agente deve portarlo vicino ad un'entità.
            var cellaVicinoEntità =
              findNearestCellToEntity(entityZoneToRelease);
            var path = astarAlg(
              cellsList[cellIndex(this.position.x, this.position.y)],
              cellaVicinoEntità
            );
            if (path.length == 1) {
              updateEntityPosition(
                entityTakenByAgent.id,
                path[0].x,
                path[0].y,
                0
              );
            } else {
              path.pop();
              for (var i = 0; i < path.length; i++) {
                cellPath.push(path[i]);
              }
              cellPath.push(["RELEASING", info]);
            }
          } else {
            // L'agente deve portarlo in una zona.
            var nearestCell = findNearestCellToLocation(
              info["LOCATION_OF_CONFINEMENT"]
            );
            var path;
            if (!(nearestCell == -1)) {
              path = astarAlg(
                cellsList[cellIndex(this.position.x, this.position.y)],
                nearestCell
              );
            }
            if (path.length == 1) {
              updateEntityPosition(
                entityTakenByAgent.id,
                path[0].x,
                path[0].y,
                0
              );
              setTimeout(function () {
                entityTakenByAgent = undefined;
                getAllEntity();
              }, 200);
            } else {
              path.pop();
              for (var i = 0; i < path.length; i++) {
                cellPath.push(path[i]);
              }
              cellPath.push(["RELEASING", info]);
            }
          }
        } else {
          // L'agente non ha una location dove lasciare l'entità.
          // TO DO: LASCIARE L'OGGETTO IN UNA CELLA ADIACENTE POSSIBILE.
        }
      } else {
        console.log("Non ho quell'entità in mano.");
      }
    } else {
      console.log("Non ho niente in mano.");
    }
  }

  /**
   * @param {dict} info Dizionario che può contenere Source (zone) e THEME (entity)
   * SOURCE poco utile perché se sappiamo l'id del THEME allora sappiamo già dov'è.
   */
  taking(info) {
    console.log("Tak: ", entityTakenByAgent);

    /*if (info["SOURCE"] != undefined) {
      // Abbiamo informazioni della zona e dell'entità.
    }*/
    // Abbiamo solo informazioni sull'entità da prendere.
    // TO DO: check se possiamo muovere l'oggetto.
    var entSel;
    for (var i = 0; i < itemsList.length; i++) {
      if (itemsList[i].id == info["THEME"]) {
        entSel = itemsList[i];
      }
    }
    var nearCell = findNearestCellToEntity(entSel);
    var path = astarAlg(
      cellsList[cellIndex(this.position.x, this.position.y)],
      nearCell
    );
    for (var i = 0; i < path.length; i++) {
      cellPath.push(path[i]);
    }
    cellPath.push(["MANIPULATION", info]);
  }

  moveTo(x, y) {
    updateAgentPosition(x.toString(), y.toString());
    setTimeout(function () {
      getAgent();
    }, 100);
  }
}

/**
 * @param {Entity} entity
 * @returns la Cell più vicina all'entità.
 */
function findNearestCellToEntity(entity) {
  var tempCell = -1;
  var cellCounter = 1000000;
  var listNearCell = [];
  var cellOfEntity = cellsList[cellIndex(entity.position.x, entity.position.y)];

  if (entity.sizeX == 1 && entity.sizeY == 1) {
    if (cellOfEntity.walls[0] == "false") {
      listNearCell.push(
        cellsList[cellIndex(entity.position.x, entity.position.y - 1)]
      );
    }
    if (cellOfEntity.walls[1] == "false") {
      listNearCell.push(
        cellsList[cellIndex(entity.position.x + 1, entity.position.y)]
      );
    }
    if (cellOfEntity.walls[2] == "false") {
      listNearCell.push(
        cellsList[cellIndex(entity.position.x, entity.position.y + 1)]
      );
    }
    if (cellOfEntity.walls[3] == "false") {
      listNearCell.push(
        cellsList[cellIndex(entity.position.x - 1, entity.position.y)]
      );
    }
  }
  if (entity.sizeX > 1) {
    if (cellOfEntity.walls[3] == "false") {
      listNearCell.push(
        cellsList[cellIndex(entity.position.x - 1, entity.position.y)]
      );
    }
    for (var i = 0; i < entity.sizeX; i++) {
      //prende quello sopra alla cella a dx
      if (
        cellsList[cellIndex(entity.position.x + i, entity.position.y)]
          .walls[0] == "false"
      ) {
        listNearCell.push(
          cellsList[cellIndex(entity.position.x + i, entity.position.y - 1)]
        );
      }
      //prende sotto sopra alla cella a dx
      if (
        cellsList[cellIndex(entity.position.x + i, entity.position.y)]
          .walls[2] == "false"
      ) {
        listNearCell.push(
          cellsList[cellIndex(entity.position.x + i, entity.position.y + 1)]
        );
      }
    }
    if (
      cellsList[
        cellIndex(entity.position.x + entity.sizeX - 1, entity.position.y)
      ].walls[1] == "false"
    ) {
      listNearCell.push(
        cellsList[
          cellIndex(entity.position.x + entity.sizeX, entity.position.y)
        ]
      );
    }
  }
  if (entity.sizeY > 1) {
    if (cellOfEntity.walls[0] == "false") {
      listNearCell.push(
        cellsList[cellIndex(entity.position.x, entity.position.y - 1)]
      );
    }
    for (var i = 0; i < entity.sizeY; i++) {
      //prende quello dx alla cella sotto
      if (
        cellsList[cellIndex(entity.position.x, entity.position.y + i)]
          .walls[1] == "false"
      ) {
        listNearCell.push(
          cellsList[cellIndex(entity.position.x + 1, entity.position.y + i)]
        );
      }
      //prende sotto sx alla cella sotto
      if (
        cellsList[cellIndex(entity.position.x, entity.position.y + i)]
          .walls[3] == "false"
      ) {
        listNearCell.push(
          cellsList[cellIndex(entity.position.x - 1, entity.position.y + i)]
        );
      }
    }
    if (
      cellsList[
        cellIndex(entity.position.x, entity.position.y + entity.sizeY - 1)
      ].walls[2] == "false"
    ) {
      listNearCell.push(
        cellsList[
          cellIndex(entity.position.x, entity.position.y + entity.sizeY)
        ]
      );
    }
  }

  for (var i = 0; i < listNearCell.length; i++) {
    var path = astarAlg(
      cellsList[cellIndex(agent.position.x, agent.position.y)],
      listNearCell[i]
    );
    if (path != -1 && path.length < cellCounter) {
      tempCell = listNearCell[i];
      cellCounter = path.length;
    }
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
