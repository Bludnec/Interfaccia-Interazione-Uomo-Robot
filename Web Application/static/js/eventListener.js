var idCounter = 0;

var checkWalls = document.getElementById("walls-checkbox");
var checkColor = document.getElementById("color-checkbox");
var checkMoveAgent = document.getElementById("move-agent");

document.getElementById("delete-entity-btn").addEventListener("click", () => {
  if (teomClass.innerHTML == "Agent") {
    agent = null;
    deleteAgent();
  } else {
    deleteEntity(teomId.innerHTML);
    // DELETE CELL OCCUPIED
  }
  document.getElementById("table-img-list").classList.remove("hidden");
  document.getElementById("table-entity-on-map").classList.add("hidden");
  getAllEntity();
});

var imgItemSelected = document
  .getElementById("til-image")
  .addEventListener("drag", imgDrag);

var boolMousePressed = false;
var indexItemPressed;

/* bool per capire se l'img draggata è quella giusta, ovvero quella nella info-box */
var boolImgItemSelected = false;
function imgDrag() {
  boolImgItemSelected = true;
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > cols * w || mouseY > rows * w) {
    return null;
  }
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  var thisCell = cellsList[cellIndex(x, y)];

  if (agent != null && checkMoveAgent.checked == true) {
    var start = cellsList[cellIndex(agent.position.x, agent.position.y)];
    var end = thisCell;
    cellPath = astarAlg(start, end);
  }

  if (thisCell != undefined && checkColor.checked == true) {
    /* Color the cell and assign the value "zone" to the cell. */
    colorCellMap(x, y);
  }
  /* Modifica dei muri */
  if (thisCell != undefined && checkWalls.checked == true) {
    editWalls(mouseX, mouseY);
  }

  var indexElement = getElementInPosition(x, y);

  if (cellsList[cellIndex(x, y)].occupied != null) {
    for (var i = 0; i < itemsList.length; i++) {
      if (itemsList[i].id == cellsList[cellIndex(x, y)].occupied) {
        indexElement = i;
      }
    }
  }

  // se viene cliccato un oggetto sulla mappa riporta le sue info nella info-box
  if (indexElement != null) {
    document.getElementById("table-img-list").classList.add("hidden");
    document.getElementById("table-entity-on-map").classList.remove("hidden");
    if (indexItemSelected != null) {
      deselectEntityImage();
    }

    // controllo se clicco un elemento o l'agente
    if (indexElement != -1) {
      teomCoordinates.innerHTML =
        "X:" +
        itemsList[indexElement].position.x +
        " Y:" +
        itemsList[indexElement].position.y;
      teomId.innerHTML = itemsList[indexElement].id;
      teomClass.innerHTML = itemsList[indexElement].entClass;
      teomImage.src = `static/images/${itemsList[indexElement].entClass}.png`;
    } else {
      teomSize.innerHTML = "";
      teomCoordinates.innerHTML =
        "X:" + agent.position.x + " Y:" + agent.position.y;
      teomId.innerHTML = "";
      teomClass.innerHTML = "Agent";
      teomImage.src = `static/images/agent.png`;
    }
  }
}

