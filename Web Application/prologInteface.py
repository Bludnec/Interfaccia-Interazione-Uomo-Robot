from asyncio import constants
from pyswip import Prolog

prolog = Prolog()
prolog.consult('knowledge_base.pl')
prolog.assertz("entity(id1,tv,tv,1,1,0)")
prolog.assertz("power_status(id1,false)")

# Return all entities on KB.


def getAllEntityDAOImpl():
    try:
        lista = list(prolog.query('entity(Id,Name,Class,X,Y,Z)'))
    except:
        lista = []
    return lista

# Inserimento di un elemento nella base di conoscenza.


def insertEntityDAOImpl(entity):
    prolog.assertz("entity(" + entity["id"] + "," + entity["name"] + "," +
                   entity["class"]+","+entity["x"] + "," + entity["y"] + "," + entity["z"] + ")")
    print(entity, " inserito nel KB.")

# Return i valori Name,Class,X,Y,Z di un entity.


def getEntityDAOImpl(id):
    entityValues = list(prolog.query('entity('+id+',Name,Class,X,Y,Z)'))
    return entityValues[0]

# Retract di un elemento nella base di conoscenza


def deleteEntityDAOImpl(id):
    try:
        prolog.retract('entity('+id+',_,_,_,_,_ )')
    except:
        print("Errore nella cancellazione")

# Aggiorna la posizione dell'entità


def updateEntityPositionDAOImpl(id, x, y, z):
    entityValues = getEntityDAOImpl(id)
    deleteEntityDAOImpl(id)
    prolog.assertz("entity(" + id + "," + entityValues["Name"] + "," +
                   entityValues["Class"]+","+str(x) + "," + str(y) + "," + str(z) + ")")

# Aggiorna lo stato dell'entità


def updateEntityStatusDAOImpl(id):
    checkPow = list(prolog.query('power_status('+id+',X)'))
    checkPhy = list(prolog.query('physical_status('+id+',X)'))
    if(len(checkPow) != 0):
        prolog.retract('power_status('+id+',_)')
        if(checkPow[0]['X'] == 'true'):
            prolog.assertz('power_status('+id+',false)')
        else:
            prolog.assertz('power_status('+id+',true)')
    elif(len(checkPhy) != 0):
        prolog.retract('physical_status('+id+',_)')
        if(checkPhy[0]['X'] == "true"):
            prolog.assertz('physical_status('+id+',false)')
        else:
            prolog.assertz('physical_status('+id+',true)')
    else:
        print("L'entity non ha uno stato")

# Restituisce lo stato dell'entità


def getEntityStatusDAOImpl(id):
    checkPow = bool(list(prolog.query('power_status('+id+',X)')))
    checkPhy = bool(list(prolog.query('physical_status('+id+',X)')))
    if(checkPow):
        # [0] perché è il primo elemento, ['X'] = status
        return list(prolog.query('power_status('+id+',X)'))[0]['X']
    elif(checkPhy):
        return list(prolog.query('physical_status('+id+',X)'))[0]['X']
    else:
        print("L'entity non ha uno stato")

# Restituisce la lista di tutte le abilità di un'entità.


def getEntityAbilitiesDAOImpl(id):
    abilitiesList = []
    return abilitiesList


# Restituisce la lista delle lexical references.
def getEntityLexRefDAOImpl(id):
    lexRef = list(prolog.query('is_lex_ref('+id+',List)'))
    print(list())
    return lexRef[0]['List']


"""
getAbility(idEl,nome) --> true/False
getLexRef(id) --> list
getElSize(id) --> x,y
getElWeight(id) --> weight

getAllUrl --> list

getOnTop(id) --> id dell'oggetto sopra
getOnBottom(id) --> id dell'oggetto sotto
getInside(id) --> id dell'oggetto/i dentro
getConteiner(id) --> id dell'oggetto che lo contiene (opposto di getInside).
getInsideSpace(id) --> spazio rimanente nell'oggetto (per vedere se è possibile inserire altro) => getInside + calcolo dello spazio rimanente """
