// Get the form and file field
let form = document.querySelector('#upload');
let file = document.querySelector('#file');

/**
 * Log the uploaded file to the console
 * @param {event} Event The file loaded event
 */
function logFile(event) {
  let str = event.target.result;
  let json = JSON.parse(str);
  //console.log('string', str);
  //console.log('json', json);
  caricaMappaSalvata(json);
}

/**
 * Handle submit events
 * @param  {Event} event The event object
 */
function handleSubmit(event) {
  // Stop the form from reloading the page
  event.preventDefault();

  // If there's no file, do nothing
  if (!file.value.length) return;

  // Create a new FileReader() object
  let reader = new FileReader();

  // Setup the callback event to run when the file is read
  reader.onload = logFile;

  // Read the file
  reader.readAsText(file.files[0]);
}

// Listen for submit events
form.addEventListener('submit', handleSubmit);

document.getElementById('download-btn').addEventListener('click', () => {
  getInfoDownload().then((data) => {
    let name = $("#text_area_salva_mappa").val()
    if (name == "" || name == undefined) {
      name = "map"
    }
    download(JSON.stringify(data), name + '.json', 'application/json');
  });
});


function caricaMappaSalvata(json) {
  var maxX = 0;
  var maxY = 0;
  for (var i = 0; i < json['cellList'].length; i++) {
    if (maxX < json['cellList'][i]['X']) {
      maxX = json['cellList'][i]['X'];
    }
  }
  for (var i = 0; i < json['cellList'].length; i++) {
    if (maxY < json['cellList'][i]['Y']) {
      maxY = json['cellList'][i]['Y'];
    }
  }
  maxX += 1;
  maxY += 1;
  document.getElementById('map-height').value = maxY;
  document.getElementById('map-width').value = maxX;
  rows = document.getElementById('map-height').value;
  cols = document.getElementById('map-width').value;

  var canvas = createCanvas(cols * w, rows * w);
  canvas.parent('canvas-zone');

  setTimeout(function () {
    postInfoUpload(json);
  }, 100);
  reloadInfoMap(100);
}