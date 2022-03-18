var cols, rows;
var w = 40;

function setup() {
  createCanvas(400, 400);
  cols = floor(width/w);
  rows = floor(height/w);
}

function draw() {
  background(51);
}

function Cell(i,j){
  this.i = i;
  this.j = j;
}
