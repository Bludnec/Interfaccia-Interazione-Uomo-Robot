var cols, rows;
var cellsList = [];
var itemsList = [];

var boolResizeCanvas,
  boolItemSelected = false;
var indexItemSelected;

var boolLoadMap = false;
var loadedCellMap;

var w = document.getElementById("cell-size").value;

document.getElementById("drawButton").addEventListener("click", setup);
document.getElementById("resizeButton").addEventListener("click", resizeCanv);

document.getElementById("save-map-button").addEventListener("click", saveMap);
document.getElementById("load-map-button").addEventListener("click", loadMap);

var imgIndex = 0;

/* Creo la colonna */
var el = document.createElement("div");
el.classList.add("column");
var box = document.getElementById("row-list-grid");
box.appendChild(el);

/* Attacco le immagini alla nuova colonna */
var im = document.createElement("img");
im.src = "images/bed.png";
im.setAttribute("id", imgIndex);

im.addEventListener("click", selectedItem);
var box = document.getElementById("column");
el.appendChild(im);
imgIndex++;

var im2 = document.createElement("img");
im2.src = "images/television.png";
im2.setAttribute("id", imgIndex);
im2.addEventListener("click", selectedItem);
el.appendChild(im2);

/* Finish creating the object list */

function selectedItem() {
  if (!boolItemSelected) {
    this.classList.add("selected");
    indexItemSelected = this.id;
    boolItemSelected = true;
  } else if (
    /* Se il click è diverso dalla cella cliccata */
    boolItemSelected &&
    this.id != indexItemSelected
  ) {
    document
      .getElementById(`${indexItemSelected}`)
      .classList.remove("selected");
    indexItemSelected = this.id;
    this.classList.add("selected");
  } else if ((this.id = indexItemSelected)) {
    this.classList.remove("selected");
    indexItemSelected = -1;
    boolItemSelected = false;
  }
  console.log(indexItemSelected);
}

/**
 * The preload() function is used to handle
 *  asynchronous loading of external files in a blocking way
 */
function preload() {
  loadedCellMap = loadJSON("map/map.json");
  imgRobot = loadImage("images/bed.png");
}

/**
 * The setup() function is called once when the program starts.
 * It's used to define initial environment properties.
 */
function setup() {
  w = document.getElementById("cell-size").value;
  rows = document.getElementById("height").value;
  cols = document.getElementById("width").value;

  /**
   * Creating canvas.
   * If boolLoadMap = true => load the saved map, else create a new one.
   * If boolResizeCanvas = true => resize canvas and use old cellList.
   * If boolLoadMap and boolResizeCanvas = false => create a new canvas and new cellsList.
   */
  if (!boolLoadMap) {
    if (!boolResizeCanvas) {
      /* Create a new cellsList */
      cellsList = [];
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var cell = new Cell(i, j);
          cellsList.push(cell);
        }
      }
    } else {
      /* Resize canvas */
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          cellsList[cellIndex(i, j)].x = i * w;
          cellsList[cellIndex(i, j)].y = j * w;
        }
      }
      boolResizeCanvas = false;
    }
  } else if (boolLoadMap) {
    cellsList = [];
    /* Load the saved map */
    console.log("prova");
    for (var k = 0; k < 100; k++) {
      /* create the cells with the coordinates taken from the json. */
      var cell = new Cell(loadedCellMap[k].i, loadedCellMap[k].j);
      /* Assign the values ​​taken from the json to the cells just created. */
      cell.zone = loadedCellMap[k].zone;
      cell.cellColor = loadedCellMap[k].cellColor;

      cellsList.push(cell);
    }
    alert("mappa caricata");

    boolLoadMap = false;
  }

  const television = new Television(1, "tv", 1, 1);
  itemsList.push(television);

  var canvas = createCanvas(cols * w, rows * w);
  canvas.parent("canvas-zone");
}

/**
 * The draw() function continuously executes the lines of code
 * contained inside its block until the program is stopped.
 */
