async function getAllEntity() {
  let response = await fetch("get-all-entity");
  let data = await response.json();
  itemsList = [];
  for (var i = 0; i < data.length; i++) {
    var position = new Position(data[i].X, data[i].Y, data[i].Z);
    var entity = new Entity(data[i].Id, data[i].Name, data[i].Class, position);
    itemsList.push(entity);
  }
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
  fetch(`entity`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: json_string,
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
  });
}

function updateEntityPosition(id, x, y, z) {
  fetch("entity", {
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

function getEntityStatus(id) {
  fetch(`entity/status?id=${id}`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

function insertEntityStatus(id, status, statusBool) {
  fetch(`entity/status`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      status: status,
      statusBool: statusBool,
    }),
  });
}

function deleteEntityStatus(id) {
  fetch("entity/status", {
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

function updateEntityStatus(id, statusBool) {
  fetch("entity/status", {
    method: "PATCH",
    body: JSON.stringify({
      id: id,
      statusBool: statusBool,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

function getEntityAbility(id) {
  fetch(`entity/ability?id=${id}`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
    });
}

function getEntityLefRef(id) {
  fetch(`entity/lexical_references?id=${id}`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

function getEntityWeight(id) {
  fetch(`entity/weight?id=${id}`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
    });
}

async function getAllUrl() {
  let response = await fetch("get-all-url");
  let data = await response.json();
  return data;
}
function createUrlList(data) {
  let x = data;
  console.log(x);
  return x;
}

function insertOnTop(idOnTop, idSupport) {
  fetch(`entity/on-top`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idOnTop: idOnTop,
      idSupport: idSupport,
    }),
  });
}

function getEntityOnTop(id) {
  fetch(`entity/on-top?id=${id}&pos=on-top`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

function getEntitySupport(id) {
  fetch(`entity/on-top?id=${id}&pos=support`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

function deleteOnTop(id1, id2) {
  fetch("entity/on-top", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id1: id1,
      id2: id2,
    }),
  });
}

function insertOnBottom(idOnBottom, idTop) {
  fetch(`entity/on-bottom`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idOnBottom: idOnBottom,
      idTop: idTop,
    }),
  });
}

function getEntityOnBottom(id) {
  fetch(`entity/on-bottom?id=${id}&pos=on-bottom`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

function getEntityCover(id) {
  fetch(`entity/on-bottom?id=${id}&pos=cover`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

function deleteOnBottom(id1, id2) {
  fetch("entity/on-bottom", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id1: id1,
      id2: id2,
    }),
  });
}

function insertInside(idInside, idContainer) {
  fetch(`entity/inside`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idInside: idInside,
      idContainer: idContainer,
    }),
  });
}

function getEntityInside(id) {
  fetch(`entity/inside?id=${id}&pos=inside`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

function getEntityCover(id) {
  fetch(`entity/inside?id=${id}&pos=container`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}

function deleteInside(id1, id2) {
  fetch("entity/inside", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id1: id1,
      id2: id2,
    }),
  });
}

function getSpaceAvailable(id) {
  fetch(`entity/inside-space-available?id=${id}`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      console.log(data);
      // do something with the data
    });
}
