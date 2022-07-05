var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", inputGenerator);

// se mi viene restituito z2 vuol dire che la stanza presa in questione è quella in
// listOfZone[2]
var listOfZone = [];

var map1 = new Map();

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
    map = [];
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
    for (var i = 0; i < data[1].length; i++) {
      for (var k = 0; k < listInputText.length; k++) {
        if (listInputText[k] == data[1][i][0]) {
          var zona = {
            name: data[1][i][0],
            class: data[1][i][0],
            position: {
              X: data[1][i][2].X,
              Y: data[1][i][2].Y,
              Z: "0",
            },
            properties: [{ name: "walkable_ability", value: "true" }],
            lexical_references: data[1][i][1],
          };
          inputText.entities.push(zona);
        }
      }
    }

    for (var i = 0; i < entitySelected.length; i++) {
      map1.set(
        entitySelected[i][0].charAt(0) +
          entitySelected[i][0].charAt(entitySelected[i][0].length - 1),
        entitySelected[i][0]
      );
      map1.set(
        entitySelected[i][0],
        entitySelected[i][0].charAt(0) +
          entitySelected[i][0].charAt(entitySelected[i][0].length - 1)
      );
      var entity = {
        name: map1.get(entitySelected[i][0]),
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
              for (var q = 0; q < physicalStatusList.length; q++) {
                if (physicalStatusList[q].Id == entitySelected[i][0]) {
                  prop = {
                    name: abilityList[j][k],
                    value: physicalStatusList[q].Status,
                  };
                }
              }
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

    getOutputText(inputText);
  });

  //translator(output);
}
