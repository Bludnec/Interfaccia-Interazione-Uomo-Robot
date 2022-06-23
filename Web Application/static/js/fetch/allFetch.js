async function getAllEntity() {
  let response = await fetch("get-all-entity");
  let data = await response.json();
  itemsList = [];
  for (var i = 0; i < data.length; i++) {
    var position = new Position(data[i].X, data[i].Y, data[i].Z);
    if (data[i].Id != null) {
      var entity = new Entity(
        data[i].Id,
        data[i].Name,
        data[i].Class,
        position
      );
      itemsList.push(entity);
    } else {
      agent = new Agent("robot", position);
    }
  }
}

async function getMap() {
  let response = await fetch("map");
  let data = await response.json();
  cellsList = [];
  for (var i = 0; i < data.length; i++) {
    var cell = new Cell(
      data[i].Id,
      data[i].X,
      data[i].Y,
      data[i].Zone,
      data[i].Walls
    );
    cellsList.push(cell);
  }
}

function insertMap(i, j) {
  fetch(`map`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      i: i,
      j: j,
    }),
  });
}

function deleteMap() {
  fetch("map", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

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

async function getCell(id) {
  let response = await fetch(`cell/${id}`);
  let data = await response.json();
  return data;
}

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

async function getCellInZone(zone) {
  let response = await fetch(`cell/zone/${zone}`);
  let data = await response.json();
  return data;
}

function insertAgent(x, y) {
  fetch(`agent`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x: x,
      y: y,
    }),
  });
}

function deleteAgent() {
  fetch("agent", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

function updateAgentPosition(x, y) {
  fetch("agent", {
    method: "PATCH",
    body: JSON.stringify({
      x: x,
      y: y,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function getAgent() {
  let response = await fetch("/agent");
  let data = await response.json();
  var position = new Position(data.X, data.Y, 0);
  agent = new Agent("robot", position);
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

async function getEntityAbility(id) {
  let response = await fetch(`entity/ability?id=${id}`);
  let data = await response.json();
  return data;
}

async function getClassAbility(entClass, ability) {
  let response = await fetch(
    `class/ability?entClass=${entClass}&ability=${ability}`
  );
  let data = await response.json();
  return data;
}

async function getEntityLefRef(id) {
  let response = await fetch(`entity/lexical_references?id=${id}`);
  let data = await response.json();
  return data;
}

async function getEntityWeight(id) {
  let response = await fetch(`entity/weight?id=${id}`);
  let data = await response.json();
  return data;
}

async function getEntitySize(id) {
  let response = await fetch(`entity/size?id=${id}`);
  let data = await response.json();
  return data;
}

async function getAllUrl() {
  let response = await fetch("get-all-url");
  let data = await response.json();
  return data;
}

function createUrlList(data) {
  let x = data;
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

async function getEntityOnTop(id) {
  let response = await fetch(`entity/on-top?id=${id}&pos=on-top`);
  let data = await response.json();
  return data;
}

async function getEntitySupport(id) {
  let response = await fetch(`entity/on-top?id=${id}&pos=support`);
  let data = await response.json();
  return data;
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

async function getEntityOnBottom(id) {
  let response = await fetch(`entity/on-bottom?id=${id}&pos=on-bottom`);
  let data = await response.json();
  return data;
}

async function getEntityCover(id) {
  let response = await fetch(`entity/on-bottom?id=${id}&pos=cover`);
  let data = await response.json();
  return data;
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

async function getEntityInside(id) {
  let response = await fetch(`entity/inside?id=${id}&pos=inside`);
  let data = await response.json();
  return data;
}

async function getEntityCover(id) {
  let response = await fetch(`entity/inside?id=${id}&pos=container`);
  let data = await response.json();
  return data;
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

async function getSpaceAvailable(id) {
  let response = await fetch(`entity/inside-space-available?id=${id}`);
  let data = await response.json();
  return data;
}

async function getEntityLexRefOnMap() {
  let response = await fetch("entity/lexical_references/all");
  let data = await response.json();
  return data;
}

async function getEntityAbilityOnMap() {
  let response = await fetch("entity/ability/all");
  let data = await response.json();
  abilityList = data;
}
