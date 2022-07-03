class Cell {
  constructor(id, x, y, zone, walls) {
    this.id = id;
    this.x = x;
    this.y = y;
    /* Zona della casa della cella */
    this.zone = zone;
    /* Boolean per i muri  [top,right,bottom,left] */
    this.walls = walls;
    /* Colore della cella */
    this.cellColor = 51;
    /* Coordinate della cella */
    this.mapX = this.x * w;
    this.mapY = this.y * w;

    this.occupied = null;

    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.visited;
    this.closed;
    this.parent;
  }

  /* Posiziona le celle in ordine sullo schermo in base alle coordinate*/
  show() {
    /*Creo il rettangolo della cella */
    switch (this.zone) {
      case "kitchen":
        fill("red");
        break;
      case "bathroom":
        fill("blue");
        break;
      case "bedroom":
        fill("yellow");
        break;
      case "livingroom":
        fill("brown");
        break;
      case "balcony":
        fill("green");
        break;

      default:
        fill(51);
      // code block
    }
    noStroke();
    rect(this.mapX, this.mapY, w, w);

    /**
     * Creo un bordo intorno alle
     * celle per identificarle sulla mappa (i contorni non sono i muri)
     */
    noFill();
    stroke(0);
    strokeWeight(0.1);
    rect(this.mapX, this.mapY, w, w);

    /* Creo le linee (up,right,left,down) intorno alle celle per creare i muri */
    strokeWeight(3);
    stroke(0);
    var wInt = parseInt(w); // w parsato perché lo prende come stringa e line non disegna bene
    if (this.walls[0] == "true") {
      line(this.mapX, this.mapY, wInt + this.mapX, this.mapY);
    }
    if (this.walls[1] == "true") {
      line(this.mapX + wInt, this.mapY, this.mapX + wInt, this.mapY + wInt);
    }
    if (this.walls[2] == "true") {
      line(this.mapX + wInt, this.mapY + wInt, this.mapX, this.mapY + wInt);
    }
    if (this.walls[3] == "true") {
      line(this.mapX, this.mapY + wInt, this.mapX, this.mapY);
    }
  }
}
