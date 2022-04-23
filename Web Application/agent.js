var agentImage;
function preload() {
  agentImage = loadImage("images/robot.png");
}

class Agent {
  constructor(id, i, j) {
    this.id = id;
    this.i = i;
    this.j = j;

    /* Calcolo le vere coordinate dell'oggetto */
    this.x = i * w;
    this.y = j * w;
  }

  show() {
    image(agentImage, this.x, this.y, w, w);
  }

  moveUp() {
    this.j -= 1;
  }
}
