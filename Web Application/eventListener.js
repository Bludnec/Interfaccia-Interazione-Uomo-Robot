var idCounter = 0;

function mouseClicked() {
  console.log(mouseX, mouseY);

  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0) {
    return null;
  }

  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);
  var check = document.getElementById("color-checkbox");

  /* Color the cell and assign the value "zone" to the cell. */
  if (cellsList[cellIndex(x, y)] != undefined && check.checked == true) {
    colorCell(x, y);
  }

  if (cellsList[cellIndex(x, y)] != undefined) {
    console.log(cellsList[cellIndex(x, y)]);
  }

  for (var k = 0; k < itemsList.length; k++) {
    if (itemsList[k].i == x && itemsList[k].j == y) {
      console.log(itemsList[k]);
    }
  }
}

function mouseReleased() {
  console.log(mouseX, mouseY);
  /* Returns null if the click is done outside the canvas it.  */
  if (mouseX < 0 || mouseY < 0) {
    return null;
  }

  /* Check if the click is done on the cell area. */
  var x = parseInt(mouseX / w);
  var y = parseInt(mouseY / w);

  if (cellsList[cellIndex(x, y)] != undefined) {
    console.log(indexItemSelected);
    if (indexItemSelected == "item-1") {
      var television = new Television(idCounter, "television", x, y);
      itemsList.push(television);
      idCounter++;
    }
  }
  indexItemSelected = -1;
}

/* Keyboard events */
function keyPressed() {
  /* Press "Escape" for unselect the selected item. */
  if (keyCode === ESCAPE && boolItemSelected) {
    document
      .getElementById(`${indexItemSelected}`)
      .classList.remove("selected");
    boolItemSelected = false;
    indexItemSelected = null;
  } else {
    return null;
  }
}
