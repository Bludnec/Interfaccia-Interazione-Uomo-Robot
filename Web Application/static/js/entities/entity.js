class Entity {
  constructor(id, name, entClass, position, sizeX, sizeY) {
    this.id = id;
    this.name = name;
    this.entClass = entClass;

    this.position = position;

    this.ability = [];
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    /* Real coordinates on the canvas */
    this.mapX = this.position.x * w;
    this.mapY = this.position.y * w;

    this.status;
  }
  show() {
    var img = eval(`${this.entClass}Image`);
    if (this.status == "on") {
      img = eval(`${this.entClass}OnImage`);
    }
    if (this.status == "open") {
      img = eval(`${this.entClass}OpenImage`);
    }
    if (!checkPos(this.id)) {
      image(img, this.mapX, this.mapY, w * this.sizeX, w * this.sizeY);
    } else {
      image(
        plusImage,
        this.mapX,
        this.mapY,
        (w / 3) * this.sizeX,
        (w / 3) * this.sizeY
      );
    }
  }
}

function checkPos(id) {
  var check = false;
  if (positioningList[0] != undefined) {
    for (var i = 0; i < positioningList[0].length; i++) {
      if (id == positioningList[0][i][0]) {
        check = true;
      }
    }
    for (var i = 0; i < positioningList[1].length; i++) {
      if (id == positioningList[1][0]) {
        check = true;
      }
    }
    for (var i = 0; i < positioningList[2].length; i++) {
      if (id == positioningList[2][0]) {
        check = true;
      }
    }
  }
  return check;
}
