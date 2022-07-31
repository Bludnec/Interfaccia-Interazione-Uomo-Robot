// GET
async function getEntity(id) {
  let response = await fetch(`entity?id=${id}`);
  let data = await response.json();
  return data;
}

/**
 * Funzione per inserire l'entità nella base di conoscenza (FETCH)
 * @param {String} id
 * @param {String} name
 * @param {String} classe
 * @param {int} x
 * @param {int} y
 * @param {int} z
 * @param {int} sizeX
 * @param {int} sizeY
 */
function insertEntity(id, name, classe, x, y, z, sizeX, sizeY) {
  var json_arr = {};
  json_arr["id"] = id;
  json_arr["name"] = name;
  json_arr["class"] = classe;
  json_arr["x"] = str(x);
  json_arr["y"] = str(y);
  json_arr["z"] = str(z);
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
  })
    .then((response) => response.json())
    .then((data) => {
      if (data != "true") {
        alert(data);
      }
    });
}

/**
 * Funzione per cancellare l'entità dalla base di conoscenza. (FETCH)
 * @param {String} id id dell'entità da cancellare.
 */
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

function deleteEntities(listId) {
  fetch("/entities", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      listId: listId,
    }),
  });
}

////////////////////////////
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

async function getEntityStatus(id) {
  let response = await fetch(`entity/status?id=${id}`);
  let data = await response.json();
  return data;
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
