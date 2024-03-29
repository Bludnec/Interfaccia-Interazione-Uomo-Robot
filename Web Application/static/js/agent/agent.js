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
   * @param {dict} info Il robot si muove verso un goal.
   */
  arriving(info) {
    if (info["goal"] != undefined) {
      var nearestCell = findNearestCellToLocation(info["goal"]);
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
        if ((itemsList[i].id = info["goal"])) {
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
   * @param {Dict} info Il robot porta un oggetto (theme) ad una destinazione (goal), facendo un determirnato percorso (path) e
   * partendo da un determinato punto (SOURCE)
   */
  bringing(info) {
    console.log(info);
    if (info["path"] != undefined) {
      // MOTION
      var entityZoneToRelease;
      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id == info["path"]) {
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
        for (var o = 0; o < path.length; o++) {
          cellPath.push(path[o]);
        }
      } else {
        var nearestCell = findNearestCellToLocation(info["path"]);
        if (!(nearestCell == -1)) {
          var path = astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            nearestCell
          );
          for (var o = 0; o < path.length; o++) {
            cellPath.push(path[o]);
          }
        }
      }
    }
    // TAKING
    var entSel;
    for (var i = 0; i < itemsList.length; i++) {
      console.log(itemsList[i].id, info["theme"]);
      if (itemsList[i].id == info["theme"]) {
        entSel = itemsList[i];
      }
    }
    console.log(entSel);
    if (entSel != undefined) {
      var nearCell = findNearestCellToEntity(entSel);
      var path = astarAlg(
        cellsList[cellIndex(this.position.x, this.position.y)],
        nearCell
      );
      for (var i = 0; i < path.length; i++) {
        cellPath.push(path[i]);
      }
      // manipulation
      var newInfo2 = {
        entity: info["theme"],
      };
      cellPath.push(["manipulation", newInfo2]);

      var newInfo3 = {
        goal: info["goal"],
        theme: info["theme"],
      };
      cellPath.push(["releasing", newInfo3]);
    } else {
      alert("Non ho trovato l'oggetto da afferrare.");
    }
  }

  /**
   * @param {Dict} info Il robot va verso una direzione (DIRECTION).
   */
  change_direction(info) {
    if (info["direction"] != undefined) {
      var movement = info["direction"];
      if (movement == "left") {
        cellPath.push(
          astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            cellsList[cellIndex(this.position.x - 1, this.position.y)]
          )[0]
        );
        console.log(cellPath[0]);
      }
      if (movement == "right") {
        cellPath.push(
          astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            cellsList[cellIndex(this.position.x + 1, this.position.y)]
          )[0]
        );
        console.log(cellPath[0]);
      }
      if (movement == "ahead") {
        cellPath.push(
          astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            cellsList[cellIndex(this.position.x, this.position.y - 1)]
          )[0]
        );
        console.log(cellPath[0]);
      }
      if (movement == "back") {
        cellPath.push(
          astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            cellsList[cellIndex(this.position.x, this.position.y + 1)]
          )[0]
        );
        console.log(cellPath[0]);
      }
    }
  }

  /**
   * @param {Dict} info Il robot cambia lo stato di un oggetto (device).
   */
  change_operational_state(info) {
    for (var i = 0; i < powerStatusList.length; i++) {
      if (info["device"] == powerStatusList[i].Id) {
        var entity;
        for (var j = 0; j < itemsList.length; j++) {
          if (itemsList[j].id == powerStatusList[i].Id) {
            entity = itemsList[j];
          }
        }
      }
    }

    if (entity != undefined) {
      if (info["operational_state"] != entity.status) {
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
          if (entity.status == "on") {
            updateEntityStatus(entity.id, "off");
          } else {
            updateEntityStatus(entity.id, "on");
          }
          setTimeout(function () {
            getEntityStatusOnMap();
          }, 400);
          setTimeout(function () {
            getAllEntity();
          }, 600);
        } else {
          var nearCell = findNearestCellToEntity(entity);
          var path = astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            nearCell
          );
          for (var o = 0; o < path.length; o++) {
            cellPath.push(path[o]);
          }
          cellPath.push(["change_operational_state", info]);
        }
      } else {
        alert("L'oggetto si trova già in quello stato.");
      }
    } else {
      alert(
        "Non posso eseguire l'azione perché non trovo l'oggetto richiesto."
      );
    }
  }

  /**
   * @param {Dict} info Il robot apre/chiude un'entità (CONTAINING_OBJECT).
   */
  closure(info) {
    for (var i = 0; i < physicalStatusList.length; i++) {
      if (
        info["containing_object"] == physicalStatusList[i].Id ||
        info["container_portal"] == physicalStatusList[i].Id
      ) {
        var entity;
        for (var j = 0; j < itemsList.length; j++) {
          if (itemsList[j].id == physicalStatusList[i].Id) {
            entity = itemsList[j];
          }
        }
        console.log(entity);
      }
    }
    if (entity != undefined) {
      if (info["operational_state"] != entity.status) {
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
          if (
            entity.status == "open" &&
            info["container_portal"] != undefined
          ) {
            updateEntityStatus(entity.id, "closed");
          } else if (
            entity.status == "closed" &&
            info["containing_object"] != undefined
          ) {
            updateEntityStatus(entity.id, "open");
          }
          setTimeout(function () {
            getEntityStatusOnMap();
          }, 400);
          setTimeout(function () {
            getAllEntity();
          }, 600);
        } else {
          var nearCell = findNearestCellToEntity(entity);
          var path = astarAlg(
            cellsList[cellIndex(this.position.x, this.position.y)],
            nearCell
          );
          for (var o = 0; o < path.length; o++) {
            cellPath.push(path[o]);
          }
          cellPath.push(["closure", info]);
        }
      } else {
        alert("L'entità si trova già in quello stato.");
      }
    } else {
      alert(
        "Non posso eseguire l'azione perché non trovo l'oggetto richiesto."
      );
    }
  }

  /**
   * @param {Dict} info  Un robot afferra un'entità (entity).
   */
  manipulation(info) {
    console.log(info);
    if (entityTakenByAgent == undefined) {
      var listaAbilita = [];
      for (var i = 0; i < abilityList.length; i++) {
        if (info["entity"] == abilityList[i][0]) {
          listaAbilita = abilityList[i];
        }
      }
      if (listaAbilita.includes("move_ability")) {
        if (info["entity"] != undefined) {
          var entity;
          for (var i = 0; i < itemsList.length; i++) {
            if (itemsList[i].id == info["entity"]) {
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
              this.position.y == entity.position.y) ||
            (this.position.x == entity.position.x &&
              this.position.y == entity.position.y)
          ) {
            updateEntityPosition(
              entity.id,
              agent.position.x,
              agent.position.y,
              0
            );
            entityTakenByAgent = entity;
            setTimeout(function () {
              deletePositioning(entity.id);
              getEntityPositioningOnMap();
            }, 200);

            setTimeout(function () {
              entityTakenByAgent = entity;
              document.getElementById("taken-class").innerHTML =
                entityTakenByAgent.entClass;
              document.getElementById("taken-id").innerHTML =
                entityTakenByAgent.id;
              document.getElementById("taken-coordinates").innerHTML =
                "X:" +
                entityTakenByAgent.position.x +
                " Y:" +
                entityTakenByAgent.position.y;
              document.getElementById(
                "taken-image"
              ).src = `static/images/${entityTakenByAgent.entClass}.png`;

              getAllEntity();
            }, 500);
          } else {
            var nearCell = findNearestCellToEntity(entity);
            var path = astarAlg(
              cellsList[cellIndex(this.position.x, this.position.y)],
              nearCell
            );
            for (var o = 0; o < path.length; o++) {
              cellPath.push(path[o]);
            }
            cellPath.push(["manipulation", info]);
          }
        }
      }
    } else {
      alert("Ho già un'entità in mano.");
    }
  }

  /**
   * @param {dict} info Il robot arriva in un determinato punto (goal), percorrendo un determinato percorso (path).
   */
  motion(info) {
    if (info["goal"] != undefined) {
      if (info["path"] != undefined) {
        // se path è una zona
        var nearestCell = findNearestCellToLocation(info["path"]);
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
        } else if (nearestCell == -1) {
          alert("Non posso fare quel percorso.");
        }
        // se path è un oggetto
        var entityZoneToRelease;
        for (var i = 0; i < itemsList.length; i++) {
          if (itemsList[i].id == info["path"]) {
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
      var nearestCell = findNearestCellToLocation(info["goal"]);
      if (!(nearestCell == -1)) {
        var path = astarAlg(
          cellsList[cellIndex(this.position.x, this.position.y)],
          nearestCell
        );
        for (var i = 0; i < path.length; i++) {
          cellPath.push(path[i]);
        }
      }
      var entityZoneToRelease = undefined;
      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id == info["goal"]) {
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
   * @param {dict} info Il robot rilascia l'entità che ha in mano (theme) in un determinato punto (goal).
   */
  releasing(info) {
    console.log("Releas: ", entityTakenByAgent);
    console.log(info);
    if (entityTakenByAgent != undefined) {
      if (entityTakenByAgent.id == info["theme"]) {
        if (info["goal"] != undefined) {
          // L'agente sa dove deve lasciare l'entità che ha in mano.
          var entityZoneToRelease;
          for (var i = 0; i < itemsList.length; i++) {
            if (itemsList[i].id == info["goal"]) {
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
              setTimeout(function () {
                document.getElementById("taken-class").innerHTML = "Class";
                document.getElementById("taken-id").innerHTML = "Id";
                document.getElementById("taken-coordinates").innerHTML =
                  "X:0 Y:0";
                document.getElementById("taken-image").src =
                  "static/images/empty.png";
                entityTakenByAgent = undefined;
                getAllEntity();
              }, 200);
            } else {
              path.pop();
              for (var i = 0; i < path.length; i++) {
                cellPath.push(path[i]);
              }
              cellPath.push(["releasing", info]);
            }
          } else {
            // L'agente deve portarlo in una zona.
            var nearestCell = findNearestCellToLocation(info["goal"]);
            var path;
            if (!(nearestCell == -1)) {
              path = astarAlg(
                cellsList[cellIndex(this.position.x, this.position.y)],
                nearestCell
              );
              if (path.length == 1) {
                updateEntityPosition(
                  entityTakenByAgent.id,
                  path[0].x,
                  path[0].y,
                  0
                );
                setTimeout(function () {
                  document.getElementById("taken-class").innerHTML = "Class";
                  document.getElementById("taken-id").innerHTML = "Id";
                  document.getElementById("taken-coordinates").innerHTML =
                    "X:0 Y:0";
                  document.getElementById("taken-image").src =
                    "static/images/empty.png";
                  entityTakenByAgent = undefined;
                  getAllEntity();
                }, 200);
              } else {
                path.pop();
                for (var i = 0; i < path.length; i++) {
                  cellPath.push(path[i]);
                }
                cellPath.push(["releasing", info]);
              }
            }
          }
        } else {
          /**
           * Il robot non ha una location dove lasciare l'entità
           * quindi la lascia vicino a se.
           */

          updateEntityPosition(
            entityTakenByAgent.id,
            agent.position.x,
            agent.position.y,
            0
          );

          setTimeout(function () {
            document.getElementById("taken-class").innerHTML = "Class";
            document.getElementById("taken-id").innerHTML = "Id";
            document.getElementById("taken-coordinates").innerHTML = "X:0 Y:0";
            document.getElementById("taken-image").src =
              "static/images/empty.png";
            entityTakenByAgent = undefined;
            getAllEntity();
          }, 200);
        }
      } else {
        alert("Non ho quell'entità in mano.");
      }
    } else {
      alert("Non ho niente in mano.");
    }
  }

  /**
   * @param {dict} info Il robot prende un'entità (theme).ì
   */
  taking(info) {
    var listaAbilita = [];
    for (var i = 0; i < abilityList.length; i++) {
      if (info["theme"] == abilityList[i][0]) {
        listaAbilita = abilityList[i];
      }
    }
    if (listaAbilita.includes("move_ability")) {
      var entSel;
      for (var i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id == info["theme"]) {
          entSel = itemsList[i];
        }
      }
      var nearCell = findNearestCellToEntity(entSel);
      console.log(
        this.position.x,
        entSel.position.x,
        this.position.y,
        entSel.position.y
      );
      if (
        !(
          this.position.x == entSel.position.x &&
          this.position.y == entSel.position.y
        )
      ) {
        var path = astarAlg(
          cellsList[cellIndex(this.position.x, this.position.y)],
          nearCell
        );
        for (var i = 0; i < path.length; i++) {
          cellPath.push(path[i]);
        }
      }
      var newInfo = {
        entity: info["theme"],
      };
      cellPath.push(["manipulation", newInfo]);
    } else {
      alert("Non posso afferrare l'entità.");
    }
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
  if (tempCell == -1) {
    alert("non posso arrivarci");
  }
  return tempCell;
}

/**
 * @param {String} location
 * @returns la Cell più vicina alla location.
 */
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
  if (tempCell == -1) {
    alert("non posso arrivarci");
  }
  return tempCell;
}
