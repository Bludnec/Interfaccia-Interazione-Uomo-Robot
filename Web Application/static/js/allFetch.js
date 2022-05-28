function getAllEntity() {
  fetch("get-all-entity")
    .then((jsonData) => jsonData.json())
    .then((data) => {
      createEl(data);
    });
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
  }).then((response) => {
    console.log(response);
  });
}

function getEntity(id) {
  fetch(`entity?id=${id}`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

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
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function updateEntityPosition(id, x, y, z) {
  fetch("/entity", {
    method: "PATCH",
    body: JSON.stringify({
      id: id,
      x: x,
      y: y,
      z: z,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
