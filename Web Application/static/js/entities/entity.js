class Entity {
  constructor(id, name, entClass, position) {
    this.id = id;
    this.name = name;
    this.entClass = entClass;

    this.position = position;

    /* Real coordinates on the canvas */
    this.mapX = this.position.x * w;
    this.mapY = this.position.y * w;

    this.status;

    //this.ability = getEntityAbility(this.id);

    //this.lexical_references = [];
  }
  show() {
    var img = eval(`${this.entClass}Image`);
    image(img, this.mapX, this.mapY, w, w);
  }
}
