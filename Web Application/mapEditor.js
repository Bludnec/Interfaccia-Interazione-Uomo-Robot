document.getElementById("save-map-button").addEventListener("click", saveMap);
document.getElementById("load-map-button").addEventListener("click", loadMap);

/* Color the cells of map and assign the value to "zone". */
function colorCellMap(x, y) {
  var thisCell = cellsList[cellIndex(x, y)];

  thisCell.zone = document.getElementById("zone").value;
  thisCell.cellColor = document.getElementById("cell-color").value;
  if (
    cellsList[cellIndex(x + 1, y)] != null &&
    thisCell.zone == cellsList[cellIndex(x + 1, y)].zone
  ) {
    thisCell.walls[1] = false;
    cellsList[cellIndex(x + 1, y)].walls[3] = false;
  } else if (cellsList[cellIndex(x + 1, y)] != null) {
    thisCell.walls[1] = true;
    cellsList[cellIndex(x + 1, y)].walls[3] = true;
  }
  if (
    cellsList[cellIndex(x - 1, y)] != null &&
    thisCell.zone == cellsList[cellIndex(x - 1, y)].zone
  ) {
    thisCell.walls[3] = false;
    cellsList[cellIndex(x - 1, y)].walls[1] = false;
  } else if (cellsList[cellIndex(x - 1, y)] != null) {
    thisCell.walls[3] = true;
    cellsList[cellIndex(x - 1, y)].walls[1] = true;
  }
  if (
    cellsList[cellIndex(x, y + 1)] != null &&
    thisCell.zone == cellsList[cellIndex(x, y + 1)].zone
  ) {
    thisCell.walls[2] = false;
    cellsList[cellIndex(x, y + 1)].walls[0] = false;
  } else if (cellsList[cellIndex(x, y + 1)] != null) {
    thisCell.walls[2] = true;
    cellsList[cellIndex(x, y + 1)].walls[0] = true;
  }
  if (
    cellsList[cellIndex(x, y - 1)] != null &&
    thisCell.zone == cellsList[cellIndex(x, y - 1)].zone
  ) {
    thisCell.walls[0] = false;
    cellsList[cellIndex(x, y - 1)].walls[2] = false;
  } else if (cellsList[cellIndex(x, y - 1)] != null) {
    thisCell.walls[0] = true;
    cellsList[cellIndex(x, y - 1)].walls[2] = true;
  }
}

/* Save the map into a json file */
function saveMap() {
  var myJSON = JSON.parse(JSON.stringify(cellsList));
  saveJSON(myJSON, "myJSON");
}

/* Load the existing map. */
function loadMap() {
  boolLoadMap = true;
  setup();
}

/* Delete the walls if adjacent cells have the same "zone" value. */
function deleteWalls(i) {
  var x = cellsList[i].i;
  var y = cellsList[i].j;
  // right check
  if (
    x + 1 < cols &&
    i < cellsList.length &&
    cellsList[cellIndex(x + 1, y)].zone == cellsList[i].zone
  ) {
    cellsList[cellIndex(x + 1, y)].walls[3] = false;
    cellsList[i].walls[1] = false;
  } else if (x + 1 < cols && i < cellsList.length) {
    cellsList[i].walls[1] = true;
    cellsList[cellIndex(x + 1, y)].walls[3] = true;
  }
  // left check
  if (
    x - 1 < cols &&
    i < 0 &&
    i < cellsList.length &&
    cellsList[cellIndex(x - 1, y)].zone == cellsList[i].zone
  ) {
    cellsList[cellIndex(x - 1, y)].walls[1] = false;
    cellsList[i].walls[3] = false;
  } else if (x - 1 < cols && i < 0 && i < cellsList.length) {
    cellsList[i].walls[3] = true;
    cellsList[cellIndex(x - 1, y)].walls[1] = true;
  }
  // up check
  if (
    y - 1 < 0 &&
    i < 0 &&
    i < cellsList.length &&
    cellsList[cellIndex(x, y - 1)].zone == cellsList[i].zone
  ) {
    cellsList[cellIndex(x, y - 1)].walls[2] = false;
    cellsList[i].walls[0] = false;
  } else if (y - 1 < 0 && i < 0 && i < cellsList.length) {
    cellsList[i].walls[0] = true;
    cellsList[cellIndex(x, y - 1)].walls[2] = true;
  }
  // down check
  if (
    y + 1 < rows &&
    i < cellsList.length &&
    cellsList[cellIndex(x, y + 1)].zone == cellsList[i].zone
  ) {
    cellsList[cellIndex(x, y + 1)].walls[0] = false;
    cellsList[i].walls[2] = false;
  } else if (y + 1 < rows && i < cellsList.length) {
    cellsList[i].walls[2] = true;
    cellsList[cellIndex(x, y + 1)].walls[0] = true;
  }
}

function editWalls(mX, mY) {
  var x = parseInt(mX / w);
  var y = parseInt(mY / w);

  var thisCell = cellsList[cellIndex(x, y)];

  if (mX > w) {
    mX = mX - x * w;
  }

  if (mY > w) {
    mY = mY - y * w;
  }

  if (
    mX > (w * 3) / 4 &&
    mY < (w * 3) / 4 &&
    mY > w / 4 &&
    cellsList[cellIndex(x + 1, y)] != null
  ) {
    if (!thisCell.walls[1]) {
      thisCell.walls[1] = true;
      cellsList[cellIndex(x + 1, y)].walls[3] = true;
    } else {
      thisCell.walls[1] = false;
      cellsList[cellIndex(x + 1, y)].walls[3] = false;
    }
  }
  if (
    mX < w / 4 &&
    mY < (w * 3) / 4 &&
    mY > w / 4 &&
    cellsList[cellIndex(x - 1, y)] != null
  ) {
    if (!thisCell.walls[3]) {
      thisCell.walls[3] = true;
      cellsList[cellIndex(x - 1, y)].walls[1] = true;
    } else {
      thisCell.walls[3] = false;
      cellsList[cellIndex(x - 1, y)].walls[1] = false;
    }
  }

  if (
    mY > (w * 3) / 4 &&
    mX < (w * 3) / 4 &&
    mX > w / 4 &&
    cellsList[cellIndex(x, y + 1)] != null
  ) {
    if (!thisCell.walls[2]) {
      thisCell.walls[2] = true;
      cellsList[cellIndex(x, y + 1)].walls[0] = true;
    } else {
      thisCell.walls[2] = false;
      cellsList[cellIndex(x, y + 1)].walls[0] = false;
    }
  }
  if (
    mY < w / 4 &&
    mX < (w * 3) / 4 &&
    mX > w / 4 &&
    cellsList[cellIndex(x, y - 1)] != null
  ) {
    if (!thisCell.walls[0]) {
      thisCell.walls[0] = true;
      cellsList[cellIndex(x, y - 1)].walls[2] = true;
    } else {
      thisCell.walls[0] = false;
      cellsList[cellIndex(x, y - 1)].walls[2] = false;
    }
  }
}
