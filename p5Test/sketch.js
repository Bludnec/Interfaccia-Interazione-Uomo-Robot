var cols, rows;
var w = 50;
var grid = [];

function setup() {
  createCanvas(500, 500);
  cols = floor(width/w);
  rows = floor(height/w);

  for(var j =0; j<rows;j++){
    for(var i=0; i< cols; i++){
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
}

function draw() {
  background(51);
  for (var i = 0; i< grid.length;i++){
    grid[i].show();
  }
}

function Cell(i,j){
  this.i = i;
  this.j = j;

  /* Posiziona le celle in ordine sullo schermo in base alle coordinate*/
  this.show = function(){
    var x = this.i*w;
    var y = this.j*w;

    /* Creo le linee (up,right,left,down) intorno alle celle per creare i muri */
    stroke(255);
    line(x,y,x+w,y);
    line(x+w,y,x+w,y+w);
    line(x+w,y+w,x,y+w);
    line(x,y+w,x,y);
    //noFill();
    //rect(x,y,w,w);
  }

}


  console.log(grid);
