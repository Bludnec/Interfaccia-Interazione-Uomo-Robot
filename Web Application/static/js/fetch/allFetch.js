async function getAllEntity() {
  let response = await fetch('get-all-entity');
  let data = await response.json();
  itemsList = [];
  if (data[0] != undefined && data[1] != undefined) {
    data[0].sort(function (a, b) {
      return a.id - b.id;
    });
    data[1].sort(function (a, b) {
      return a.id - b.id;
    });
  }

  if (!(data.length == 0)) {
    for (var i = 0; i < data[0].length; i++) {
      var position = new Position(data[0][i].X, data[0][i].Y, data[0][i].Z);

      if (data[0][i].Id != null) {
        var entity = new Entity(
          data[0][i].Id,
          data[0][i].Name,
          data[0][i].Class,
          position,
          data[1][i].SizeX,
          data[1][i].SizeY
        );
        for (var k = 0; k < powerStatusList.length; k++) {
          if (powerStatusList[k].Id == data[0][i].Id) {
            entity.status = powerStatusList[k].Status;
          }
        }
        for (var k = 0; k < physicalStatusList.length; k++) {
          if (physicalStatusList[k].Id == data[0][i].Id) {
            entity.status = physicalStatusList[k].Status;
          }
        }
        sX = data[1][i].SizeX - 1;
        sY = data[1][i].SizeY - 1;
        /**
         * Verifico se l'entità è più grande di una cella,
         * allora metto la variabile occupied delle
         * celle che occupa = id dell'entità.
         */

        while (sX > 0) {
          insertCellOccupied(data[0][i].X + sX, data[0][i].Y, data[0][i].Id);
          sX--;
        }
        while (sY > 0) {
          insertCellOccupied(data[0][i].X, data[0][i].Y + sY, data[0][i].Id);
          sY--;
        }
        entity = itemsList.push(entity);
      } else {
        agent = new Agent('robot', position);
      }
    }
  }
}

function deleteAllEntity() {
  fetch('/delete-all-entity', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function insertCellOccupied(x, y, id) {
  fetch(`/cell-occupied`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x: x,
      y: y,
      id: id,
    }),
  });
}

function deleteCellOccupied(id) {
  fetch('/cell-occupied', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  });
}
async function getMap() {
  let response = await fetch('map');
  let data = await response.json();
  cellsList = [];
  for (var i = 0; i < data[0].length; i++) {
    var cell = new Cell(
      data[0][i].Id,
      data[0][i].X,
      data[0][i].Y,
      data[0][i].Zone,
      data[0][i].Walls
    );
    cellsList.push(cell);
  }
  /**
   * All'update di una cella (es. cambio di zone) l'ordine viene
   * sballato perché c'è un retract + assertz, quindi la nuova
   * cella viene messa in fondo -> riordino cellsList in base all'id
   * per avere un cellIndex giusto.
   */
  cellsList.sort(function (a, b) {
    return a.id - b.id;
  });
  /**
   * Controlla la lista delle celle occupate e cambia il valore
   * di cell.occupied con l'id dell'entità che la occupa.
   */
  for (var i = 0; i < data[1].length; i++) {
    cellsList[cellIndex(data[1][i].X, data[1][i].Y)].occupied = data[1][i].Id;
  }
  cellsList.sort(function (a, b) {
    return a.id - b.id;
  });
}

function insertMap(i, j) {
  fetch(`map`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      i: i,
      j: j,
    }),
  });
}

function deleteMap() {
  fetch('map', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x: x,
      y: y,
    }),
  });
}

function deleteAgent() {
  fetch('agent', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

function updateAgentPosition(x, y) {
  fetch('agent', {
    method: 'PATCH',
    body: JSON.stringify({
      x: x,
      y: y,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}

async function getAgent() {
  let response = await fetch('/agent');
  let data = await response.json();
  var position = new Position(data.X, data.Y, 0);
  agent = new Agent('robot', position);
}

async function getAllUrl() {
  let response = await fetch('get-all-url');
  let data = await response.json();
  return data;
}

function insertOnTop(idOnTop, idSupport) {
  fetch(`entity/on-top`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
  fetch('entity/on-top', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id1: id1,
      id2: id2,
    }),
  });
}

function insertOnBottom(idOnBottom, idTop) {
  fetch(`entity/on-bottom`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
  fetch('entity/on-bottom', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id1: id1,
      id2: id2,
    }),
  });
}

function insertInside(idInside, idContainer) {
  fetch(`entity/inside`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
  fetch('entity/inside', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

async function getLexicalMap() {
  let response = await fetch(`lexical-map`);
  let data = await response.json();
  return data;
}

async function getEntityAbilityOnMap() {
  let response = await fetch('entity/ability/all');
  let data = await response.json();
  abilityList = data;
}

async function getEntityPositioningOnMap() {
  let response = await fetch('entity/positioning');
  let data = await response.json();
  positioningList = data;
}

async function getEntityStatusOnMap() {
  let response = await fetch('entity/status/all');
  let data = await response.json();
  powerStatusList = data[0];
  physicalStatusList = data[1];
}

function getOutputText(JSONinput) {
  var myHeaders = new Headers();
  myHeaders.set(
    'Authorization',
    'Basic ' + btoa('utente_colavecchi:colavecchiTESI2022')
  );
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Access-Control-Allow-Origin', '0.0.0.0');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(JSONinput),
  };

  fetch(
    'http://sag.art.uniroma2.it/transformers_backend/get_srl',
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      translator(result);
    })
    .catch((error) => console.log('error', error));
}

function deletePositioning(id) {
  fetch('delete-positioning', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  });
}

async function getInfoDownload() {
  let response = await fetch('/info/download-upload');
  let data = await response.json();
  return data;
}

function postInfoUpload(info) {
  fetch(`/info/download-upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: info,
    }),
  });
}

function sendConstructor(info) {
  console.log(info);
  fetch('/dataset-constructor', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      info: info
    }),
  });
}
