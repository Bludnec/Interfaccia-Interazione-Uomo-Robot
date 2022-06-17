var translateButton = document
  .getElementById("translate-button")
  .addEventListener("click", lexicalMap);

function lexicalMap() {
  var inputText = document.getElementById("input-text").value;
  var listInputText = inputText.split(" ");
  console.log(listInputText);
}
