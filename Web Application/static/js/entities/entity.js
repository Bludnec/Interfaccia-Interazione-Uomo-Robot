class Entity {
  constructor(id, name, x, y, z) {
    this.id = id;
    this.name = name;

    this.position = new Position(x, y, z);

    /* Real coordinates on the canvas */
    this.mapX = i * w;
    this.mapY = j * w;

    /* Abilities */
    this.contain_ability = false;
    this.support_ability = false;
    this.ability_to_move = false;
    this.ability_to_open = false;
    this.walkable = false;

    this.lexical_references = [];
  }
  show(img) {
    image(img, this.mapX, this.mapY, w, w);
  }
}