function mouseReleased() {
  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0 || mouseX > cols * w || mouseY > rows * w) {
    return null;
  }

  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  modifica = true;
  checkWallNeighbor(cellsList[cellIndex(0, 0)], 2, 1);

  /* inserisce l'entità nuova solo se è stata selezionata e il drag è iniziato dall'img dell info-point */
  if (boolImgItemSelected) {
    var el = getElementInPosition(x, y);
    // se è l'agente = crea l'agente
    if (classItemSelected == "agent") {
      if (agent == null) {
        insertAgent(x.toString(), y.toString());
      } else {
        updateAgentPosition(x.toString(), y.toString());
      }
      deselectEntityImage();
    } else {
      /**
       * Controllo prima se l'oggetto esce di fuori dalla zona per via delle sue dimensioni
       */
      if (
        (document.getElementById("til-x").value == 1 &&
          document.getElementById("til-y").value == 1) ||
        (parseInt(document.getElementById("til-x").value) + x - 1 < cols &&
          parseInt(document.getElementById("til-y").value) + y - 1 < rows &&
          !checkWallNeighbor(
            cellsList[cellIndex(x, y)],
            document.getElementById("til-x").value,
            document.getElementById("til-y").value
          ))
      ) {
        // varie possibilità di inserimento delle entità
        if (indexItemSelected != null && tilPosition.value == "on-floor") {
          // controllo se posso metterlo

          if (el == null) {
            console.log("Inserimento dell'entità.");
            insertEntity(
              classItemSelected + idCounter,
              classItemSelected,
              classItemSelected,
              x,
              y,
              0,
              document.getElementById("til-x").value,
              document.getElementById("til-y").value
            );
            idCounter++;
          }

          deselectEntityImage();
        }
        /**
         *  Se è stata scelta l'opzione on_top.
         */
        if (el != null && tilPosition.value == "on-top") {
          if (
            document.getElementById("til-x").value >= itemsList[el].sizeX &&
            document.getElementById("til-y").value >= itemsList[el].sizeY
          ) {
            getClassAbility(itemsList[el].entClass, "support").then(
              (supportBool) => {
                console.log(supportBool);
                if (supportBool) {
                  /**
                   * Se l'oggetto già esistente ha l'abilita support allora metto
                   * l'oggetto nuovo sopra e asserisco on_top.
                   */
                  console.log("entity on top");
                  insertEntity(
                    classItemSelected + idCounter,
                    classItemSelected,
                    classItemSelected,
                    x,
                    y,
                    1,
                    document.getElementById("til-x").value,
                    document.getElementById("til-y").value
                  );
                  setTimeout(function () {
                    insertOnTop(
                      classItemSelected + idCounter,
                      itemsList[el].id
                    );
                    idCounter++;
                    deselectEntityImage();
                  }, 200);
                }
              }
            );
          }
        }
        // se è scelta l'opzione on bottom
        if (el != null && tilPosition.value == "on-bottom") {
          getClassAbility(itemsList[el].entClass, "putting_under").then(
            (puttingUnder) => {
              if (puttingUnder) {
                // se l'oggetto già esistente ha l'abilita support allora metto l'oggetto nuovo sopra e asserisco on_top
                console.log("entity on bottom");
                insertEntity(
                  classItemSelected + idCounter,
                  classItemSelected,
                  classItemSelected,
                  x,
                  y,
                  0,
                  document.getElementById("til-x").value,
                  document.getElementById("til-y").value
                );

                setTimeout(function () {
                  insertOnBottom(
                    classItemSelected + idCounter,
                    itemsList[el].id
                  );
                  deselectEntityImage();
                  idCounter++;
                }, 200);
              }
            }
          );
        }
        // se è scelta l'opzione inside
        if (el != null && tilPosition.value == "inside") {
          getSpaceAvailable(itemsList[el].id).then((data) => {
            console.log(data);
          });
          setTimeout(function () {
            getClassAbility(itemsList[el].entClass, "contain").then(
              (contain) => {
                if (contain) {
                  // se l'oggetto già esistente ha l'abilita support allora metto l'oggetto nuovo sopra e asserisco on_top
                  console.log("entity inside");
                  insertEntity(
                    classItemSelected + idCounter,
                    classItemSelected,
                    classItemSelected,
                    x,
                    y,
                    0,
                    document.getElementById("til-x").value,
                    document.getElementById("til-y").value
                  );

                  // INSERIRE IL CONTROLLO DELLO SPAZIO INTERNO DISPONIBILE !!!!!
                  setTimeout(function () {
                    insertInside(
                      classItemSelected + idCounter.toString(),
                      itemsList[el].id
                    );
                    idCounter++;
                    deselectEntityImage();
                  }, 200);
                }
              }
            );
          }, 300);
        }
      }
    }
    boolImgItemSelected = false;
    /**
     * Aspetto che venga inserito l'entità nel db per poi prendere la nuova lista
     * di abilità delle entità nella mappa
     */
    setTimeout(function () {
      getEntityAbilityOnMap();
    }, 200);
    setTimeout(function () {
      getEntityPositioningOnMap();
    }, 300);
    setTimeout(function () {
      getMap();
    }, 400);
  }
}

function mouseDragged() {}

/**
 * @param {int} x
 * @param {int} y
 * @returns indice dell'elemento nella itemsList in posizione x,y
 */
function getElementInPosition(x, y) {
  if (agent != null && agent.position.x == x && agent.position.y == y) {
    return -1;
  }
  for (var i = 0; i < itemsList.length; i++) {
    if (itemsList[i].position.x == x && itemsList[i].position.y == y) {
      return i;
    }
  }
  return null;
}

/**
 * @param {cell} cell
 * @param {int} x
 * @param {int} y
 * @returns true se l'oggetto con sizeX o sizeY > 1 viene messo sopra dei muri
 */
function checkWallNeighbor(cell, x, y) {
  check = false;
  for (var i = 0; i < x - 1; i++) {
    if (cellsList[cellIndex(cell.x + i, cell.y)].walls[1] == "true") {
      check = true;
    }
  }
  for (var i = 0; i < y - 1; i++) {
    if (cellsList[cellIndex(cell.x, cell.y + i)].walls[2] == "true") {
      check = true;
    }
  }
  return check;
}
