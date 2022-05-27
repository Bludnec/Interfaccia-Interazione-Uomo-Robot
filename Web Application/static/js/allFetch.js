async function getAllEntity() {
  await fetch("get-all-entity")
    .then((jsonData) => jsonData.json())
    .then((data) => createEl(data));
}

function createEl(data) {
  itemsList = [];
  for (var i = 0; i < data.length; i++) {
    var position = new Position(data[i].X, data[i].Y, data[i].Z);
    var entity = new Entity(data[i].Id, data[i].Name, data[i].Class, position);
    itemsList.push(entity);
  }
  console.log(itemsList);
}

// Funzione per l'inserimento di una nuova entità nel KB
function insertEntity(id, name, classe, x, y, z, size, sizeX, sizeY) {
  var json_arr = {};

  json_arr["id"] = id;
  json_arr["name"] = name;
  json_arr["class"] = classe;

  json_arr["x"] = str(x);
  json_arr["y"] = str(y);
  json_arr["z"] = str(z);

  json_arr["size"] = size;

  json_arr["sizeX"] = str(sizeX);
  json_arr["sizeY"] = str(sizeY);

  var json_string = JSON.stringify(json_arr);
  fetch("/entity", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: json_string,
  }).then((response) => {});
}

function getEntity(id) {}

function deleteEntity(id) {
  fetch("/entity", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  }).then((response) => {});
}
