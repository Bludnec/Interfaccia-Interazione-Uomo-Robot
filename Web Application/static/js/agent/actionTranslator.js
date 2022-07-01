var output = {
  frames: [
    {
      name: "RELEASING",
      arguments: [
        {
          name: "GOAL",
          value: "plate0",
        },
        {
          name: "LOCATION_OF_CONFINEMENT",
          value: "key0",
        },
      ],
    },
  ],
};

function translator(output) {
  // Scansiono tutti i frame presenti dentro "framses"
  var infoAzione = {};
  for (var i = 0; i < output.frames.length; i++) {
    var azione = output.frames[i].name;
    infoAzione.azione = azione;
    for (var j = 0; j < output.frames[i].arguments.length; j++) {
      var name = output.frames[i].arguments[j].name;
      var value = output.frames[i].arguments[j].value;

      infoAzione[name] = value;
    }
  }
  cellPath.push([infoAzione.azione, infoAzione]);
}
