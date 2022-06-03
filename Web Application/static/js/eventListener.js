var idCounter = 0;
var lastClickedIndex;

var checkWalls = document.getElementById("walls-checkbox");
var checkColor = document.getElementById("color-checkbox");

var boolMousePressed = false;
var indexItemPressed, xItemPressed, yItemPressed;

function mouseClicked() {
  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0 || mouseX > cols * w || mouseY > rows * w) {
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
  if (
    mouseX < 0 ||
    mouseY < 0 ||
    mouseX > cols * w ||
    (mouseY > rows * w && indexItemSelected == null)
  ) {
    return null;
  }

  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  var z = 0;
  /* Create a new object on mouse release in mouseX, mouseY coordinates */
  if (indexItemSelected != null) {
    insertEntity(
      classItemSelected + idCounter,
      classItemSelected,
      classItemSelected,
      x,
      y,
      z,
      "big",
      2,
      2
    );
    deselectEntityImage();
  }

  idCounter++;
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

function mouseDragged() {
  if (mouseX < 0 || mouseY < 0 || mouseX > cols * w || mouseY > rows * w) {
    return null;
  }
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  if (boolMousePressed) {
    itemsList[indexItemPressed].position.x = x * w;
    itemsList[indexItemPressed].position.y = y * w;
  }
}
