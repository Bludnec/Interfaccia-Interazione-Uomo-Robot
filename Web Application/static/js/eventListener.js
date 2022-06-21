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
  }
  document.getElementById("table-img-list").classList.add("hidden");
  document.getElementById("table-entity-on-map").classList.remove("hidden");
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

  // se viene cliccato un oggetto sulla mappa riporta le sue info nella info-box
  if (indexElement != null) {
    document.getElementById("table-img-list").classList.add("hidden");
    document.getElementById("table-entity-on-map").classList.remove("hidden");
    if (indexItemSelected != null) {
      deselectEntityImage();
    }

    // controllo se clicco un elemento o l'agente
    if (indexElement != -1) {
      getEntitySize(itemsList[indexElement].id).then((data) => {
        teomSize.innerHTML = data;
      });
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
// ritorna l'indice dell'elemento nella lista itemList in posizione x,y
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

function mouseReleased() {
  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0 || mouseX > cols * w || mouseY > rows * w) {
    return null;
  }
  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  modifica = true;

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
    } else {
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
            document.getElementById("til-size").value,
            document.getElementById("til-x").value,
            document.getElementById("til-y").value
          );
          idCounter++;
          boolImgItemSelected = false;
        }
        deselectEntityImage();
      }
      // se è scelta l'opzione on_top
      if (el != null && tilPosition.value == "on-top") {
        console.log(classItemSelected + idCounter);
        getClassAbility(itemsList[el].entClass, "support").then(
          (supportBool) => {
            console.log(supportBool);
            if (supportBool) {
              // se l'oggetto già esistente ha l'abilita support allora metto l'oggetto nuovo sopra e asserisco on_top
              console.log("entity on top");
              insertEntity(
                classItemSelected + idCounter,
                classItemSelected,
                classItemSelected,
                x,
                y,
                1,
                document.getElementById("til-size").value,
                document.getElementById("til-x").value,
                document.getElementById("til-y").value
              );
              insertOnTop(classItemSelected + idCounter, itemsList[el].id);
              idCounter++;
              boolImgItemSelected = false;
            }
            deselectEntityImage();
          }
        );
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
                document.getElementById("til-size").value,
                document.getElementById("til-x").value,
                document.getElementById("til-y").value
              );
              insertOnBottom(classItemSelected + idCounter, itemsList[el].id);
              idCounter++;
              boolImgItemSelected = false;
            }
            deselectEntityImage();
          }
        );
      }
      // se è scelta l'opzione inside
      if (el != null && tilPosition.value == "inside") {
        getClassAbility(itemsList[el].entClass, "contain").then((contain) => {
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
              document.getElementById("til-size").value,
              document.getElementById("til-x").value,
              document.getElementById("til-y").value
            );

            // INSERIRE IL CONTROLLO DELLO SPAZIO INTERNO DISPONIBILE !!!!!

            insertInside(classItemSelected + idCounter, itemsList[el].id);
            idCounter++;
            boolImgItemSelected = false;
          }
          deselectEntityImage();
        });
      }
    }
  }
}

function mouseDragged() {}
