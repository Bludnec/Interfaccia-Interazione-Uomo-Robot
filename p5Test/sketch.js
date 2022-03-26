var cols, rows;
var w = document.getElementById("cell-size").value;
var cellsList = [];
var itemsList = [];
var boolItemSelected = false;
var indexItemSelected;

document.getElementById("drawButton").addEventListener("click", setup);

function setup() {
  cellsList = [];
  w = document.getElementById("cell-size").value;
  rows = document.getElementById("height").value;
  cols = document.getElementById("width").value;

  var canvas = createCanvas(cols * w, rows * w + 200);
  canvas.parent("canvas-zone");

  /* Creazione della lista delle celle */
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      cellsList.push(cell);
    }
  }

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

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    /* Zona della casa della cella */
    this.zone = "";
    /* Boolean per i muri  [top,right,bottom,left] */
    this.walls = [true, true, true, true];
    /* Variabile per verificare se la cella è già stata visitata */
    this.visited = false;
    /* Colore della cella */
    this.cellColor = 51;
    /* Coordinate della cella */
    this.x = this.i * w;
    this.y = this.j * w;
  }

  /* Posiziona le celle in ordine sullo schermo in base alle coordinate*/
  show() {
    /*Creo il rettangolo della cella */
    fill(this.cellColor);
    noStroke();
    rect(this.x, this.y, w, w);
    noFill();

    /* Creo le linee (up,right,left,down) intorno alle celle per creare i muri */
    stroke(255);
    var wInt = parseInt(w); // w parsato perché lo prende come stringa e line non disegna bene
    if (this.walls[0]) {
      line(this.x, this.y, wInt + this.x, this.y);
    }
    if (this.walls[1]) {
      line(this.x + wInt, this.y, this.x + wInt, this.y + wInt);
    }
    if (this.walls[2]) {
      line(this.x + wInt, this.y + wInt, this.x, this.y + wInt);
    }
    if (this.walls[3]) {
      line(this.x, this.y + wInt, this.x, this.y);
    }
  }
}

class Item {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.selected = false;
  }

  /* Posiziona le celle in ordine sullo schermo in base alle coordinate*/
  show() {
    var x = this.i * w;
    var y = this.j * w + rows * w + parseInt(w);

    fill(100);
    noStroke();
    rect(x, y, w, w);
    noFill();

    /* Creo le linee (up,right,left,down) intorno alle celle per creare i muri */
    if (this.selected) {
      stroke(255, 0, 0);
    } else {
      stroke(255, 255, 255);
    }
    var wInt = parseInt(w); // w parsato perché lo prende come stringa e line non disegna bene

    line(x, y, wInt + x, y);
    line(x + wInt, y, x + wInt, y + wInt);
    line(x + wInt, y + wInt, x, y + wInt);
    line(x, y + wInt, x, y);
  }
}

function mouseClicked() {
  //console.log(mouseX, mouseY);

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

  itemX = parseInt(mouseX / w);
  itemY = parseInt(mouseY / w) - rows - 1;
  if (itemsList[cellIndex(itemX, itemY)] != undefined) {
    /* prendo l'item selezionato */
    itemSelected = itemsList[cellIndex(itemX, itemY)];

    /* Se l'item è selezionato, lo deseleziona */
    if (itemSelected.selected) {
      boolItemSelected = false;
      indexItemSelected = null;
      itemSelected.selected = false;
    } else if (!boolItemSelected) {
      boolItemSelected = true;
      indexItemSelected = cellIndex(itemX, itemY);
      itemSelected.selected = true;
    }

    console.log(itemsList[cellIndex(itemX, itemY)]);
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

/* Colora le celle della mappa e assegna il valore a "zone" */
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