function draw() {
  frameRate(1);
  console.log("draw");

  /* Disegno la mappa e la lista degli items */
  for (var i = 0; i < cellsList.length; i++) {
    deleteWalls(i);
    cellsList[i].show();
  }
  for (var i = 0; i < itemsList.length; i++) {
    console.log(itemsList[i].id);
    itemsList[i].show();
  }
}

function mouseClicked() {
  console.log(mouseX, mouseY);

  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0) {
    return null;
  }

  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  var check = document.getElementById("color-checkbox");

  /* Color the cell and assign the value "zone" to the cell. */
  if (cellsList[cellIndex(x, y)] != undefined && check.checked == true) {
    colorCell(x, y);
  }

  if (cellsList[cellIndex(x, y)] != undefined) {
    console.log(cellsList[cellIndex(x, y)]);
  }
}

function keyPressed() {
  /* Press "Escape" for unselect the selected item. */
  if (keyCode === ESCAPE && boolItemSelected) {
    document
      .getElementById(`${indexItemSelected}`)
      .classList.remove("selected");
    boolItemSelected = false;
    indexItemSelected = null;
  } else {
    return null;
  }
}

/* Color the cells of map and assign the value to "zone". */
function colorCell(x, y) {
  if (document.getElementById("zone").value == "") {
    alert("Inserire nome zona");
  } else {
    cellsList[cellIndex(x, y)].zone = document.getElementById("zone").value;
    cellsList[cellIndex(x, y)].cellColor =
      document.getElementById("cell-color").value;
  }
}

function resizeCanv() {
  boolResizeCanvas = true;
  setup();
}

/* Save the map into a json file */
function saveMap() {
  var myJSON = JSON.parse(JSON.stringify(cellsList));
  console.log(myJSON);
  saveJSON(myJSON, "myJSON");
}

/* Load the existing map. */
function loadMap() {
  boolLoadMap = true;
  setup();
}

/* Delete the walls if adjacent cells have the same "zone" value. */
function deleteWalls(i) {
  var x = cellsList[i].i;
  var y = cellsList[i].j;
  // right check
  if (
    x + 1 < cols &&
    i < cellsList.length &&
    cellsList[cellIndex(x + 1, y)].zone == cellsList[i].zone
  ) {
    cellsList[cellIndex(x + 1, y)].walls[3] = false;
    cellsList[i].walls[1] = false;
  } else if (x + 1 < cols && i < cellsList.length) {
    cellsList[i].walls[1] = true;
    cellsList[cellIndex(x + 1, y)].walls[3] = true;
  }
  // left check
  if (
    x - 1 < cols &&
    i < 0 &&
    i < cellsList.length &&
    cellsList[cellIndex(x - 1, y)].zone == cellsList[i].zone
  ) {
    cellsList[cellIndex(x - 1, y)].walls[1] = false;
    cellsList[i].walls[3] = false;
  } else if (x - 1 < cols && i < 0 && i < cellsList.length) {
    cellsList[i].walls[3] = true;
    cellsList[cellIndex(x - 1, y)].walls[1] = true;
  }
  // up check
  if (
    y - 1 < 0 &&
    i < 0 &&
    i < cellsList.length &&
    cellsList[cellIndex(x, y - 1)].zone == cellsList[i].zone
  ) {
    cellsList[cellIndex(x, y - 1)].walls[2] = false;
    cellsList[i].walls[0] = false;
  } else if (y - 1 < 0 && i < 0 && i < cellsList.length) {
    cellsList[i].walls[0] = true;
    cellsList[cellIndex(x, y - 1)].walls[2] = true;
  }
  // down check
  if (
    y + 1 < rows &&
    i < cellsList.length &&
    cellsList[cellIndex(x, y + 1)].zone == cellsList[i].zone
  ) {
    cellsList[cellIndex(x, y + 1)].walls[0] = false;
    cellsList[i].walls[2] = false;
  } else if (y + 1 < rows && i < cellsList.length) {
    cellsList[i].walls[2] = true;
    cellsList[cellIndex(x, y + 1)].walls[0] = true;
  }
}

/* Return the array's index of the cell in position i,j. */
function cellIndex(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}
