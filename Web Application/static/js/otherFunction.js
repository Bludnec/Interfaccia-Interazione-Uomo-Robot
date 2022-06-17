var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", lexicalMap);

function lexicalMap() {
  var inputText = document.getElementById("input-text").value;
  var listInputText = inputText.split(" ");
  for (var i = 0; i < listInputText.length; i++) {
    getEntityLexRefOnMap().then((data) => {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
      }
    });
  }
}
