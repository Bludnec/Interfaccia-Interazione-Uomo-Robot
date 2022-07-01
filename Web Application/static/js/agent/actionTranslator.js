var output = {
  frames: [
    {
      name: "BRINGING",
      arguments: [
        {
          name: "BENEFICIARY",
          value: "p1",
        },
        {
          name: "THEME",
          value: "l1",
        },
        {
          name: "SOURCE",
          value: "c1",
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
  console.log(infoAzione);
}

translator(output);
