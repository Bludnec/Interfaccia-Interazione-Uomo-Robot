var cols, rows;
var w = document.getElementById("cell-size").value;

var grid = [];

document.getElementById("drawButton").addEventListener("click", setup);

function setup() {
  grid = [];
  w = document.getElementById("cell-size").value;
  rows = document.getElementById("height").value * w;
  cols = document.getElementById("width").value * w;
  var canvas = createCanvas(cols, rows);
  canvas.parent("canvas-zone");
  canvas.mouseClicked(colorCell);
  frameRate(5);

  cols = floor(width / w);
  rows = floor(height / w);

  /* Creazione della lista delle celle */
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
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

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;

  this.zone = "";
  /* Boolean per i muri  [top,right,bottom,left] */
  this.walls = [true, true, true, true];
  /* Variabile per verificare se la cella è già stata visitata */
  this.visited = false;

  /* Posiziona le celle in ordine sullo schermo in base alle coordinate*/
  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;

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
    //noFill();
    //rect(x,y,w,w);
  };
}

function colorCell() {
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  fill(255, 0, 255, 100);
  rect(x * w, y * w, w, w);
  var cell = grid[cellIndex(x, y)];
  console.log(cell);
}
