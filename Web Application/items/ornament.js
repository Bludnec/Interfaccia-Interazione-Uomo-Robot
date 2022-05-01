class Ornament {
  constructor(id, name, i, j) {
    this.id = id;
    this.name = name;
    /* i = row/ j = column */
    this.i = i;
    this.j = j;

    /* Real coordinates on the canvas */
    this.x = i * w;
    this.y = j * w;

    /* Abilities */
    this.contain_ability = false;
    this.support_ability = false;
    this.ability_to_move = false;
    this.ability_to_open = false;
  }
  show(img) {
    image(img, this.x, this.y, w, w);
  }
}

class Television extends Ornament {
  constructor(id, name, i, j) {
    super(id, name, i, j);
    this.status = "on";
    this.lexical_references = ["tv", "television"];
  }
  show() {
    if (this.status == "off") {
      super.show(tvOffImage);
    } else {
      super.show(tvOnImage);
    }
  }

  changeStatus() {
    if (this.status == "off") {
      this.status = "on";
    } else {
      this.status = "off";
    }
  }
}

class Book extends Ornament {
  constructor(id, name, i, j) {
    super(id, name, i, j);

    this.ability_to_move = true;

    this.lexical_references = ["book", "volume"];
  }
  show() {
    super.show(bookImage);
  }
}

class Rug extends Ornament {
  constructor(id, name, i, j) {
    super(id, name, i, j);

    this.support_ability = true;
    this.ability_to_walk_on = true;

    this.lexical_references = ["rug", "carpet"];
  }
  show() {
    super.show(rugImage);
  }
}
