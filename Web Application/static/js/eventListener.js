var idCounter = 0;

var lastCoordinates = [];

var checkWalls = document.getElementById('walls-checkbox');
var checkColor = document.getElementById('color-checkbox');
var checkMoveAgent = document.getElementById('move-agent');

function download(content, fileName, contentType) {
  var a = document.createElement('a');
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

// Event Listener per feedback negativo -> abilita answer textarea 
document.getElementById('wrong-feedback-qa').addEventListener('click', () => {
  document.getElementById('qa-answer-textarea').removeAttribute('disabled');
});

// Event Listener per feedback negativo -> disabilita answer textarea 
document.getElementById('ok-feedback-qa').addEventListener('click', () => {
  document.getElementById('qa-answer-textarea').setAttribute("disabled", "true");
});

// Invia la question di Q&A
document.getElementById('send-question-qa').addEventListener('click', () => {
  var qa_question = document.getElementById('qa-question-textarea').value;
  console.log(qa_question);
});

document.getElementById('map-height').addEventListener('keyup', () => {
  var num = document.getElementById('map-height').value;
  if (num > 50) {
    console.log(num);
    document.getElementById('map-height').value = 50;
  } else if (num < 0) {
    console.log(num);
    document.getElementById('map-height').value = 0;
  }
});

document.getElementById('map-width').addEventListener('keyup', () => {
  var num = document.getElementById('map-width').value;
  if (num > 50) {
    console.log(num);
    document.getElementById('map-width').value = 50;
  } else if (num < 0) {
    console.log(num);
    document.getElementById('map-width').value = 0;
  }
});

document
  .getElementById('send-construction-info')
  .addEventListener('click', () => {
    inputDatasetConstructor();
  });

document.getElementById('delete-entity-btn0').addEventListener('click', () => {
  var check = false;
  for (var i = 0; i < positioningList.length; i++) {
    for (var j = 0; j < positioningList[i].length; j++) {
      if (
        positioningList[i][j][1] ==
        document.getElementById('teom-id0').innerHTML
      ) {
        check = true;
      }
    }
  }
  if (!check) {
    if (document.getElementById('teom-class0').innerHTML == 'Agent') {
      agent = null;
      deleteAgent();
    } else {
      deleteCellOccupied(document.getElementById('teom-id0').innerHTML);
      deleteEntity(document.getElementById('teom-id0').innerHTML);
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

document.getElementById('delete-entity-btn1').addEventListener('click', () => {
  var check = false;
  for (var i = 0; i < positioningList.length; i++) {
    for (var j = 0; j < positioningList[i].length; j++) {
      if (
        positioningList[i][j][1] ==
        document.getElementById('teom-id1').innerHTML
      ) {
        check = true;
      }
    }
  }
  if (!check) {
    if (document.getElementById('teom-class1').innerHTML == 'Agent') {
      agent = null;
      deleteAgent();
    } else {
      deleteCellOccupied(document.getElementById('teom-id1').innerHTML);
      deleteEntity(document.getElementById('teom-id1').innerHTML);
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
document.getElementById('delete-entity-btn2').addEventListener('click', () => {
  var check = false;
  for (var i = 0; i < positioningList.length; i++) {
    for (var j = 0; j < positioningList[i].length; j++) {
      if (
        positioningList[i][j][1] ==
        document.getElementById('teom-id2').innerHTML
      ) {
        cos;
        check = true;
      }
    }
  }
  if (!check) {
    if (document.getElementById('teom-class2').innerHTML == 'Agent') {
      agent = null;
      deleteAgent();
    } else {
      deleteCellOccupied(document.getElementById('teom-id2').innerHTML);
      deleteEntity(document.getElementById('teom-id2').innerHTML);
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
  .getElementById('til-image')
  .addEventListener('drag', imgDrag);

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

  if (mouseButton === RIGHT) {
    deleteCellOnMap(x, y);
  }
  if (mouseButton === LEFT) {
    lastCoordinates = [x, y];

    var thisCell = cellsList[cellIndex(x, y)];

    document.getElementById('cell-id').innerHTML = thisCell.id;

    document.getElementById('cell-coordinates').innerHTML =
      'X:' + thisCell.x + ' Y:' + thisCell.y;
    document.getElementById('cell-zone').innerHTML = thisCell.zone;

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
  if (boolImgItemSelected && cellsList[cellIndex(x, y)].zone != 'null') {
    var indexEl = getEntityInPosition(x, y);
    if (!(cellsList[cellIndex(x, y)].occupied == null)) {
      for (var i = 0; i < itemsList.length; i++) {
        if (cellsList[cellIndex(x, y)].occupied == itemsList[i].id) {
          indexEl = i;
        }
      }
    }
    // se è l'agente = crea l'agente
    if (
      classItemSelected == 'agent' &&
      !(indexEl == null && cellsList[cellIndex(x, y)].occupied == null)
    ) {
      alert('Non posso inserire il robot in quella posizione');
    }
    var tilX;
    var tilY;
    if (document.getElementById('size').value == 'big') {
      tilX = 2;
      tilY = 2;
    }
    if (document.getElementById('size').value == 'medium') {
      if (document.getElementById('orientation').value == 'horizontal') {
        tilX = 2;
        tilY = 1;
      } else {
        tilX = 1;
        tilY = 2;
      }
    }
    if (document.getElementById('size').value == 'small') {
      tilX = 1;
      tilY = 1;
    }
    if (
      classItemSelected == 'agent' &&
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
          tilPosition.value == 'on-floor' &&
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

          if (entityWithPowerStatus.includes(classItemSelected + 'On')) {
            setTimeout(function () {
              insertEntityStatus(
                (classItemSelected + idCounter.toString()).toString(),
                'power',
                document.getElementById('power_status_value').value
              );
              idCounter++;
              deselectEntityImage();
            }, 200);
          } else if (
            entityWithPhysicalStatus.includes(classItemSelected + 'Open')
          ) {
            setTimeout(function () {
              insertEntityStatus(
                (classItemSelected + idCounter.toString()).toString(),
                'physical',
                document.getElementById('physical_status_value').value
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
          tilPosition.value == 'on-floor'
        ) {
          alert("C'è già un'altra entità per terra.");
        }
        /**
         *  Se è stata scelta l'opzione on_top.
         */
        if (indexEl != null && tilPosition.value == 'on-top') {
          if (
            tilX <= itemsList[indexEl].sizeX &&
            tilY <= itemsList[indexEl].sizeY &&
            parseInt(x) + parseInt(tilX) - 1 <=
            itemsList[indexEl].position.x + itemsList[indexEl].sizeX - 1
          ) {
            // CONTROLLARE SE GIà ESISTE UN'OGGETTO LI SOPRA
            //
            //
            getClassAbility(itemsList[indexEl].entClass, 'support').then(
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
                    entityWithPowerStatus.includes(classItemSelected + 'On')
                  ) {
                    setTimeout(function () {
                      insertEntityStatus(
                        (classItemSelected + idCounter.toString()).toString(),
                        'power',
                        document.getElementById('power_status_value').value
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
        if (indexEl != null && tilPosition.value == 'on-bottom') {
          getClassAbility(itemsList[indexEl].entClass, 'putting_under').then(
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
                if (entityWithPowerStatus.includes(classItemSelected + 'On')) {
                  setTimeout(function () {
                    insertEntityStatus(
                      (classItemSelected + idCounter.toString()).toString(),
                      'power',
                      document.getElementById('power_status_value').value
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
        if (indexEl != null && tilPosition.value == 'inside') {
          getSpaceAvailable(itemsList[indexEl].id).then((data) => {
            if (
              data >= tilX * tilY &&
              tilX <= itemsList[indexEl].sizeX &&
              tilY <= itemsList[indexEl].sizeY &&
              parseInt(x) + parseInt(tilX) - 1 <=
              itemsList[indexEl].position.x + itemsList[indexEl].sizeX - 1
            ) {
              setTimeout(function () {
                getClassAbility(itemsList[indexEl].entClass, 'contain').then(
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
                        entityWithPowerStatus.includes(classItemSelected + 'On')
                      ) {
                        setTimeout(function () {
                          insertEntityStatus(
                            (
                              classItemSelected + idCounter.toString()
                            ).toString(),
                            'power',
                            document.getElementById('power_status_value').value
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

    reloadInfoMap(400);
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
function getEntityInPosition(x, y) {
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

function getEntitiesInPosition(x, y) {
  var entitiesList = [];
  if (agent != null && agent.position.x == x && agent.position.y == y) {
    return -1;
  }
  for (var i = 0; i < itemsList.length; i++) {
    if (itemsList[i].position.x == x && itemsList[i].position.y == y) {
      entitiesList.push(itemsList[i]);
    }
  }
  return entitiesList;
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
    if (cellsList[cellIndex(cell.x + i, cell.y)].walls[1] == 'true') {
      check = true;
    }
  }
  for (var i = 0; i < y - 1; i++) {
    if (cellsList[cellIndex(cell.x, cell.y + i)].walls[2] == 'true') {
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
  document.getElementById('table-entity-on-map0').classList.add('hidden');
  document.getElementById('table-entity-on-map1').classList.add('hidden');
  document.getElementById('table-entity-on-map2').classList.add('hidden');

  // TO DO: MOSTRARE AGENTE
  if (agent != null && x == agent.position.x && y == agent.position.y) {
    document.getElementById(`teom-coordinates0`).innerHTML =
      'X:' + x + ' Y:' + y;

    document.getElementById(`teom-id0`).innerHTML = 'agent';

    document.getElementById(`teom-position0`).innerHTML = 'On the floor';

    document.getElementById(`teom-class0`).innerHTML = 'Agent';

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
        .classList.remove('hidden');

      document.getElementById(`teom-coordinates${i}`).innerHTML =
        'X:' + showItem[i].position.x + ' Y:' + showItem[i].position.y;

      document.getElementById(`teom-id${i}`).innerHTML = showItem[i].id;

      document.getElementById(`teom-position${i}`).innerHTML = 'On the floor';

      for (var k = 0; k < positioningList[0].length; k++) {
        if (
          positioningList[0][k][0] ==
          document.getElementById(`teom-id${i}`).innerHTML
        ) {
          document.getElementById(`teom-position${i}`).innerHTML = 'On top';
        }
      }
      for (var k = 0; k < positioningList[1].length; k++) {
        if (
          positioningList[1][k][0] ==
          document.getElementById(`teom-id${i}`).innerHTML
        ) {
          document.getElementById(`teom-position${i}`).innerHTML = 'On bottom';
        }
      }
      for (var k = 0; k < positioningList[2].length; k++) {
        if (
          positioningList[2][k][0] ==
          document.getElementById(`teom-id${i}`).innerHTML
        ) {
          document.getElementById(`teom-position${i}`).innerHTML = 'Inside';
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

/**
 * Funzione per cancellare la cella in x,y col tasto destro.
 * @param {int} x
 * @param {int} y
 */
function deleteCellOnMap(x, y) {
  var thisCell = cellsList[cellIndex(x, y)];
  var thisEntitiesList = getEntitiesInPosition(x, y);

  // se la cella ha zone diverso da null (ovvero è istanziata)
  if (thisCell.zone != 'null') {
    var result = confirm(
      "Sei sicuro di voler rimuovere la cella con il suo contenuto? Se esiste un'entità in questa cella che ha dimensione maggiore di 1, verranno cancellati anche eventuali entità che si trovano sopra/sotto a quest'ultima."
    );

    // if OK
    if (result) {
      deleteCell(thisCell.id);
      setTimeout(function () {
        insertCell(thisCell.id, x, y, 'null', ['true', 'true', 'true', 'true']);
      }, 200);
      // time 600
      updateNeighborsCellsAfterDeleteCellInPosition(x, y);

      if (thisCell.occupied != null) {
        var app;
        for (var i = 0; i < itemsList.length; i++) {
          if (itemsList[i].id == thisCell.occupied) {
            app = itemsList[i];
          }
        }
        thisEntitiesList.push.apply(
          thisEntitiesList,
          getEntitiesInPosition(app.position.x, app.position.y)
        );
      }
      for (var i = 0; i < cellsList.length; i++) {
        for (var j = 0; j < thisEntitiesList.length; j++) {
          if (cellsList[i].occupied == thisEntitiesList[j].id) {
            thisEntitiesList.push.apply(
              thisEntitiesList,
              getEntitiesInPosition(cellsList[i].x, cellsList[i].y)
            );
          }
        }
      }
      deleteEntities(thisEntitiesList);

      reloadInfoMap(500);
      // if Cancel
    } else {
      console.log('Cancellazione cella annullata.');
    }
  }
}

/**
 * Funzione per ricaricare tutte le informazioni della mappa (celle e entità, con relative proprietà.)
 * @param {int} time Time stabilisce dopo quanto deve iniziare il ricaricamento delle informazioni della mappa.
 */
function reloadInfoMap(time) {
  setTimeout(function () {
    getMap();
  }, time + 200);
  setTimeout(function () {
    getAllEntity();
  }, time + 300);
  setTimeout(function () {
    getEntityAbilityOnMap();
  }, time + 400);
  setTimeout(function () {
    getEntityPositioningOnMap();
  }, time + 500);
  setTimeout(function () {
    getEntityStatusOnMap();
  }, time + 600);
  setTimeout(function () {
    getAllEntity();
  }, time + 700);
}

/**
 * Aggiorna i muri delle celle intorno alla cella appena cancellata, impostandoli su "true".
 * @param {int} x
 * @param {int} y
 */
function updateNeighborsCellsAfterDeleteCellInPosition(x, y) {
  setTimeout(function () {
    if (cellsList[cellIndex(x + 1, y)] != null) {
      updateCell(
        cellsList[cellIndex(x + 1, y)].id,
        x + 1,
        y,
        cellsList[cellIndex(x + 1, y)].zone,
        [
          cellsList[cellIndex(x + 1, y)].walls[0],
          cellsList[cellIndex(x + 1, y)].walls[1],
          cellsList[cellIndex(x + 1, y)].walls[2],
          'true',
        ]
      );
    }
  }, 300);
  setTimeout(function () {
    if (cellsList[cellIndex(x - 1, y)] != null) {
      updateCell(
        cellsList[cellIndex(x - 1, y)].id,
        x - 1,
        y,
        cellsList[cellIndex(x - 1, y)].zone,
        [
          cellsList[cellIndex(x - 1, y)].walls[0],
          'true',
          cellsList[cellIndex(x - 1, y)].walls[2],
          cellsList[cellIndex(x - 1, y)].walls[3],
        ]
      );
    }
  }, 400);
  setTimeout(function () {
    if (cellsList[cellIndex(x, y + 1)] != null) {
      updateCell(
        cellsList[cellIndex(x, y + 1)].id,
        x,
        y + 1,
        cellsList[cellIndex(x, y + 1)].zone,
        [
          'true',
          cellsList[cellIndex(x, y + 1)].walls[1],
          cellsList[cellIndex(x, y + 1)].walls[2],
          cellsList[cellIndex(x, y + 1)].walls[3],
        ]
      );
    }
  }, 500);
  setTimeout(function () {
    if (cellsList[cellIndex(x, y - 1)] != null) {
      updateCell(
        cellsList[cellIndex(x, y - 1)].id,
        x,
        y - 1,
        cellsList[cellIndex(x, y - 1)].zone,
        [
          cellsList[cellIndex(x, y - 1)].walls[0],
          cellsList[cellIndex(x, y - 1)].walls[1],
          'true',
          cellsList[cellIndex(x, y - 1)].walls[3],
        ]
      );
    }
  }, 600);
}
