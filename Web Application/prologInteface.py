from asyncio import constants
from traceback import print_tb
from pyswip import Prolog

prolog = Prolog()
prolog.consult('knowledge_base.pl')
prolog.assertz("entity(id1,table,table,1,1,0)")
prolog.assertz("entity(id2,tv,tv,3,2,0)")
prolog.assertz("entity(id3,wardrobe,wardrobe,5,5,0)")
prolog.assertz("entity_size(id3,big,2,2)")
prolog.assertz("entity(id4,cup,cup,5,5,0)")
prolog.assertz("inside(id4,id3)")
prolog.assertz("power_status(id2,true)")
prolog.assertz('on_top(id2,id1)')

# Return all entities on KB.
def getAllEntityDAOImpl():
    try:
        lista = list(prolog.query('entity(Id,Name,Class,X,Y,Z)'))
    except:
        lista = []
    return lista

# Inserimento di un elemento nella base di conoscenza.
def insertEntityDAOImpl(entity):
    check = insertEntitySizeDAOImpl(entity['id'], entity['sizeX'],entity['sizeY'])
    if(check != 0):
        print('Valori delle dimensioni non valide.')
    else:
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

# Inserisce le dimensioni dell'entità appena istanziata. Se le dimensioni
# non corrispondono con quelle del KB, non inserisce l'oggetto.
def insertEntitySizeDAOImpl(id,sizeX,sizeY):
    check = -1
    for size in prolog.query('is_size('+id+',SizeX,SizeY)'):
        if size["SizeX"]==sizeX and size["SizeY"]== sizeY:
            check = 0
    return check

# Restituisce le dimensioni dell'entità istanziata.
def getEntitySizeDAOImpl(id):
    return list(prolog.query('entity_size('+id+',_,SizeX,SizeY)'))[0]

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
        return list(prolog.query('power_status('+id+',X)'))[0]['X'] # [0] perché è il primo elemento, ['X'] = status
    elif(checkPhy):
        return list(prolog.query('physical_status('+id+',X)'))[0]['X']
    else:
        print("L'entity non ha uno stato")

# Restituisce la lista di tutte le abilità di un'entità.
def getEntityAbilitiesDAOImpl(id):
    abilitiesList = [] 
    if(bool(list(prolog.query('support_ability('+id+')')))):
        abilitiesList.append('supportAbility')
    if(bool(list(prolog.query('contain_ability('+id+')')))):
        abilitiesList.append('containAbility')
    if(bool(list(prolog.query('move_ability('+id+')')))):
        abilitiesList.append('moveAbility')
    if(bool(list(prolog.query('walkable_ability('+id+')')))):
        abilitiesList.append('walkableAbility')
    if(bool(list(prolog.query('open_ability('+id+')')))):
        abilitiesList.append('openAbility')
    if(bool(list(prolog.query('putting_under_ability('+id+')')))):
        abilitiesList.append('puttingUnderAbility')
    return abilitiesList

# Restituisce la lista delle lexical references.
def getEntityLexRefDAOImpl(id):
    lexRef = list(prolog.query('is_lex_ref('+id+',List)'))
    return lexRef[0]['List']

# Restituisce il peso dell'entità.
def getEntityWeightDAOImpl(id):
    return list(prolog.query('is_weight('+id+',Weight)'))[0]['Weight']

# Restituisce la lista delle url di tutte le entità
def getAllUrlDAOImpl():
    return list(prolog.query('img(Class,Url)'))


# Inserisce il fatto on_top(id1,id2) nella KB.
def insertOnTopDAOImpl(idOnTop,idSupport):
    if(not bool(list(prolog.query('on_top('+idOnTop+','+idSupport+')'))) and idOnTop != idSupport):
        prolog.assertz('on_top('+idOnTop+','+idSupport+')')
        print('Fatto inserito nel KB.')
    elif(idOnTop == idSupport):
        print('I due id inseriti sono uguali.')
    else:
        print('Il fatto è già inserito nella base di conoscenza.')

# Restituisce l'id dell'entità che sta sopra l'entità in input
def getOnTopDAOImpl(id):
    return list(prolog.query('on_top(Id,'+id+')'))

# Restituisce l'id dell'entità che sta supportando l'entità in input
def getSupportEntityDAOImpl(id):
   return list(prolog.query('on_top('+id+',Id)'))

# Cancella il fatto on_top(id1,id2) dalla KB.
def deleteOnTopDAOImpl(id1,id2):
    prolog.retract('on_top('+id1+','+id2+')')

# Inserisce il fatto on_bottom(id1,id2) nella KB.
def insertOnBottomDAOImpl(idOnBottom,idTop):
    if(not bool(list(prolog.query('on_bottom('+idOnBottom+','+idTop+')'))) and idOnBottom != idTop):
        prolog.assertz('on_bottom('+idOnBottom+','+idTop+')')
        print('Fatto inserito nel KB.')
    elif(idOnBottom == idTop):
        print('I due id inseriti sono uguali.')
    else:
        print('Il fatto è già inserito nella base di conoscenza.')

# Restituisce l'id dell'entità che sta sotto l'entità in input
def getOnBottomDAOImpl(id):
    return list(prolog.query('on_bottom(Id,'+id+')'))

# Restituisce l'id dell'entità che sta sopra l'entità in input
def getCoverEntityDAOImpl(id):
   return list(prolog.query('on_bottom('+id+',Id)'))

# Cancella il fatto on_bottom(id1,id2) dalla KB.
def deleteOnBottomDAOImpl(id1,id2):
    prolog.retract('on_bottom('+id1+','+id2+')')


# Inserisce il fatto on_bottom(id1,id2) nella KB.
def insertOnBottomDAOImpl(idOnBottom,idTop):
    if(not bool(list(prolog.query('on_bottom('+idOnBottom+','+idTop+')'))) and idOnBottom != idTop):
        prolog.assertz('on_bottom('+idOnBottom+','+idTop+')')
        print('Fatto inserito nel KB.')
    elif(idOnBottom == idTop):
        print('I due id inseriti sono uguali.')
    else:
        print('Il fatto è già inserito nella base di conoscenza.')

# Restituisce l'id dell'entità che sta dentro l'entità in input
def getInsideDAOImpl(id):
    return list(prolog.query('inside(Id,'+id+')'))

# Restituisce l'id dell'entità contenitore dell'entità in input
def getContainerEntityDAOImpl(id):
   return list(prolog.query('inside('+id+',Id)'))

# Cancella il fatto inside(id1,id2) dalla KB.
def deleteInsideDAOImpl(id1,id2):
    prolog.retract('inside('+id1+','+id2+')')


# Restistuice lo spazio rimanente dentro un'entità facendo il calcolo con quelle già presenti
def getInsideSpaceDAOImpl(id):
    if(bool(list(prolog.query('contain_ability('+id+')')))):
        sizeList = getEntitySizeDAOImpl(id)
        spaceAvaiable = sizeList['SizeX']*sizeList['SizeY']
        return spaceAvaiable
    else:
        print('L entità non può contenere oggetti.')
        return -1

print('InsideSpaceAvaiable: ',getInsideSpaceDAOImpl('id3'))

"""
?? getAbility(idEl,nome) --> true/False

Appena inserisco un'entità aggiungo anche la sua grandezza

entity_size (add,remove,update)

getInsideSpace(id) --> spazio rimanente nell'oggetto (per vedere se è possibile inserire altro) => getInside + calcolo dello spazio rimanente """
