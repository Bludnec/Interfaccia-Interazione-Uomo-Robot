var cols, rows;
var cellsList = [];
var itemsList = [];
var abilityList = [];
var positioningList;
var urlList;
var modifica = false;

var entityTakenByAgent;

var cellPath = [];
var agentActionList = [];

var firstLaunch = true;
var agentActionsList = [];

var indexItemSelected;
var idItemSelected;
var classItemSelected;

// Table image list
var tilImage = document.getElementById("til-image");
var tilId = document.getElementById("til-id");
var tilClass = document.getElementById("til-class");

var tilPosition = document.getElementById("til-position");
var tilX = document.getElementById("til-x");
var tilY = document.getElementById("til-y");

// Table entity on map
var teomImage = document.getElementById("teom-image");
var teomId = document.getElementById("teom-id");
var teomClass = document.getElementById("teom-class");
var teomCoordinates = document.getElementById("teom-coordinates");
var teomPosition = document.getElementById("teom-position");
//

var boolLoadMap = false;

var agent;

var w = 60;

document.getElementById("drawButton").addEventListener("click", () => {
  cellsList = [];
  /* Create a new canvas with new cellsList */
  // POST i x j cell map
  rows = document.getElementById("height").value;
  cols = document.getElementById("width").value;

  var canvas = createCanvas(cols * w, rows * w);
  canvas.parent("canvas-zone");

  deleteMap();

  setTimeout(function () {
    insertMap(cols, rows);
  }, 200);

  setTimeout(function () {
    getMap();
  }, 500);
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
  /**
   * Creating canvas.
   * If boolLoadMap = true => load the saved map, else create a new one.
   * If boolLoadMap = true => create a new canvas and new cellsList loading che old map.
   */

  if (boolLoadMap) {
    itemsList = [];
    /* Load the saved map */
    // POST della nuova mappa
    for (var k = 0; k < 48; k++) {
      deleteMap();
      insertCell(
        loadedCellMap[k].id,
        loadedCellMap[k].x,
        loadedCellMap[k].y,
        loadedCellMap[k].zone,
        loadedCellMap[k].walls
      );
    }
    for (var i = 0; i < cellsList.length; i++) {
      deleteWalls(i);
    }
    boolLoadMap = false;
  }
  /* Create canvas */
}

/**
 * The draw() function continuously executes the lines of code
 * contained inside its block until the program is stopped.
 */
function draw() {
  frameRate(3);
  if (itemsList.length == 0 || modifica) {
    getAllEntity();
    modifica = false;
  }
  /* Disegno la mappa e la lista degli items */
  for (var i = 0; i < cellsList.length; i++) {
    cellsList[i].show();
  }
  for (var i = 0; i < itemsList.length; i++) {
    if (entityTakenByAgent == undefined) {
      itemsList[i].show();
    } else if (entityTakenByAgent.id != itemsList[i].id) {
      itemsList[i].show();
    }
  }
  // Se è stato istanziato l'agente, lo mostra sulla mappa.
  if (agent != null) {
    agent.show();
    setTimeout(function () {
      /**
       * Se la lista spostamenti è diversa da 0 (ovvero c'è un
       * path che l'agente deve percorrere) fa muovere l'agente
       * celle per cella ogni giro di draw().
       */
      if (cellPath != -1 && cellPath.length != 0) {
        if (cellPath[0].id != undefined) {
          agent.moveTo(cellPath[0].x, cellPath[0].y);
          cellPath.shift();
        } else {
          actionFounder();
          cellPath.splice(0, 1);
        }
      }
    }, 200);
  }
  // se la lista spostamenti è diversa da 0 (ovvero l'agente deve spostarsi) -
  // timeout perché sennò va ad influire con le altre query nel backend
}

function actionFounder() {
  //switch case con le azioni
  console.log(cellPath[0][0]);
  switch (cellPath[0][0]) {
    case "ARRIVING":
      agent.arriving(cellPath[0][1]);
      break;
    case "ATTACHING":
      agent.attaching(cellPath[0][1]);
      break;
    case "BRINGING":
      agent.bringing(cellPath[0][1]);
      break;
    case "CHANGE_DIRECTION":
      agent.change_direction(cellPath[0][1]);
      break;
    case "CHANGE_OPERATIONAL_STATE":
      agent.change_operational_state(cellPath[0][1]);
      break;
    case "CLOSURE":
      agent.closure(cellPath[0][1]);
      break;
    case "MANIPULATION":
      agent.manipulation(cellPath[0][1]);
      break;
    case "MOTION":
      agent.motion(cellPath[0][1]);
      break;
    case "RELEASING":
      agent.releasing(cellPath[0][1]);
      break;
    case "TAKING":
      agent.taking(cellPath[0][1]);
      break;
    default:
      console.log("Non sono riuscito a capire il comando.");
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
