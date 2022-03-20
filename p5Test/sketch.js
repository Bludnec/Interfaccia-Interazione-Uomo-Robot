var cols, rows;
var w = 50;
var grid = [];

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent("canvas-zone");
  frameRate(5);

  cols = floor(width / w);
  rows = floor(height / w);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
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

console.log(grid);
