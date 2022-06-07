var idCounter = 0;
var lastClickedIndex;

var checkWalls = document.getElementById("walls-checkbox");
var checkColor = document.getElementById("color-checkbox");

var imgItemSelected = document
  .getElementById("entity-image")
  .addEventListener("drag", imgDrag);
var boolImgItemSelected = false; // serve per vedere se il drag è iniziato dall'img selezionata

var boolMousePressed = false;
var indexItemPressed;

function imgDrag() {
  boolImgItemSelected = true;
}

function mouseClicked() {
  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0 || mouseX > cols * w || mouseY > rows * w) {
    return null;
  }

  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  var thisCell = cellsList[cellIndex(x, y)];

  // se viene cliccato un oggetto sulla mappa riporta le sue info nella info-box
  for (var i = 0; i < itemsList.length; i++) {
    if (itemsList[i].position.x == x && itemsList[i].position.y == y) {
      console.log(itemsList[i]);
      infoClass.innerHTML = itemsList[i].entClass;
      infoImage.src = `static/images/${itemsList[i].entClass}.png`;
      // GETENTITYSIZE DA PROBLEMI SOLO QUA CAZZO PUTTANA
      //getEntitySize("laptop0");
      //se è stato selezionato prima un elemento nella lista, viene deselezionato
      if (indexItemSelected != null) {
        deselectEntityImage();
      }
      break;
    }
  }

  /* Color the cell and assign the value "zone" to the cell. */
  if (thisCell != undefined && checkColor.checked == true) {
    colorCellMap(x, y);
  }
  /* Modifica dei muri */
  if (thisCell != undefined && checkWalls.checked == true) {
    editWalls(mouseX, mouseY);
  }

  /* Serve per impedire lo spostamento se viene solamente clicato l'oggetto invece di essere draggato */
  boolMousePressed = false;
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > cols * w || mouseY > rows * w) {
    return null;
  }
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
}

function mouseReleased() {
  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0 || mouseX > cols * w || mouseY > rows * w) {
    return null;
  }

  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  var z = 0;
  /* inserisce l'entità nuova solo se è stata selezionata e il drag è iniziato dall'img dell info-point */
  if (indexItemSelected != null && boolImgItemSelected) {
    insertEntity(
      classItemSelected + idCounter,
      classItemSelected,
      classItemSelected,
      x,
      y,
      z,
      document.getElementById("entity-size").value,
      document.getElementById("entity-x").value,
      document.getElementById("entity-y").value
    );
    idCounter++;
    boolImgItemSelected = false;
    deselectEntityImage();
  }

  getAllEntity();

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
