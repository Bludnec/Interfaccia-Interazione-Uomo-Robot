var cols, rows;
var w = document.getElementById("cell-size").value;
var cellList = [];

document.getElementById("drawButton").addEventListener("click", setup);

function setup() {
  cellList = [];
  w = document.getElementById("cell-size").value;
  rows = document.getElementById("height").value;
  cols = document.getElementById("width").value;
  var canvas = createCanvas(cols * w + 400, rows * w + 400);
  canvas.parent("canvas-zone");
  canvas.mouseClicked(clickedCell);
  /* Creazione della lista delle celle */
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      cellList.push(cell);
    }
  }
}

function draw() {
  frameRate(5);
  for (var i = 0; i < cellList.length; i++) {
    deleteWalls(i);
    cellList[i].show();
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
  var x = cellList[i].i;
  var y = cellList[i].j;
  // controllo a destra
  if (
    x + 1 < cols &&
    i < cellList.length &&
    cellList[cellIndex(x + 1, y)].zone == cellList[i].zone
  ) {
    cellList[cellIndex(x + 1, y)].walls[3] = false;
    cellList[i].walls[1] = false;
  } else if (x + 1 < cols && i < cellList.length) {
    cellList[i].walls[1] = true;
    cellList[cellIndex(x + 1, y)].walls[3] = true;
  }
  // controllo a sx
  if (
    x - 1 < cols &&
    i < 0 &&
    i < cellList.length &&
    cellList[cellIndex(x - 1, y)].zone == cellList[i].zone
  ) {
    cellList[cellIndex(x - 1, y)].walls[1] = false;
    cellList[i].walls[3] = false;
  } else if (x - 1 < cols && i < 0 && i < cellList.length) {
    cellList[i].walls[3] = true;
    cellList[cellIndex(x - 1, y)].walls[1] = true;
  }
  // controllo a su
  if (
    y - 1 < 0 &&
    i < 0 &&
    i < cellList.length &&
    cellList[cellIndex(x, y - 1)].zone == cellList[i].zone
  ) {
    cellList[cellIndex(x, y - 1)].walls[2] = false;
    cellList[i].walls[0] = false;
  } else if (y - 1 < 0 && i < 0 && i < cellList.length) {
    cellList[i].walls[0] = true;
    cellList[cellIndex(x, y - 1)].walls[2] = true;
  }
  // controllo a giu
  if (
    y + 1 < rows &&
    i < cellList.length &&
    cellList[cellIndex(x, y + 1)].zone == cellList[i].zone
  ) {
    cellList[cellIndex(x, y + 1)].walls[0] = false;
    cellList[i].walls[2] = false;
  } else if (y + 1 < rows && i < cellList.length) {
    cellList[i].walls[2] = true;
    cellList[cellIndex(x, y + 1)].walls[0] = true;
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
  }

  /* Posiziona le celle in ordine sullo schermo in base alle coordinate*/
  show() {
    // this.walls = [true, true, true, true];
    var x = this.i * w;
    var y = this.j * w;
    /*Creo il rettangolo della cella */
    fill(this.cellColor);
    noStroke();
    rect(x, y, w, w);
    noFill();

    /* Creo le linee (up,right,left,down) intorno alle celle per creare i muri */
    stroke(255);
    var wInt = parseInt(w); // w parsato perché lo prende come stringa e line non disegna bene
    if (this.walls[0]) {
      line(x, y, wInt + x, y);
    }
    if (this.walls[1]) {
      line(x + wInt, y, x + wInt, y + wInt);
    }
    if (this.walls[2]) {
      line(x + wInt, y + wInt, x, y + wInt);
    }
    if (this.walls[3]) {
      line(x, y + wInt, x, y);
    }
  }
}

// DA REVISIONARE
function clickedCell() {
  console.log("mouse clicked on " + mouseX + "," + mouseY);
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  var check = document.getElementById("color-checkbox");
  if (check.checked == true) {
    if (cellList[cellIndex(x, y)] != undefined) {
      if (document.getElementById("zone").value == "") {
        alert("Inserire nome zona");
      } else {
        cellList[cellIndex(x, y)].zone = document.getElementById("zone").value;
        cellList[cellIndex(x, y)].cellColor =
          document.getElementById("cell-color").value;
      }
      console.log(cellList[cellIndex(x, y)]);
    } else {
      console.log("Nessuna cella cliccata.");
    }
  } else {
    showCellName();
  }
}

function showCellName() {
  var textZone = document.getElementById("text-zone");
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  if (cellList[cellIndex(x, y)] != undefined) {
    textZone.innerHTML = cellList[cellIndex(x, y)].zone;
  } else {
    textZone.innerHTML = "Nessuna cella cliccata";
  }
}
