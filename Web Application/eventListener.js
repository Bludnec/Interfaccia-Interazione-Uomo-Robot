var idCounter = 0;
var lastClickedIndex;

var infoName = document.getElementById("info-name");
var infoId = document.getElementById("info-id");
var infoCoord = document.getElementById("info-coord");
var infoLexRef = document.getElementById("info-lexRef");
var infoPoint = document.getElementById("item-info-point");

var cellInfoPoint = document.getElementById("cell-info-point");
var cellCoord = document.getElementById("cell-coord");
var cellZone = document.getElementById("cell-zone");

var checkWalls = document.getElementById("walls-checkbox");
var checkColor = document.getElementById("color-checkbox");

var boolMousePressed = false;
var indexItemPressed, xItemPressed, yItemPressed;

document
  .getElementById("delete-button")
  .addEventListener("click", deleteItemOnMap);

function mouseClicked() {
  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0) {
    return null;
  }

  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  var thisCell = cellsList[cellIndex(x, y)];

  /* Color the cell and assign the value "zone" to the cell. */
  if (thisCell != undefined && checkColor.checked == true) {
    colorCellMap(x, y);
  }
  /* Modifica dei muri */
  if (thisCell != undefined && checkWalls.checked == true) {
    editWalls(mouseX, mouseY);
  }
  /* Fa apparire tabella con info della cella */
  if (thisCell != undefined) {
    cellInfoPoint.classList.remove("hidden");

    cellCoord.textContent = "x:" + thisCell.i + ", y:" + thisCell.j;
    cellZone.textContent = thisCell.zone;
  }
  /* Fa apparire tabella con info dell'oggetto */
  for (var k = 0; k < itemsList.length; k++) {
    if (itemsList[k].i == x && itemsList[k].j == y) {
      infoPoint.classList.remove("hidden");

      infoName.textContent = itemsList[k].name;
      infoId.textContent = itemsList[k].id;
      infoCoord.textContent = "x:" + itemsList[k].i + ", y:" + itemsList[k].j;
      infoLexRef.textContent = itemsList[k].lexical_references;
      lastClickedIndex = k;
    }
  }
}

function mousePressed() {
  console.log("press" + indexItemPressed);
  if (mouseX < 0 || mouseY < 0) {
    return null;
  }

  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  for (var k = 0; k < itemsList.length; k++) {
    if (itemsList[k].i == x && itemsList[k].j == y) {
      boolMousePressed = true;
      indexItemPressed = k;
      xItemPressed = itemsList[k].i;
      yItemPressed = itemsList[k].j;
    }
  }
}

function mouseReleased() {
  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0) {
    return null;
  }

  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  /* Crea un nuovo oggetti al rilascio del mouse nelle coordinate mouseX, mouseY */
  if (findElement(x, y)) {
    switch (indexItemSelected) {
      case "item-0":
        console.log("Aggiungo agente");
        agent = new Agent("rob" + idCounter, x, y);
        idCounter++;
        break;
      case "item-1":
        console.log("Aggiungo letto");
        var bed = new Bed("bed" + idCounter, "bed", x, y);
        itemsList.push(bed);
        idCounter++;
        break;
      case "item-2":
        console.log("Aggiungo tv");
        var television = new Television("tv" + idCounter, "television", x, y);
        itemsList.push(television);
        idCounter++;
        break;
      case "item-3":
        console.log("Aggiungo libro");
        var book = new Book("bk" + idCounter, "book", x, y);
        itemsList.push(book);
        idCounter++;
        break;
      case "item-4":
        console.log("Aggiungo tavolo");
        var table = new Table("tab" + idCounter, "table", x, y);
        itemsList.push(table);
        idCounter++;
        break;
    }
    indexItemSelected = -1;
  }

  /* Sposta l'elemento pressato dopo il rilascio alle nuove coordinate */
  if (boolMousePressed && findElement(x, y)) {
    itemsList[indexItemPressed].i = x;
    itemsList[indexItemPressed].j = y;

    itemsList[indexItemPressed].x = x * w;
    itemsList[indexItemPressed].y = y * w;

    boolMousePressed = false;
    indexItemPressed = null;
  }
}

/* Keyboard events */
function keyPressed() {
  /* Press "Escape" for unselect the selected item. */
  if (keyCode === ESCAPE && lastClickedIndex != null) {
    removeInfoPoint();
  } else if (keyCode === UP_ARROW) {
    agent.moveUp();
  } else if (keyCode === DOWN_ARROW) {
    agent.moveDown();
  } else if (keyCode === RIGHT_ARROW) {
    agent.moveRight();
  } else if (keyCode === LEFT_ARROW) {
    agent.moveLeft();
  } else {
    return;
  }
}

function deleteItemOnMap() {
  if (lastClickedIndex != null) {
    removeInfoPoint();
    itemsList.splice(lastClickedIndex, 1);
    lastClickedIndex = null;
  } else {
    console.log(
      "Nessun elemento cancellato. Selezionane uno prima di cancellarlo."
    );
  }
}

/* Funzione per rimuovere l'info point */
function removeInfoPoint() {
  infoName.textContent = "";
  infoId.textContent = "";
  infoCoord.textContent = "";
  infoLexRef.textContent = "";
  infoPoint.classList.add("hidden");
}
