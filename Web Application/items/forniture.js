class Forniture {
  constructor(id, name, i, j) {
    /* Id identificativo */
    this.id = id;
    this.name = name;
    /* Posizione riga/colonna */
    this.i = i;
    this.j = j;

    /* Calcolo le vere coordinate dell'oggetto */
    this.x = i * w;
    this.y = j * w;
  }
}

class Television extends Forniture {
  constructor(id, name, i, j) {
    super(id, name, i, j);

    /* Abilities */
    this.contain_ability = false;
    this.support_ability = false;
    this.ability_to_move = false;
    this.ability_to_open = false;

    this.lexical_references = ["tv", "television"];
  }
  show(img) {
    image(img, this.x, this.y, w, w);
  }
}

class Bed extends Forniture {
  constructor(id, name, i, j) {
    super(id, name, i, j);

    this.contain_ability = false;
    this.support_ability = true;
    this.ability_to_move = false;
    this.ability_to_open = false;

    this.lexical_references = ["bed", "couch", "sofa"];
  }
  show(img) {
    image(img, this.x, this.y, w, w);
  }
}
