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
  for (var i = 0; i < cellList.length; i++) {
    cellList[i].show();
  }
}

function draw() {
  frameRate(1);
  for (var i = 0; i < cellList.length; i++) {
    cellList[i].show();
  }
}

/* Funzione per ridisegnare il canvas dopo il click al bottone "Draw" */
function redrawCanvas() {
  rows = document.getElementById("height").value * w;
  cols = document.getElementById("width").value * w;
  resizeCanvas(cols, rows);
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
  }

  getI() {
    return this.i;
  }
  getJ() {
    return this.j;
  }

  setI(i) {
    this.i = i;
  }
  setJ(j) {
    this.i = j;
  }

  /* Posiziona le celle in ordine sullo schermo in base alle coordinate*/
  show() {
    var x = this.i * w;
    var y = this.j * w;
    /*Creo il rettangolo della cella */
    fill(51);
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

function clickedCell() {
  console.log("mouse clicked on " + mouseX + "," + mouseY);
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  if (cellList[cellIndex(x, y)] != undefined) {
    console.log(cellList[cellIndex(x, y)]);
  } else {
    console.log("Nessuna cella cliccata.");
  }
}
