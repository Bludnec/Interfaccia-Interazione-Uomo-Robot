var televisionImage, bedImage;
function preload() {
  televisionImage = loadImage("images/television.png");
  bedImage = loadImage("images/bed.png");
}
class Forniture {
  constructor(
    id,
    name,
    i,
    j,
    contain_ability,
    support_ability,
    ability_to_move,
    ability_to_open
  ) {
    /* Id identificativo */
    this.id = id;
    this.name = name;
    /* Posizione riga/colonna */
    this.i = i;
    this.j = j;

    /* Calcolo le vere coordinate dell'oggetto */
    this.x = i * w;
    this.y = j * w;

    /* Abilities */
    this.contain_ability = contain_ability;
    this.support_ability = support_ability;
    this.ability_to_move = ability_to_move;
    this.ability_to_open = ability_to_open;
  }
}

class Television extends Forniture {
  constructor(id, name, i, j) {
    super(id, name, i, j, false, false, true, false);

    this.lexical_references = ["tv", "television"];
  }
  show() {
    image(televisionImage, this.x, this.y, w, w);
  }
}

class Bed extends Forniture {
  constructor(id, name, i, j) {
    super(id, name, i, j, false, true, false, false);

    this.lexical_references = ["bed"];
  }
  show() {
    image(bedImage, this.x, this.y, w, w);
  }
}
