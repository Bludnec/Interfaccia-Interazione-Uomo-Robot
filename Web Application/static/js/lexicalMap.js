var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", lexicalMap);

// se mi viene restituito z2 vuol dire che la stanza presa in questione è quella in
// listOfZone[2]
var listOfZone = [];

function lexicalMap() {
  var inputText = document.getElementById("input-text").value;
  var listInputText = inputText.split(" ");
  var lexMapString = ""; // Stringa della Lexical Map
  var entityLexMap = []; // Lista degli id dell'entità citate nell'input text
  var counter = 0;

  getLexicalMap().then((data) => {
    listOfZone = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i][1]["List"] != null) {
        for (var j = 0; j < data[i][1]["List"].length; j++) {
          // controllo le relazioni tra lexical reference entità istanziate e parole
          // nell'input text
          for (var k = 0; k < listInputText.length; k++) {
            if (listInputText[k] == data[i][1]["List"][j]) {
              entityLexMap.push(data[i][0]);
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
    // relazioni tra entità
    lexMapString = lexMapString + " # ";

    for (var i = 0; i < entityLexMap.length; i++) {
      for (var j = 0; j < positioningList[0].length; j++) {
        if (entityLexMap[i] == positioningList[0][j][0]) {
          var found = entityLexMap.find(
            (element) => element == positioningList[0][j][0]
          );
          if (found != undefined) {
            console.log(positioningList[0][j][0], positioningList[0][j][1]);
            lexMapString =
              lexMapString +
              positioningList[0][j][0] +
              " ON TOP " +
              positioningList[0][j][1];
          }
        }
        if (entityLexMap[i] == positioningList[0][j][1]) {
          var found = entityLexMap.find(
            (element) => element == positioningList[0][j][1]
          );
          if (found != undefined) {
            lexMapString =
              lexMapString +
              positioningList[0][j][0] +
              " ON TOP " +
              positioningList[0][j][1];
          }
        }
      }
    }

    console.log(lexMapString);
  });
}
