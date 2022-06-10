var idCounter = 0;

var checkWalls = document.getElementById("walls-checkbox");
var checkColor = document.getElementById("color-checkbox");

document.getElementById("delete-entity-btn").addEventListener("click", () => {
  deleteEntity(teomId.innerHTML);

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
  var thisCell = cellsList[cellIndex(x, y)];

  /* Color the cell and assign the value "zone" to the cell. */
  if (thisCell != undefined && checkColor.checked == true) {
    colorCellMap(x, y);
  }
  /* Modifica dei muri */
  if (thisCell != undefined && checkWalls.checked == true) {
    editWalls(mouseX, mouseY);
  }
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  var indexElement = getElementInPosition(x, y);

  // se viene cliccato un oggetto sulla mappa riporta le sue info nella info-box
  if (indexElement != null) {
    document.getElementById("table-img-list").classList.add("hidden");
    document.getElementById("table-entity-on-map").classList.remove("hidden");
    if (indexItemSelected != null) {
      deselectEntityImage();
    }

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
  }
}
// ritorna l'indice dell'elemento nella lista itemList in posizione x,y
function getElementInPosition(x, y) {
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

  /* inserisce l'entità nuova solo se è stata selezionata e il drag è iniziato dall'img dell info-point */
  if (boolImgItemSelected) {
    if (indexItemSelected != null && tilPosition.value == "on-floor") {
      // controllo se posso metterloù
      var el = getElementInPosition(x, y);
      if (el == null) {
        console.log("Inserimento");
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
        deselectEntityImage();
      }
      // se è scelta l'opzione on_top
      if (el != null && tilPosition.value == "on-top") {
        getClassAbility(itemsList[el].entClass, "support").then(
          (supportBool) => {
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
              deselectEntityImage();
            }
          }
        );
      }
      // se è scelta l'opzione on bottom
      if (el != null) {
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
              deselectEntityImage();
            }
          }
        );
      }

      // se è scelta l'opzione inside
      if (el != null) {
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
            deselectEntityImage();
          }
        });
      }
    }
  }

  /* Moves the pressed element after release to the new coordinates */
  if (boolMousePressed && possToPutObject(x, y)) {
    itemsList[indexItemPressed].position.x = x;
    itemsList[indexItemPressed].position.y = y;

    itemsList[indexItemPressed].mapX = x * w;
    itemsList[indexItemPressed].mapY = y * w;

    boolMousePressed = false;
    indexItemPressed = null;
  }
}

function mouseDragged() {}
