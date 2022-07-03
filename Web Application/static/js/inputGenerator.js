var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", inputGenerator);

// se mi viene restituito z2 vuol dire che la stanza presa in questione è quella in
// listOfZone[2]
var listOfZone = [];

function inputGenerator() {
  var inputText = {};
  var sentence = document.getElementById("input-text").value;
  inputText.sentence = sentence;
  var language = "english";
  inputText.language = language;
  var entities = [];
  inputText.entities = entities;

  var listInputText = document.getElementById("input-text").value.split(" ");
  var entitySelected = [];

  getLexicalMap().then((data) => {
    console.log(data);
    /* data = [[],[]]
     * prima lista di elementi = [[id, classe,x,y lista delle lex_ref],[...]]
     * seconda lista delle zone = [[nomeZona,  lista delle celle appartenenti alla stessa zona], [...]]
     */
    for (var i = 0; i < data[0].length; i++) {
      for (var j = 0; j < data[0][i][5]["List"].length; j++) {
        for (var k = 0; k < listInputText.length; k++) {
          if (listInputText[k] == data[0][i][5]["List"][j]) {
            entitySelected.push(data[0][i]);
          }
        }
      }
    }

    for (var i = 0; i < entitySelected.length; i++) {
      var entity = {
        name: entitySelected[i][0],
        class: entitySelected[i][1],
        position: {
          x: entitySelected[i][2],
          y: entitySelected[i][3],
          z: entitySelected[i][4],
        },
        properties: [],
        lexical_references: entitySelected[i][5]["List"],
      };
      for (var j = 0; j < abilityList.length; j++) {
        if (entitySelected[i][0] == abilityList[j][0]) {
          for (var k = 1; k < abilityList[j].length; k++) {
            var prop;
            if (abilityList[j][k] == "power_status_ability") {
              for (var q = 0; q < powerStatusList.length; q++) {
                if (powerStatusList[q].Id == entitySelected[i][0]) {
                  prop = {
                    name: abilityList[j][k],
                    value: powerStatusList[q].Status,
                  };
                }
              }
            } else if (abilityList[j][k] == "physical_status_ability") {
              // AGGIUNGERE CONTROLLO PHYSICAL STATUS
            } else {
              prop = {
                name: abilityList[j][k],
                value: "true",
              };
            }
            entity.properties.push(prop);
          }
        }
      }
      inputText.entities.push(entity);
    }

    console.log(JSON.stringify(inputText));
  });

  translator(output);
}
