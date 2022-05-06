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

  console.log(fpcSplit);
  console.log(actionList);
}

translator(
  "MOTION(Goal('to the living room')) & MANIPULATION(Entity(g9)) & BRINGING(Theme(h6), Goal(h7))"
);

/**
 * BRINGING(Theme(h6), Goal(h7)
 *
 * Cercare di separare l'azione, i singoli input e gli argomenti dell'input
 * BRINGING(Theme(h6), Goal(h7)) =>
 * ActionList[0] = "BRINGING" e InputsOfAction[0] = "Theme(h6), Goal(h7)"
 *
 * Con l'actionList uso lo switch
 * switch(ActionList[i]):
 *  case "MOTION":
 *    function x(actionIndex)
 *  case "BRINGING":
 *    function y(actionIndex)
 *  ...
 *
 * Le funzioni chiamate nello switch avranno l'indice degli input (stesso indice delle azioni) per
 * andare a prendere gli input e scomporli in Theme = h6 e Goal = h7 (*).
 *
 * Quindi chiamerò agent.bringing(theme = h6, goal = 7, beneficiary = null, agent = null,
 *                                source = null, manner = null, area = null)
 */
