var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", lexicalMap);

// se mi viene restituito z2 vuol dire che la stanza presa in questione è quella in
// listOfZone[2]
var listOfZone = [];

function lexicalMap() {
  var inputText = document.getElementById("input-text").value;
  var listInputText = inputText.split(" ");
  var lexMapString = "";
  var counter = 0;

  getLexicalMap().then((data) => {
    listOfZone = [];
    var dataLengt = data.length;
    for (var i = 0; i < data.length; i++) {
      if (data[i][1]["List"] != null) {
        for (var j = 0; j < data[i][1]["List"].length; j++) {
          // controllo le relazioni tra lexical reference entità istanziate e parole
          // nell'input text
          for (var k = 0; k < listInputText.length; k++) {
            if (listInputText[k] == data[i][1]["List"][j]) {
              if (lexMapString.length > 0) {
                lexMapString = lexMapString + "|";
              }
              lexMapString =
                lexMapString +
                data[i][1]["List"][0] +
                "|" +
                data[i][1]["List"][0].toUpperCase() +
                "|" +
                data[i][0];
            }
          }
        }
      } else {
        // codice per il riconoscimento delle stanze stanze
        var cellLenght = data[i].length;
        var app = [];
        for (var j = 1; j < cellLenght; j++) {
          app.push(data[i][j]);
        }
        listOfZone.push(app);
        counter++;

        for (var k = 0; k < listInputText.length; k++) {
          if (listInputText[k] == data[i][0]) {
            if (lexMapString.length > 0) {
              lexMapString = lexMapString + "|";
            }
            lexMapString =
              lexMapString +
              data[i][0] +
              "|" +
              data[i][0].toUpperCase() +
              "|" +
              "z" +
              counter;
          }
        }
      }
    }
    console.log(lexMapString);
  });
}
