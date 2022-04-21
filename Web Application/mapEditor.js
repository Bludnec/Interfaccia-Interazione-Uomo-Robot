document.getElementById("save-map-button").addEventListener("click", saveMap);
document.getElementById("load-map-button").addEventListener("click", loadMap);

/* Color the cells of map and assign the value to "zone". */
function colorCellMap(x, y) {
  if (document.getElementById("zone").value == "") {
    alert("Inserire nome zona");
  } else {
    cellsList[cellIndex(x, y)].zone = document.getElementById("zone").value;
    cellsList[cellIndex(x, y)].cellColor =
      document.getElementById("cell-color").value;
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
