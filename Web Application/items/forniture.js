class Forniture {
  constructor(
    id,
    name,
    x,
    y,
    contain_ability,
    support_ability,
    ability_to_move,
    ability_to_open
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;

    this.contain_ability = contain_ability;
    this.support_ability = support_ability;
    this.ability_to_move = ability_to_move;
    this.ability_to_open = ability_to_open;
  }
  show() {
    this.x *= w;
    this.y *= w;
    fill(255);
    noStroke();
    rect(this.x, this.y, w, w);
    noFill();
  }
}

class Television extends Forniture {
  constructor(id, name, x, y) {
    super(id, name, x, y, false, false, false, false);

    this.lexical_references = ["tv", "television"];
    this.image = "images/television.png";
  }
}
