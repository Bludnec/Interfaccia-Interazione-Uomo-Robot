// POST
function insertCell(id, x, y, zone, walls) {
  var json_arr = {};
  json_arr["id"] = str(id);
  json_arr["x"] = str(x);
  json_arr["y"] = str(y);
  json_arr["zone"] = zone;
  json_arr["walls"] = walls;

  var json_string = JSON.stringify(json_arr);
  fetch(`cell`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: json_string,
  });
}

// GET
async function getCell(id) {
  let response = await fetch(`cell/${id}`);
  let data = await response.json();
  return data;
}

// DELETE
function deleteCell(id) {
  fetch("cell", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
}

// PATCH
function updateCell(id, x, y, zone, walls) {
  fetch("cell", {
    method: "PATCH",
    body: JSON.stringify({
      id: id,
      x: x,
      y: y,
      zone: zone,
      walls: walls,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
