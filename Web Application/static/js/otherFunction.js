var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", lexicalMap);

function lexicalMap() {
  var inputText = document.getElementById("input-text").value;
  var listInputText = inputText.split(" ");

  // data = [[id,List[...]], [id,List[...]], [id,List[...]]]
  getEntityLexRefOnMap().then((data) => {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i][1]["List"].length; j++) {
        console.log(data[i][1]["List"][j]);
        // controllo le relazioni tra lexical reference entità istanziate e parole
        // nell'input text
        for (var k = 0; k < listInputText.length; k++) {
          console.log(listInputText[k]);
        }
      }
    }
  });
}
