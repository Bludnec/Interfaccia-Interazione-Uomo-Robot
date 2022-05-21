class Entity {
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
    this.walkable = false;

    this.lexical_references = [];
  }
  show(img) {
    image(img, this.x, this.y, w, w);
  }
}
