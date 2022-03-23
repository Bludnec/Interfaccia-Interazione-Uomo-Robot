var cols, rows;
var w = document.getElementById("cell-size").value;

var cellList = [];

document.getElementById("drawButton").addEventListener("click", setup);

function setup() {
  cellList = [];
  w = document.getElementById("cell-size").value;
  rows = document.getElementById("height").value;
  cols = document.getElementById("width").value;
  var canvas = createCanvas(cols * w + 400, rows * w);
  canvas.parent("canvas-zone");
  canvas.mouseClicked(clickedCell);

  leftBuffer = createGraphics(cols * w, rows * w);
  rightBuffer = createGraphics(400, rows * w);

  // Draw on your buffers however you like
  drawLeftBuffer();
  drawRightBuffer();
  // Paint the off-screen buffers onto the main canvas
  image(leftBuffer, 0, 0);
  image(rightBuffer, 400, 0);
}

function draw() {
  console.log("draw");
  frameRate(1);
}

function drawLeftBuffer() {
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

function drawRightBuffer() {
  rightBuffer.background(255, 100, 255);
  rightBuffer.fill(0, 0, 0);
  rightBuffer.textSize(32);
  rightBuffer.text("This is the right buffer!", 50, 50);
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
  /* Posiziona le celle in ordine sullo schermo in base alle coordinate*/
  show = function () {
    var x = this.i * w;
    var y = this.j * w;

    /*Creo il rettangolo della cella */
    fill(51);
    noStroke();
    rect(x, y, w, w);
    noFill();

    /* Creo le linee (up,right,left,down) intorno alle celle per creare i muri */
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
  };
}

function clickedCell() {
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  console.log(cellList[cellIndex(x, y)]);
}
