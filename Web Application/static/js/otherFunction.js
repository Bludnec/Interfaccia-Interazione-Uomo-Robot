var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", lexicalMap);

var kit;

function lexicalMap() {
  var inputText = document.getElementById("input-text").value;
  var listInputText = inputText.split(" ");
  var lexMapString = "";
  var zoneMap;

  // data = [[id,List[...]], [id,List[...]], [id,List[...]]]
  getLexicalMap().then((data) => {
    var dataLengt = data.length;
    for (var i = 0; i < data.length - 1; i++) {
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
    }
    console.log(data[dataLengt - 1]);
    console.log(lexMapString);
  });
}
