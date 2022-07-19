///////////////

// Get the form and file field
let form = document.querySelector("#upload");
let file = document.querySelector("#file");

/**
 * Log the uploaded file to the console
 * @param {event} Event The file loaded event
 */
function logFile(event) {
  let str = event.target.result;
  let json = JSON.parse(str);
  console.log("string", str);
  console.log("json", json);

  var maxX = 0;
  var maxY = 0;
  for (var i = 0; i < json["cellList"].length; i++) {
    if (maxX < json["cellList"][i]["X"]) {
      maxX = json["cellList"][i]["X"];
    }
  }
  for (var i = 0; i < json["cellList"].length; i++) {
    if (maxY < json["cellList"][i]["Y"]) {
      maxY = json["cellList"][i]["Y"];
    }
  }
  maxX += 1;
  maxY += 1;
  document.getElementById("height").value = maxY;
  document.getElementById("width").value = maxX;
  rows = document.getElementById("height").value;
  cols = document.getElementById("width").value;

  var canvas = createCanvas(cols * w, rows * w);
  canvas.parent("canvas-zone");

  setTimeout(function () {
    postInfoUpload(json);
  }, 100);
  setTimeout(function () {
    getMap();
  }, 200);
  setTimeout(function () {
    getAllEntity();
  }, 400);
  setTimeout(function () {
    getEntityAbilityOnMap();
  }, 500);
  setTimeout(function () {
    getEntityPositioningOnMap();
  }, 700);
  setTimeout(function () {
    getEntityStatusOnMap();
  }, 800);
  setTimeout(function () {
    getAllEntity();
  }, 900);
}

/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit(event) {
  // Stop the form from reloading the page
  event.preventDefault();

  // If there's no file, do nothing
  if (!file.value.length) return;

  // Create a new FileReader() object
  let reader = new FileReader();

  // Setup the callback event to run when the file is read
  reader.onload = logFile;

  // Read the file
  reader.readAsText(file.files[0]);
}

// Listen for submit events
form.addEventListener("submit", handleSubmit);

document.getElementById("buttontest").addEventListener("click", () => {
  getInfoDownload().then((data) => {
    console.log(JSON.stringify(data));
    download(JSON.stringify(data), "map.txt", "text/plain");
  });
});

////////////////

var idCounter = 0;

var lastCoordinates = [];

