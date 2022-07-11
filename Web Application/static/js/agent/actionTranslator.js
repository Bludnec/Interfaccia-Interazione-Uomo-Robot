var output1 = {
  frames: [
    {
      name: "bringing",
      arguments: [
        {
          name: "theme",
          values: ["laptop0"],
        },
        {
          name: "goal",
          values: ["kitchen"],
        },
      ],
    },
  ],
};

function translator(output) {
  // Scansiono tutti i frame presenti dentro "framses"
  console.log(output);
  var infoAzione = {};
  var stringaOutput = "";
  for (var i = 0; i < output.frames.length; i++) {
    var azione = output.frames[i].name.toLowerCase();
    infoAzione.azione = azione;
    stringaOutput = stringaOutput + output.frames[i].name + "( ";
    for (var j = 0; j < output.frames[i].arguments.length; j++) {
      var name = output.frames[i].arguments[j].name.toLowerCase();
      var values;
      stringaOutput = stringaOutput + output.frames[i].arguments[j].name + "(";
      if (map1.get(output.frames[i].arguments[j].values[0]) != undefined) {
        values = map1.get(output.frames[i].arguments[j].values[0]);
      } else {
        values = output.frames[i].arguments[j].values[0];
      }
      stringaOutput = stringaOutput + values + ") ";
      infoAzione[name] = values;
    }
  }
  stringaOutput = stringaOutput + ")";
  document.getElementById("output-text").innerHTML = stringaOutput;
  cellPath.push([infoAzione.azione, infoAzione]);
}
