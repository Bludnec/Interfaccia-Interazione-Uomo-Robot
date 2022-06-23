var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", lexicalMap);

var k0, k1, k2, k3, k4, k5, k6;

function lexicalMap() {
  var inputText = document.getElementById("input-text").value;
  var listInputText = inputText.split(" ");
  var lexMapString = "";
  var counter = 0;
  var zoneMap;

  // data = [[id,List[...]], [id,List[...]], [id,List[...]]]
  getLexicalMap().then((data) => {
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
        for (var j = 1; j < cellLenght; j++) {
          console.log(data[i][j]);
        }
      }
    }
    console.log(k0);
    console.log(lexMapString);
  });
}
