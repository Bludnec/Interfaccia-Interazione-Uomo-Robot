var cols, rows;
var cellsList = [];
var itemsList = [];

var boolResizeCanvas = false;
var indexItemSelected;

var boolLoadMap = false;

var agent;

var w = document.getElementById("cell-size").value;

document.getElementById("drawButton").addEventListener("click", setup);
document.getElementById("resizeButton").addEventListener("click", () => {
  boolResizeCanvas = true;
  setup();
});

for (var i = 0; i < 3; i++) {
  document.getElementById(`item-${i}`).addEventListener("dragstart", dragItem);
  document.getElementById(`item-${i}`).addEventListener("dragend", undragItem);
}

/**
 * The preload() function is used to handle
 *  asynchronous loading of external files in a blocking way
 */
var loadedCellMap;
var televisionImage, bedImage;
var agentImage;
function preload() {
  loadedCellMap = loadJSON("map/map.json");
  televisionImage = loadImage("images/television.png");
  bedImage = loadImage("images/bed.png");
  agentImage = loadImage("images/robot.png");
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
      /* Create a new canvas with new cellsList */
      cellsList = [];
      itemsList = [];
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var cell = new Cell(i, j);
          cellsList.push(cell);
        }
      }
    } else {
      /**
       * Resize canvas with old cell list and object list
       * by changing x, y coordinates.
       */
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          cellsList[cellIndex(i, j)].x = i * w;
          cellsList[cellIndex(i, j)].y = j * w;
        }
      }

      for (var k = 0; k < itemsList.length; k++) {
        itemsList[k].x = itemsList[k].i * w;
        itemsList[k].y = itemsList[k].j * w;
      }

      agent.x = agent.i * w;
      agent.y = agent.j * w;

      boolResizeCanvas = false;
    }
  } else if (boolLoadMap) {
    cellsList = [];
    itemsList = [];
    /* Load the saved map */
    for (var k = 0; k < 100; k++) {
      /* Create the cells with the coordinates taken from the json. */
      var cell = new Cell(loadedCellMap[k].i, loadedCellMap[k].j);
      /* Assign the values ​​taken from the json to the cells just created. */
      cell.zone = loadedCellMap[k].zone;
      cell.cellColor = loadedCellMap[k].cellColor;
      cellsList.push(cell);
    }
    boolLoadMap = false;
  }
  /* Create canvas */
  var canvas = createCanvas(cols * w, rows * w);
  canvas.parent("canvas-zone");
}

/**
 * The draw() function continuously executes the lines of code
 * contained inside its block until the program is stopped.
 */
function draw() {
  frameRate(10);
  /* Disegno la mappa e la lista degli items */
  for (var i = 0; i < cellsList.length; i++) {
    deleteWalls(i);
    cellsList[i].show();
  }
  for (var i = 0; i < itemsList.length; i++) {
    drawItems(i);
  }
  if (agent != null) {
    agent.show(agentImage);
  }
}

/* Return the array's index of the cell in position i,j. */
function cellIndex(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

/* Functions for drag & drop of objects on the map */
function dragItem() {
  this.classList.add("selected");
  indexItemSelected = this.id;
}
function undragItem() {
  document.getElementById(`${indexItemSelected}`).classList.remove("selected");
}

function drawItems(i) {
  switch (itemsList[i].name) {
    case "bed":
      itemsList[i].show(bedImage);
      break;
    case "robot":
      itemsList[i].show(agentImage);
      break;
    case "television":
      itemsList[i].show(televisionImage);
      break;
  }
}

/* Funzione per vedere se nelle coordinate scelte c'è qualcosa */
function findElement(i, j) {
  for (var k = 0; k < itemsList.length; k++) {
    if (itemsList[k].i == i && itemsList[k].j == j) {
      return itemsList[k];
    }
  }
  return null;
}