var checkWalls = document.getElementById("walls-checkbox");
var checkColor = document.getElementById("color-checkbox");
var checkMoveAgent = document.getElementById("move-agent");

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
document.getElementById("delete-entity-btn0").addEventListener("click", () => {
  var check = false;
  for (var i = 0; i < positioningList.length; i++) {
    for (var j = 0; j < positioningList[i].length; j++) {
      if (
        positioningList[i][j][1] ==
        document.getElementById("teom-id0").innerHTML
      ) {
        check = true;
      }
    }
  }
  if (!check) {
    if (document.getElementById("teom-class0").innerHTML == "Agent") {
      agent = null;
      deleteAgent();
    } else {
      deleteCellOccupied(document.getElementById("teom-id0").innerHTML);
      deleteEntity(document.getElementById("teom-id0").innerHTML);
    }

    setTimeout(function () {
      getMap();
    }, 300);
    setTimeout(function () {
      getAllEntity();
    }, 600);
    setTimeout(function () {
      getEntityPositioningOnMap();
      showInfoTable(lastCoordinates[0], lastCoordinates[1]);
    }, 700);
  } else {
    alert(
      "Non posso cancellare l'entità perché ha altre entità sopra, sotto o dentro."
    );
  }
});
document.getElementById("delete-entity-btn1").addEventListener("click", () => {
  var check = false;
  for (var i = 0; i < positioningList.length; i++) {
    for (var j = 0; j < positioningList[i].length; j++) {
      if (
        positioningList[i][j][1] ==
        document.getElementById("teom-id1").innerHTML
      ) {
        check = true;
      }
    }
  }
  if (!check) {
    if (document.getElementById("teom-class1").innerHTML == "Agent") {
      agent = null;
      deleteAgent();
    } else {
      deleteCellOccupied(document.getElementById("teom-id1").innerHTML);
      deleteEntity(document.getElementById("teom-id1").innerHTML);
    }
    setTimeout(function () {
      getMap();
    }, 300);
    setTimeout(function () {
      getAllEntity();
    }, 600);
    setTimeout(function () {
      getEntityPositioningOnMap();
      showInfoTable(lastCoordinates[0], lastCoordinates[1]);
    }, 700);
  } else {
    alert(
      "Non posso cancellare l'entità perché ha altre entità sopra, sotto o dentro."
    );
  }
});
document.getElementById("delete-entity-btn2").addEventListener("click", () => {
  var check = false;
  for (var i = 0; i < positioningList.length; i++) {
    for (var j = 0; j < positioningList[i].length; j++) {
      if (
        positioningList[i][j][1] ==
        document.getElementById("teom-id2").innerHTML
      ) {
        cos;
        check = true;
      }
    }
  }
  if (!check) {
    if (document.getElementById("teom-class2").innerHTML == "Agent") {
      agent = null;
      deleteAgent();
    } else {
      deleteCellOccupied(document.getElementById("teom-id2").innerHTML);
      deleteEntity(document.getElementById("teom-id2").innerHTML);
    }
    setTimeout(function () {
      getMap();
    }, 300);
    setTimeout(function () {
      getAllEntity();
    }, 600);
    setTimeout(function () {
      getEntityPositioningOnMap();
      showInfoTable(lastCoordinates[0], lastCoordinates[1]);
    }, 700);
  } else {
    alert(
      "Non posso cancellare l'entità perché ha altre entità sopra, sotto o dentro."
    );
  }
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

  lastCoordinates = [x, y];

  var thisCell = cellsList[cellIndex(x, y)];

  document.getElementById("cell-id").innerHTML = thisCell.id;

  document.getElementById("cell-coordinates").innerHTML =
    "X:" + thisCell.x + " Y:" + thisCell.y;
  document.getElementById("cell-zone").innerHTML = thisCell.zone;

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

  showInfoTable(x, y);
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
  if (boolImgItemSelected && cellsList[cellIndex(x, y)].zone != "null") {
    var indexEl = getElementInPosition(x, y);
    if (!(cellsList[cellIndex(x, y)].occupied == null)) {
      for (var i = 0; i < itemsList.length; i++) {
        if (cellsList[cellIndex(x, y)].occupied == itemsList[i].id) {
          indexEl = i;
        }
      }
    }
    // se è l'agente = crea l'agente
    if (
      classItemSelected == "agent" &&
      !(indexEl == null && cellsList[cellIndex(x, y)].occupied == null)
    ) {
      alert("Non posso inserire il robot in quella posizione");
    }
    var tilX;
    var tilY;
    if (document.getElementById("size").value == "big") {
      tilX = 2;
      tilY = 2;
    }
    if (document.getElementById("size").value == "medium") {
      if (document.getElementById("orientation").value == "horizontal") {
        tilX = 2;
        tilY = 1;
      } else {
        tilX = 1;
        tilY = 2;
      }
    }
    if (document.getElementById("size").value == "small") {
      tilX = 1;
      tilY = 1;
    }
    if (
      classItemSelected == "agent" &&
      indexEl == null &&
      cellsList[cellIndex(x, y)].occupied == null
    ) {
      if (agent == null) {
        insertAgent(x.toString(), y.toString());
      } else {
        updateAgentPosition(x.toString(), y.toString());
      }
      deselectEntityImage();
    } else {
      /**
       * Controllo prima se l'oggetto esce di fuori dalla zona per via delle sue dimensioni
       * oppure se viene messo sopra ad un muro.
       */
      if (
        (tilX == 1 && tilY == 1) ||
        (parseInt(tilX) + x - 1 < cols &&
          parseInt(tilY) + y - 1 < rows &&
          !checkWallNeighbor(cellsList[cellIndex(x, y)], tilX, tilY))
      ) {
        if (
          indexItemSelected != null &&
          tilPosition.value == "on-floor" &&
          cellsList[cellIndex(x, y)].occupied == null
        ) {
          // controllo se posso metterlo
          if (indexEl == null) {
            console.log("Inserimento dell'entità.");
            insertEntity(
              classItemSelected + idCounter,
              classItemSelected,
              classItemSelected,
              x,
              y,
              0,
              tilX,
              tilY
            );
          }

          if (entityWithPowerStatus.includes(classItemSelected + "On")) {
            setTimeout(function () {
              insertEntityStatus(
                (classItemSelected + idCounter.toString()).toString(),
                "power",
                document.getElementById("power_status_value").value
              );
              idCounter++;
              deselectEntityImage();
            }, 200);
          } else if (
            entityWithPhysicalStatus.includes(classItemSelected + "Open")
          ) {
            setTimeout(function () {
              insertEntityStatus(
                (classItemSelected + idCounter.toString()).toString(),
                "physical",
                document.getElementById("physical_status_value").value
              );
              idCounter++;
              deselectEntityImage();
            }, 200);
          } else {
            idCounter++;
          }
        }
        if (
          cellsList[cellIndex(x, y)].occupied != null &&
          tilPosition.value == "on-floor"
        ) {
          alert("C'è già un'altra entità per terra.");
        }
        /**
         *  Se è stata scelta l'opzione on_top.
         */
        if (indexEl != null && tilPosition.value == "on-top") {
          if (
            tilX <= itemsList[indexEl].sizeX &&
            tilY <= itemsList[indexEl].sizeY &&
            parseInt(x) + parseInt(tilX) - 1 <=
              itemsList[indexEl].position.x + itemsList[indexEl].sizeX - 1
          ) {
            getClassAbility(itemsList[indexEl].entClass, "support").then(
              (supportBool) => {
                if (supportBool) {
                  /**
                   * Se l'oggetto già esistente ha l'abilita support allora metto
                   * l'oggetto nuovo sopra e asserisco on_top.
                   */
                  insertEntity(
                    classItemSelected + idCounter,
                    classItemSelected,
                    classItemSelected,
                    x,
                    y,
                    1,
                    tilX,
                    tilY
                  );
                  if (
                    entityWithPowerStatus.includes(classItemSelected + "On")
                  ) {
                    setTimeout(function () {
                      insertEntityStatus(
                        (classItemSelected + idCounter.toString()).toString(),
                        "power",
                        document.getElementById("power_status_value").value
                      );
                    }, 200);
                  }
                  setTimeout(function () {
                    insertOnTop(
                      classItemSelected + idCounter,
                      itemsList[indexEl].id
                    );
                    idCounter++;
                    deselectEntityImage();
                  }, 300);
                }
              }
            );
          }
        }
        // se è scelta l'opzione on bottom
        if (indexEl != null && tilPosition.value == "on-bottom") {
          getClassAbility(itemsList[indexEl].entClass, "putting_under").then(
            (puttingUnder) => {
              if (puttingUnder) {
                // se l'oggetto già esistente ha l'abilita support allora metto l'oggetto nuovo sopra e asserisco on_top
                insertEntity(
                  classItemSelected + idCounter,
                  classItemSelected,
                  classItemSelected,
                  x,
                  y,
                  0,
                  tilX,
                  tilY
                );
                if (entityWithPowerStatus.includes(classItemSelected + "On")) {
                  setTimeout(function () {
                    insertEntityStatus(
                      (classItemSelected + idCounter.toString()).toString(),
                      "power",
                      document.getElementById("power_status_value").value
                    );
                  }, 200);
                }
                setTimeout(function () {
                  insertOnBottom(
                    classItemSelected + idCounter,
                    itemsList[indexEl].id
                  );
                  deselectEntityImage();
                  idCounter++;
                }, 300);
              }
            }
          );
        }
        // se è scelta l'opzione inside
        if (indexEl != null && tilPosition.value == "inside") {
          getSpaceAvailable(itemsList[indexEl].id).then((data) => {
            if (
              data >= tilX * tilY &&
              tilX <= itemsList[indexEl].sizeX &&
              tilY <= itemsList[indexEl].sizeY &&
              parseInt(x) + parseInt(tilX) - 1 <=
                itemsList[indexEl].position.x + itemsList[indexEl].sizeX - 1
            ) {
              setTimeout(function () {
                getClassAbility(itemsList[indexEl].entClass, "contain").then(
                  (contain) => {
                    if (contain) {
                      // se l'oggetto già esistente ha l'abilita support allora metto l'oggetto nuovo sopra e asserisco on_top
                      insertEntity(
                        classItemSelected + idCounter,
                        classItemSelected,
                        classItemSelected,
                        x,
                        y,
                        0,
                        tilX,
                        tilY
                      );
                      if (
                        entityWithPowerStatus.includes(classItemSelected + "On")
                      ) {
                        setTimeout(function () {
                          insertEntityStatus(
                            (
                              classItemSelected + idCounter.toString()
                            ).toString(),
                            "power",
                            document.getElementById("power_status_value").value
                          );
                        }, 200);
                      }
                      // INSERIRE IL CONTROLLO DELLO SPAZIO INTERNO DISPONIBILE !!!!!
                      setTimeout(function () {
                        insertInside(
                          classItemSelected + idCounter.toString(),
                          itemsList[indexEl].id
                        );
                        idCounter++;
                        deselectEntityImage();
                      }, 300);
                    }
                  }
                );
              }, 300);
            } else {
              alert("Non è possibile inserire l'entità.");
            }
          });
        }
      } else {
        alert("Non è possibile inserire l'oggetto lì");
      }
    }
    boolImgItemSelected = false;
    /**
     * Aspetto che venga inserito l'entità nel db per poi prendere la nuova lista
     * di abilità delle entità nella mappa
     */
    setTimeout(function () {
      getEntityAbilityOnMap();
    }, 400);
    setTimeout(function () {
      getEntityPositioningOnMap();
    }, 600);
    setTimeout(function () {
      getEntityStatusOnMap();
    }, 800);
    setTimeout(function () {
      getAllEntity();
    }, 1000);
    setTimeout(function () {
      getMap();
    }, 1200);
  } else if (
    !checkColor.checked &&
    !checkWalls.checked &&
    boolImgItemSelected
  ) {
    deselectEntityImage();
    alert("Non è possibile inserire un'entità su una cella indefinita.");
  }
}

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

/**
 * @param {int} x
 * @param {int} y
 * @return Mostra le tabelle delle informazioni delle entità in posizione x,y.
 */
function showInfoTable(x, y) {
  // se viene cliccato un oggetto sulla mappa riporta le sue info nella info-box
  var showItem = [];
  for (var i = 0; i < itemsList.length; i++) {
    if (itemsList[i].position.x == x && itemsList[i].position.y == y) {
      showItem.push(itemsList[i]);
    }
  }
  // TO DO: SE 0 ENTITY, NON CANCELLO LA TABLE MA REIMPOSTO I VALORI A PREDEFINITI

  if (cellsList[cellIndex(x, y)].occupied != null) {
    for (var i = 0; i < itemsList.length; i++) {
      if (itemsList[i].id == cellsList[cellIndex(x, y)].occupied) {
        showItem.push(itemsList[i]);
      }
    }
  }
  document.getElementById("table-entity-on-map0").classList.add("hidden");
  document.getElementById("table-entity-on-map1").classList.add("hidden");
  document.getElementById("table-entity-on-map2").classList.add("hidden");

  // TO DO: MOSTRARE AGENTE
  if (agent != null && x == agent.position.x && y == agent.position.y) {
    document.getElementById(`teom-coordinates0`).innerHTML =
      "X:" + x + " Y:" + y;

    document.getElementById(`teom-id0`).innerHTML = "agent";

    document.getElementById(`teom-position0`).innerHTML = "On the floor";

    document.getElementById(`teom-class0`).innerHTML = "Agent";

    document.getElementById(`teom-image0`).src = `static/images/agent.png`;
  }

  if (showItem.length > 0) {
    if (indexItemSelected != null) {
      deselectEntityImage();
    }

    for (var i = 0; i < showItem.length; i++) {
      // controllo se clicco un elemento o l'agente
      document
        .getElementById(`table-entity-on-map${i}`)
        .classList.remove("hidden");

      document.getElementById(`teom-coordinates${i}`).innerHTML =
        "X:" + showItem[i].position.x + " Y:" + showItem[i].position.y;

      document.getElementById(`teom-id${i}`).innerHTML = showItem[i].id;

      document.getElementById(`teom-position${i}`).innerHTML = "On the floor";

      for (var k = 0; k < positioningList[0].length; k++) {
        if (
          positioningList[0][k][0] ==
          document.getElementById(`teom-id${i}`).innerHTML
        ) {
          document.getElementById(`teom-position${i}`).innerHTML = "On top";
        }
      }
      for (var k = 0; k < positioningList[1].length; k++) {
        if (
          positioningList[1][k][0] ==
          document.getElementById(`teom-id${i}`).innerHTML
        ) {
          document.getElementById(`teom-position${i}`).innerHTML = "On bottom";
        }
      }
      for (var k = 0; k < positioningList[2].length; k++) {
        if (
          positioningList[2][k][0] ==
          document.getElementById(`teom-id${i}`).innerHTML
        ) {
          document.getElementById(`teom-position${i}`).innerHTML = "Inside";
        }
      }

      document.getElementById(`teom-class${i}`).innerHTML =
        showItem[i].entClass;

      document.getElementById(
        `teom-image${i}`
      ).src = `static/images/${showItem[i].entClass}.png`;
    }
  }
}
