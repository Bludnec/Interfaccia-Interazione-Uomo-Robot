var frameRate = 3;

var cols, rows;
var cellsList = [];
var itemsList = [];
var urlList;

var agentActionsList = [];

var boolResizeCanvas = false;
var indexItemSelected;
var idItemSelected;
var classItemSelected;

var boolLoadMap = false;

var agent;

var w = document.getElementById("cell-size").value;

document.getElementById("drawButton").addEventListener("click", setup);
document.getElementById("resizeButton").addEventListener("click", () => {
  boolResizeCanvas = true;
  setup();
});

var CellMap;
var bedImage,
  bookImage,
  bucketImage,
  chairImage,
  cupImage,
  doorImage,
  fridgeImage,
  glassImage,
  jarImage,
  keyImage,
  keyboardImage,
  lampImage,
  laptopImage,
  microwaveImage,
  plateImage,
  rugImage,
  smartphoneImage,
  sofaImage,
  tableImage,
  televisionImage,
  wardrobeImage,
  windowImage;
var agentImage;

/**
 * The preload() function is used to handle
 *  asynchronous loading of external files in a blocking way
 */
var loaded;
function preload() {
  getAllUrl().then((data) => {
    /**
     * Creo la lista delle immagini selezionabili sulla web-app
     */
    for (var i = 0; i < data.length; i++) {
      var img = document.createElement("img");
      img.src = data[i]["Url"];
      img.id = `entity-${i}`;
      document.getElementById("img-list").appendChild(img);
      document
        .getElementById(`entity-${i}`)
        .addEventListener("dragstart", dragItem);
      document
        .getElementById(`entity-${i}`)
        .addEventListener("dragend", undragItem);
      img.alt = data[i]["Class"];
    }
    for (i = 0; i < data.length; i++) {
      console.log(i);
      switch (data[i]["Class"]) {
        case "bed":
          bedImage = loadImage(data[i]["Url"]);
          break;
        case "book":
          bookImage = loadImage(data[i]["Url"]);
          break;
        case "bucket":
          bucketImage = loadImage(data[i]["Url"]);
          break;
        case "chair":
          chairImage = loadImage(data[i]["Url"]);
          break;
        case "cup":
          cupImage = loadImage(data[i]["Url"]);
          break;
        case "door":
          doorImage = loadImage(data[i]["Url"]);
          break;
        case "fridge":
          fridgeImage = loadImage(data[i]["Url"]);
          break;
        case "glass":
          glassImage = loadImage(data[i]["Url"]);
          break;
        case "jar":
          jarImage = loadImage(data[i]["Url"]);
          break;
        case "key":
          keyImage = loadImage(data[i]["Url"]);
          break;
        case "keyboard":
          keyboardImage = loadImage(data[i]["Url"]);
          break;
        case "lamp":
          lampImage = loadImage(data[i]["Url"]);
          break;
        case "laptop":
          laptopImage = loadImage(data[i]["Url"]);
          break;
        case "microwave":
          microwaveImage = loadImage(data[i]["Url"]);
          break;
        case "plate":
          plateImage = loadImage(data[i]["Url"]);
          break;
        case "rug":
          rugImage = loadImage(data[i]["Url"]);
          break;
        case "smartphone":
          smartphoneImage = loadImage(data[i]["Url"]);
          break;
        case "sofa":
          sofaImage = loadImage(data[i]["Url"]);
          break;
        case "table":
          tableImage = loadImage(data[i]["Url"]);
          break;
        case "television":
          televisionImage = loadImage(data[i]["Url"]);
          break;
        case "wardrobe":
          wardrobeImage = loadImage(data[i]["Url"]);
          break;
        case "window":
          windowImage = loadImage(data[i]["Url"]);
          break;
      }
    }
  });

  loadedCellMap = loadJSON("static/map/map.json");
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
      if (agent != null) {
        agent.x = agent.i * w;
        agent.y = agent.j * w;
      }
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
    for (var i = 0; i < cellsList.length; i++) {
      deleteWalls(i);
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
  getAllEntity();

  frameRate(5);
  /* Disegno la mappa e la lista degli items */
  for (var i = 0; i < cellsList.length; i++) {
    cellsList[i].show();
  }
  for (var i = 0; i < itemsList.length; i++) {
    itemsList[i].show();
  }
  if (agent != null) {
    agent.show();
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
  idItemSelected = this.id;
  indexItemSelected = idItemSelected.replace(/\D/g, "");
  classItemSelected = this.alt;
}
function undragItem() {
  document
    .getElementById(`entity-${indexItemSelected}`)
    .classList.remove("selected");
}

/**
 * Funzione per vedere se nelle coordinate scelte c'è qualcosa
 * e vede se si può mettere un altro oggetto sopra.
 * Restituisce true se è possibile posizionare l'oggetto.
 */
function possToPutObject(i, j) {
  for (var k = 0; k < itemsList.length; k++) {
    if (itemsList[k].i == i && itemsList[k].j == j) {
      if (itemsList[k].support_ability) {
        return true;
      } else {
        return false;
      }
    }
  }
  return true;
}

/**
 * Funzione che permette all'agente di vedere se è in grado di spostarsi nella
 * cella i,j, o se può camminare sopra l'oggetto.
 */
function possMoveOn(i, j) {
  for (var k = 0; k < itemsList.length; k++) {
    if (itemsList[k].i == i && itemsList[k].j == j && itemsList[k].walkable) {
      return true;
    } else if (itemsList[k].i == i && itemsList[k].j == j) {
      return false;
    }
  }
  return true;
}
