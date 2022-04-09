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
