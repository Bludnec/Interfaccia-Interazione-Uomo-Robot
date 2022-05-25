from asyncio import constants
from pyswip import Prolog

prolog = Prolog()
prolog.consult('knowledge_base.pl')
prolog.assertz("entity(id1,tv,tv,1,1,0)")

# Return all entities on KB.
def getAllEntityDAOImpl():
    try:
        lista = list(prolog.query('entity(Id,Name,Class,X,Y,Z)'))
    except:
        lista = []
    return lista

# Inserimento di un elemento nella base di conoscenza.
def insertEntityDAOImpl(entity):
    prolog.assertz("entity("+ entity["id"]  +","+ entity["name"] +","+ entity["class"]+","+entity["x"] +","+ entity["y"] + ","+ entity["z"] + ")")
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

def updateEntityPositionDAOImpl(id,x,y,z):
    entityValues = getEntityDAOImpl(id)
    deleteEntityDAOImpl(id)
    prolog.assertz("entity("+ id +","+ entityValues["Name"] +","+ entityValues["Class"]+","+str(x) +","+ str(y) + ","+ str(z) + ")")

def updateEntityStatusDAOImpl(id):
    checkPow = bool(list(prolog.query('entity_with_power_status('+id+')')))
    checkPhy = bool(list(prolog.query('entity_with_physical_status('+id+')')))
    if(checkPow):
        status = list(prolog.query('power_status('+id+',X)'))
        prolog.retract('power_status('+id+',_)')
        if(status[0] == "true"):
            prolog.assertz('power_status('+id+',false)')
        else:
            prolog.assertz('power_status('+id+',true)')
    elif(checkPhy):
        status = list(prolog.query('physical_status('+id+',X)'))
        prolog.retract('physical_status('+id+',_)')
        if(status[0] == "true"):
            prolog.assertz('physical_status('+id+',false)')
        else:
            prolog.assertz('physical_status('+id+',true)')
    else:
        print("L'entity non ha uno stato")

updateEntityStatusDAOImpl("id1")


"""getStatus(id) --> status
updateElStatus(statusName, bool)  --> (retract status + assert status)
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