function createEl(data) {
  itemsList = [];
  for (var i = 0; i < data.length; i++) {
    var position = new Position(data[i].X, data[i].Y, data[i].Z);
    var entity = new Entity(data[i].Id, data[i].Name, data[i].Class, position);
    itemsList.push(entity);
  }
}
