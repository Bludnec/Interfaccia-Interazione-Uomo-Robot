var cols, rows;
var cellsList = [];
var itemsList = [];
var urlList;

var cellPath = [];

var agentActionsList = [];

var boolResizeCanvas = false;
var indexItemSelected;
var idItemSelected;
var classItemSelected;

// Table image list
var tilImage = document.getElementById("til-image");
var tilId = document.getElementById("til-id");
var tilClass = document.getElementById("til-class");
var tilSize = document.getElementById("til-size");

var tilPosition = document.getElementById("til-position");
var tilX = document.getElementById("til-x");
var tilY = document.getElementById("til-y");

// Table entity on map
var teomImage = document.getElementById("teom-image");
var teomId = document.getElementById("teom-id");
var teomClass = document.getElementById("teom-class");
var teomSize = document.getElementById("teom-size");
var teomCoordinates = document.getElementById("teom-coordinates");
var teomPosition = document.getElementById("teom-position");
//

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
function preload() {
  getAllUrl().then((data) => {
    /**
     * Creo la lista delle immagini selezionabili sulla web-app
     */
    for (var i = 0; i < data.length; i++) {
      var img = document.createElement("img");
      img.src = data[i]["Url"];
      img.id = `entity-${i}`;
      img.addEventListener("click", clickEntityImage);
      img.alt = data[i]["Class"];

      document.getElementById("img-list").appendChild(img);
    }
    for (i = 0; i < data.length; i++) {
      switch (data[i]["Class"]) {
        case "agent":
          agentImage = loadImage(data[i]["Url"]);
          break;
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
      // POST i x j cell map

      insertMap(rows, cols);
      console.log(cellsList);
    } else {
      /**
       * Resize canvas with old cell list and object list
       * by changing x, y coordinates.
       */
      // GET
      for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          cellsList[cellIndex(i, j)].mapX = i * w;
          cellsList[cellIndex(i, j)].mapY = j * w;
        }
      }
      // Resize delle entità
      for (var k = 0; k < itemsList.length; k++) {
        itemsList[k].x = itemsList[k].i * w;
        itemsList[k].y = itemsList[k].j * w;
      }
      // Resize dell'agente
      if (agent != null) {
        agent.mapX = agent.position.x * w;
        agent.mapY = agent.position.y * w;
      }
      boolResizeCanvas = false;
    }
  } else if (boolLoadMap) {
    cellsList = [];
    itemsList = [];
    /* Load the saved map */
    // POST della nuova mappa
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
  // getMap();
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
  // Se è stato istanziato l'agente, lo mostra sulla mappa.
  if (agent != null) {
    agent.show();
  }
  // se la lista spostamenti è diversa da 0 (ovvero l'agente deve spostarsi)
  if (cellPath.length != 0) {
    agent.moveTo(cellPath[0].i, cellPath[0].j);
    cellPath.shift();
  }
}

/* Functions for click an entity */
function clickEntityImage() {
  document.getElementById("table-img-list").classList.remove("hidden");
  document.getElementById("table-entity-on-map").classList.add("hidden");
  if (this.classList == "selected") {
    deselectEntityImage();
  } else if (idItemSelected != this.id && idItemSelected != null) {
    deselectEntityImage();
    this.classList.add("selected");

    tilImage.src = this.src;
    tilClass.innerHTML = this.alt;

    idItemSelected = this.id;
    indexItemSelected = idItemSelected.replace(/\D/g, "");
    classItemSelected = this.alt;
  } else {
    tilImage.src = this.src;
    tilClass.innerHTML = this.alt;

    this.classList.add("selected");
    idItemSelected = this.id;
    indexItemSelected = idItemSelected.replace(/\D/g, "");
    classItemSelected = this.alt;
  }
}

/* funzione che deseleziona e toglie il quadrato blu intorno all'img selezionata */
function deselectEntityImage() {
  document
    .getElementById(`entity-${indexItemSelected}`)
    .classList.remove("selected");
  tilImage.src = "static/images/empty.png";
  tilClass.innerHTML = "Select an entity";

  idItemSelected = null;
  indexItemSelected = null;
  classItemSelected = null;
}

/* Return the array's index of the cell in position i,j. */
function cellIndex(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}
