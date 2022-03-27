var cols, rows;
var w = document.getElementById("cell-size").value;
var cellsList = [];
var itemsList = [];
var boolItemSelected = false;
var indexItemSelected;
var cellMap;
/* Numero delle righe della lista itemsList per calibrare la grandezza del canvas
 * (verrà dopo assegnato un valore facendo il calcolo con il
 * numero degli elementi nella lsita)
 */
var numberOfRowsItem = 4;

document.getElementById("drawButton").addEventListener("click", setup);
document.getElementById("save-map-button").addEventListener("click", saveMap);
document.getElementById("load-map-button").addEventListener("click", loadMap);

/**
 * The preload() function is used to handle
 *  asynchronous loading of external files in a blocking way
 */
function preload() {
  cellMap = loadJSON("map/map.json");
}

/**
 * The setup() function is called once when the program starts.
 * It's used to define initial environment properties.
 */
function setup() {
  cellsList = [];
  w = document.getElementById("cell-size").value;
  rows = document.getElementById("height").value;
  cols = document.getElementById("width").value;

  var canvas = createCanvas(cols * w, rows * w + w * numberOfRowsItem);
  canvas.parent("canvas-zone");

  /* Creating the list of the cells. */
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      cellsList.push(cell);
    }
  }

  /* Creating the list of the selectable objects. */
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < cols; i++) {
      var item = new Item(i, j);
      itemsList.push(item);
    }
  }
}

function draw() {
  frameRate(5);

  /* Disegno la mappa e la lista degli items */
  for (var i = 0; i < cellsList.length; i++) {
    deleteWalls(i);
    cellsList[i].show();
  }
  for (var i = 0; i < itemsList.length; i++) {
    itemsList[i].show();
  }

  /* Disegno il quadrato rosso intorno al item selezionato (lo disegno dopo perché senno le linee dei contorni degli)
   *  item mostrati dopo sovrappongono le linee dell'elemento selezionato */
  if (boolItemSelected) {
    itemsList[indexItemSelected].show();
  }
}

/* Funzione per ridisegnare il canvas dopo il click al bottone "Draw" */
function redrawCanvas() {
  rows = document.getElementById("height").value * w;
  cols = document.getElementById("width").value * w;
  resizeCanvas(cols, rows);
}

/* Funzione per rimuovere i muri se le celle adiacenti hanno lo stesso valore di zone */
function deleteWalls(i) {
  var x = cellsList[i].i;
  var y = cellsList[i].j;
  // controllo a destra
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
  // controllo a sx
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
  // controllo a su
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
  // controllo a giu
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

/* Ritorna l'indice dell'array della cella in posizione i,j  */
function cellIndex(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function mouseClicked() {
  console.log(mouseX, mouseY);

  /* Se il click avviene fuori dal canvas ritorna null */
  if (mouseX < 0 || mouseY < 0) {
    return null;
  }
  /* Controllo se il click è fatto sulla zona delle celle. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  var check = document.getElementById("color-checkbox");
  /* Colora la cella e assegna il valore "zone" alla cella */
  if (cellsList[cellIndex(x, y)] != undefined && check.checked == true) {
    colorCell(x, y);
  }

  if (cellsList[cellIndex(x, y)] != undefined) {
    console.log(cellsList[cellIndex(x, y)]);
  }

  /* Controllo se il click è fatto sulla zona degli items. */
  itemX = x;
  itemY = y - rows - 1;
  if (itemsList[cellIndex(itemX, itemY)] != undefined) {
    console.log(itemsList[cellIndex(itemX, itemY)]);

    /* Prendo l'item selezionato */
    itemSelected = itemsList[cellIndex(itemX, itemY)];

    /* 1° if: controlla se c'è un elemento già selezionato (boolItemSelected = false)
     * sennò seleziona quello cliccato.
     * 2° if: controlla se c'è già un elemento selezionato ma è diverso da quello cliccato,
     * quindi deseleziona quello vecchio e seleziona l'ultimo cliccato.
     * 3° if: se l'elemento cliccato è quello già selezionato lo deseleziona.
     */
    if (!boolItemSelected) {
      boolItemSelected = true;
      indexItemSelected = cellIndex(itemX, itemY);
      itemSelected.selected = true;
    } else if (
      boolItemSelected &&
      cellIndex(itemX, itemY) != indexItemSelected
    ) {
      itemsList[indexItemSelected].selected = false;
      indexItemSelected = cellIndex(itemX, itemY);
      itemSelected.selected = true;
    } else if (itemSelected.selected) {
      boolItemSelected = false;
      indexItemSelected = null;
      itemSelected.selected = false;
    }
  }
}

function keyPressed() {
  /* Press "Escape" for unselect the selected item. */
  if (keyCode === ESCAPE && boolItemSelected) {
    itemsList[indexItemSelected].selected = false;
    boolItemSelected = false;
    indexItemSelected = null;
    console.log(indexItemSelected);
  } else {
    return null;
  }
}

/* Color the cells of map and assign the value to "zone" */
function colorCell(x, y) {
  if (document.getElementById("zone").value == "") {
    alert("Inserire nome zona");
  } else {
    cellsList[cellIndex(x, y)].zone = document.getElementById("zone").value;
    cellsList[cellIndex(x, y)].cellColor =
      document.getElementById("cell-color").value;
  }
  console.log(cellsList[cellIndex(x, y)]);
}

/* Salvo la mappa trasformano l'array cellsList in json */
function saveMap() {
  var myJSON = JSON.parse(JSON.stringify(cellsList));
  console.log(myJSON);
  saveJSON(myJSON, "myJSON");
}

/* Carica la mappa esistente scelta */
function loadMap() {
  console.log(cellMap[0].zone);
}
