function translator(output) {
  // Scansiono tutti i frame presenti dentro "framses"
  console.log(output);
  var infoAzione = {};
  for (var i = 0; i < output.frames.length; i++) {
    var azione = output.frames[i].name;
    infoAzione.azione = azione;
    for (var j = 0; j < output.frames[i].arguments.length; j++) {
      var name = output.frames[i].arguments[j].name;
      var values = output.frames[i].arguments[j].values[0];

      infoAzione[name] = values;
    }
  }
  cellPath.push([infoAzione.azione, infoAzione]);
}
