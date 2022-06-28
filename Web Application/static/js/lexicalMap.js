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
    console.log("data: ", data);
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
    lexMapString = lexMapString + " # ";
    /**
     * Relazione tra entità: ON TOP
     */
    for (var i = 0; i < entityLexMap.length; i++) {
      for (var j = 0; j < positioningList[0].length; j++) {
        if (entityLexMap[i] == positioningList[0][j][0]) {
          var found = entityLexMap.find(
            (element) => element == positioningList[0][j][0]
          );
          if (
            found != undefined &&
            !lexMapString.includes(
              positioningList[0][j][0] +
                " ON TOP " +
                positioningList[0][j][1] +
                " | "
            )
          ) {
            lexMapString =
              lexMapString +
              positioningList[0][j][0] +
              " ON TOP " +
              positioningList[0][j][1] +
              " | ";
          }
        }
        if (entityLexMap[i] == positioningList[0][j][1]) {
          var found = entityLexMap.find(
            (element) => element == positioningList[0][j][1]
          );
          if (
            found != undefined &&
            !lexMapString.includes(
              positioningList[0][j][0] +
                " ON TOP " +
                positioningList[0][j][1] +
                " | "
            )
          ) {
            lexMapString =
              lexMapString +
              positioningList[0][j][0] +
              " ON TOP " +
              positioningList[0][j][1] +
              " | ";
          }
        }
      }
    }
    /**
     * Relazione tra entità: ON BOTTOM
     */
    for (var i = 0; i < entityLexMap.length; i++) {
      for (var j = 0; j < positioningList[1].length; j++) {
        if (entityLexMap[i] == positioningList[1][j][0]) {
          var found = entityLexMap.find(
            (element) => element == positioningList[1][j][0]
          );
          if (
            found != undefined &&
            !lexMapString.includes(
              positioningList[1][j][0] +
                " ON BOTTOM " +
                positioningList[1][j][1] +
                " | "
            )
          ) {
            lexMapString =
              lexMapString +
              positioningList[1][j][0] +
              " ON BOTTOM " +
              positioningList[1][j][1] +
              " | ";
          }
        }
        if (entityLexMap[i] == positioningList[1][j][1]) {
          var found = entityLexMap.find(
            (element) => element == positioningList[1][j][1]
          );
          if (
            found != undefined &&
            !lexMapString.includes(
              positioningList[1][j][0] +
                " ON BOTTOM " +
                positioningList[1][j][1] +
                " | "
            )
          ) {
            lexMapString =
              lexMapString +
              positioningList[1][j][0] +
              " ON BOTTOM " +
              positioningList[1][j][1] +
              " | ";
          }
        }
      }
    }
    /**
     * Relazione tra entità: INSIDE
     */
    for (var i = 0; i < entityLexMap.length; i++) {
      for (var j = 0; j < positioningList[2].length; j++) {
        if (entityLexMap[i] == positioningList[2][j][0]) {
          var found = entityLexMap.find(
            (element) => element == positioningList[2][j][0]
          );
          if (
            found != undefined &&
            !lexMapString.includes(
              lexMapString +
                positioningList[2][j][0] +
                " INSIDE " +
                positioningList[2][j][1] +
                " | "
            )
          ) {
            lexMapString =
              lexMapString +
              positioningList[2][j][0] +
              " INSIDE " +
              positioningList[2][j][1] +
              " | ";
          }
        }
        if (entityLexMap[i] == positioningList[2][j][1]) {
          var found = entityLexMap.find(
            (element) => element == positioningList[2][j][1]
          );
          if (
            (found != undefined) &
            !lexMapString.includes(
              lexMapString +
                positioningList[2][j][0] +
                " INSIDE " +
                positioningList[2][j][1] +
                " | "
            )
          ) {
            lexMapString =
              lexMapString +
              positioningList[2][j][0] +
              " INSIDE " +
              positioningList[2][j][1] +
              " | ";
          }
        }
      }
    }
    /**
     * Relazione tra entità: NEAR / FAR
     * Oggetti vicini se distanza < 2 celle
     *
     * Creo una lista (entityInfoList) di Entity in base agli id in entityLexMap
     * per poi controllare la loro vicinanza
     */
    var entityInfoList = [];

    for (var i = 0; i < entityLexMap.length; i++) {
      for (var j = 0; j < itemsList.length; j++) {
        if (entityLexMap[i] == itemsList[j].id) {
          entityInfoList.push(itemsList[j]);
        }
      }
    }

    console.log(positioningList.length);
    // non funziona il confronto
    for (var i = 0; i < entityInfoList.length; i++) {
      for (var k = 0; k < positioningList[k].length; k++) {
        console.log(
          entityInfoList[i].id,
          positioningList[k][0],
          positioningList[k][1]
        );
        if (
          entityInfoList[i].id == positioningList[k][0] ||
          entityInfoList[i].id == positioningList[k][1]
        ) {
          console.log("splice");
          entityInfoList.splice(i, 1);
        }
      }
    }
    // ----

    console.log(entityInfoList);

    for (var i = 0; i < entityInfoList.length; i++) {
      for (var j = i + 1; j < entityInfoList.length; j++) {
        var x1 = entityInfoList[i].position.x;
        var x2 = entityInfoList[j].position.x;
        var y1 = entityInfoList[i].position.y;
        var y2 = entityInfoList[j].position.y;
        var distanza = Math.sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));
        if (distanza < 2) {
          lexMapString =
            lexMapString +
            entityInfoList[i].id +
            " NEAR " +
            entityInfoList[j].id +
            " ";
        }
      }
    }

    if (lexMapString == " # ") {
      lexMapString = "#NOMAP";
    }
    console.log(lexMapString);
  });

  //agent.motion(inputText);
}
