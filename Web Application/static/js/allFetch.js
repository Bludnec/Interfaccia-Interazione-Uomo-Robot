function getAllElement() {
  var lista;
  fetch("/get-all-element")
    .then((response) => response.json())
    .then((data) => (lista = data));
  return lista;
}
