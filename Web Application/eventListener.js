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
    colorCellMap(x, y);
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

  switch (indexItemSelected) {
    case "item-0":
      console.log("aggiungo letto");
      var bed = new Bed("bed" + idCounter, "bed", x, y);
      itemsList.push(bed);
      idCounter++;
      break;
    case "item-1":
      console.log("aggiungo tv");
      var television = new Television("tv" + idCounter, "television", x, y);
      itemsList.push(television);
      idCounter++;
      break;
  }
  console.log(itemsList);
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
