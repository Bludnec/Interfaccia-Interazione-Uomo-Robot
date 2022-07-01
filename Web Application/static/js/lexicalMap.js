var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", lexicalMap);

// se mi viene restituito z2 vuol dire che la stanza presa in questione è quella in
// listOfZone[2]
var listOfZone = [];

function lexicalMap() {
  var inputText = {};
  var sentence = document.getElementById("input-text").value;
  inputText.sentence = sentence;
  var language = "english";
  inputText.language = language;
  var entities = [];
  inputText.entities = entities;
  //var entity = { name,class,position,properties,lexical_references};

  var listInputText = document.getElementById("input-text").value.split(" ");
  var entitySelected = [];

  getLexicalMap().then((data) => {
    /**
     * data = [[],[]]
     * prima lista di elementi = [[id, classe,,x,y lista delle lex_ref],[...]]
     * seconda lista delle zone = [[nomeZona,  lista delle celle appartenenti alla stessa zona], [...]]
     */
    console.log(data);

    for (var i = 0; i < data[0].length; i++) {
      for (var j = 0; j < data[0][i][5]["List"].length; j++) {
        for (var k = 0; k < listInputText.length; k++) {
          if (listInputText[k] == data[0][i][5]["List"][j]) {
            entitySelected.push(data[0][i]);
          }
        }
      }
    }

    console.log(entitySelected);
    // TO DO: CAMBIARE I FOR SOTTO, PRENDERE LE INFO NON DA DATA MA ENTITY SELECTED
    /**
     * Fare il confronto sentence e entità nella mappa e
     * fare lo data[0].splice delle informazioni che non ci servono
     */
    for (var i = 0; i < data[0].length; i++) {
      var entity = {
        name: data[0][i][0],
        class: data[0][i][1],
        position: {
          x: data[0][i][2],
          y: data[0][i][3],
          z: data[0][i][4],
        },
        properties: "",
        lexical_references: data[0][i][5]["List"],
      };
      inputText.entities.push(entity);
    }

    console.log(JSON.stringify(inputText));
  });

  /*
  console.log(test);
  agent.motion(test);*/
  //var test = { Theme: inputText };
  //agent.taking(test);
}
