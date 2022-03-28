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
    stroke(0);
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
