/**
 * Esempio: MOTION(Goal('to the living room')) & MANIPULATION(Entity(g9))
 */

function translator(formaPredicativaCorretta) {
  /*Lista delle azioni da svolgere */
  var actionList = [];

  if (formaPredicativaCorretta == null) {
    return null;
  }
  /* Divido le varie azioni (&) */
  var fpcSplit = formaPredicativaCorretta.split("&");
  /* Rimuovo gli spazi dopo "&" */
  for (var i = 0; i < fpcSplit.length; i++) {
    fpcSplit[i] = fpcSplit[i].trim();
  }

  /* Salvo tutte le azioni in una lista */
  for (var i = 0; i < fpcSplit.length; i++) {
    var action = fpcSplit[i].substr(0, fpcSplit[i].indexOf("("));
    actionList.push(action);
  }

  console.log(actionList);
  console.log(fpcSplit);
}

translator(
  "MOTION(Goal('to the living room')) & MANIPULATION(Entity(g9)) & BRINGING(Theme(h6), Goal(h7))"
);
