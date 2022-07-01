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
    /* data = [[],[]]
     * prima lista di elementi = [[id, classe,,x,y lista delle lex_ref],[...]]
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

    /**
     * Fare il confronto sentence e entità nella mappa e
     * fare lo data[0].splice delle informazioni che non ci servono
     * ovvero quelle citate nella sentence.
     */
    for (var i = 0; i < entitySelected.length; i++) {
      var entity = {
        name: entitySelected[i][0],
        class: entitySelected[i][1],
        position: {
          x: entitySelected[i][2],
          y: entitySelected[i][3],
          z: entitySelected[i][4],
        },
        properties: "",
        lexical_references: entitySelected[i][5]["List"],
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
