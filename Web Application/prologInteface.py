from pyswip import Prolog

prolog = Prolog()
prolog.consult('knowledge_base.pl')

# Return all entities on KB.
def getAllEntityDAOImpl():
    try:
        lista = list(prolog.query('entity(Id,Name,Class,X,Y,Z)'))
        check = bool(list(prolog.query('agent(_,_)')))
        if(check):
            lista.append(list(prolog.query('agent(X,Y)'))[0])
    except:
        lista = []
    return lista

<<<<<<< HEAD
=======
# Return all cells on KB.
def getAllCellDAOImpl():
    try:
        lista = list(prolog.query('cell(Id,X,Y,Zone,Walls)'))
    except Exception as e: 
        print("getAllCellDAOImpl: ", e)
        lista = []

    print(lista)
    return lista

# Cell
def insertCellDAOImpl(cell):
    check = bool(list(prolog.query("cell(" + cell['id'] + "," + cell['x']  + "," + cell['y']  + ",_,_)")))
    if(not check):
        prolog.assertz("cell(" + cell['id'] + "," + cell['x']  + "," + cell['y']  + "," + 
        cell['zone']  + ",[" + str(cell['walls'][0]).lower()+"," + str(cell['walls'][1]).lower()+"," + 
        str(cell['walls'][2]).lower()+","+ str(cell["walls"][3]).lower()+"])")
        
def getCellDAOImpl(id):
    prolog.assertz("cell(" +id+",X,Y,Zone,Walls)")

>>>>>>> parent of 094a592 (.)
# Agent
def insertAgentDAOImpl(x,y):
    check = bool(list(prolog.query('agent(_,_)')))
    if(not check):
        prolog.assertz("agent(" + x + "," + y + ")")

def getAgentDAOImpl():
    check = bool(list(prolog.query('agent(_,_)')))
    if(check):
        return list(prolog.query('agent(X,Y)'))[0]
    else:
        return -1

def deleteAgentDAOImpl():
    try:
        print(list(prolog.query('agent(X,Y)'))[0])
        prolog.retract('agent(_,_)')
    except Exception as e: 
        print("deleteEntityDAOImpl: ", e)

def updateAgentPositionDAOImpl(x,y):
    deleteAgentDAOImpl()
    insertAgentDAOImpl(x,y)

# Entity
def insertEntityDAOImpl(entity):
    print(entity)
    check = insertEntitySizeDAOImpl(entity['class'], entity['sizeX'],entity['sizeY'])
    if(check != 0):
        print('Valori delle dimensioni non valide.')
    else:
        prolog.assertz("entity(" + entity["id"] + "," + entity["name"] + "," +
                    entity["class"]+","+entity["x"] + "," + entity["y"] + "," + entity["z"] + ")")
        prolog.assertz('entity_size('+entity['id']+','+entity['size']+','+entity['sizeX']+','+entity['sizeY']+')')

# Return i valori Name,Class,X,Y,Z di un entity.
def getEntityDAOImpl(id):
    entityValues = list(prolog.query('entity('+id+',Name,Class,X,Y,Z)'))[0]
    return entityValues

# Retract di un elemento nella base di conoscenza
def deleteEntityDAOImpl(id):
    try:
        prolog.retract('entity('+id+',_,_,_,_,_ )')
        deleteEntitySizeDAOImpl(id)
    except Exception as e: 
        print("deleteEntityDAOImpl: ", e)
        
# Inserisce le dimensioni dell'entità appena istanziata. Se le dimensioni
# non corrispondono con quelle del KB, non inserisce l'oggetto.
def insertEntitySizeDAOImpl(entClass,sizeX,sizeY):
    print(entClass)
    check = -1
    theSize = list(prolog.query('space(TheSize,'+ sizeX + ',' +sizeY+')'))[0]['TheSize']
    sizeBool = bool(list(prolog.query('size('+entClass+','+theSize+')')))
    if(sizeBool):
        check = 0
    return check

# Cancella le dimensioni dell'entità con id in input
def deleteEntitySizeDAOImpl(id):
    try:
        prolog.retract("entity_size("+id+",_,_,_)")
    except Exception as e: 
        print(e)

# Restituisce le dimensioni dell'entità istanziata.
def getEntitySizeDAOImpl(id):
    return list(prolog.query('entity_size('+id+',_,SizeX,SizeY)'))

# Aggiorna la posizione dell'entità
def updateEntityPositionDAOImpl(id, x, y, z):
    entityValues = getEntityDAOImpl(id)
    print(entityValues)
    deleteEntityDAOImpl(id)
    prolog.assertz("entity(" + id + "," + entityValues["Name"] + "," +
                   entityValues["Class"]+","+str(x) + "," + str(y) + "," + str(z) + ")")

# Inserisce lo status di un'entità
def insertEntityStatusDAOImpl(id,status,statusBool):
    checkAbility = bool(list(prolog.query('entity_with_'+status+'_status('+id+')')))
    checkPow = list(prolog.query(status+'_status('+id+',X)'))
    print(checkAbility,checkPow)
    if checkAbility and not checkPow:
        print("cazzo")
        prolog.assertz(status+'_status('+id+','+statusBool+')')
    else:
        print("Non è stato possibile inserire lo status.")

def deleteEntityStatusDAOImpl(id):
    try:
        prolog.retract('entity('+id+',_,_,_,_,_)')
        print("Cancellazione andata a buon fine")
    except:
        print("Errore nella cancellazione dell'entity")

# Aggiorna lo stato dell'entità
def updateEntityStatusDAOImpl(id,statusBool):
    checkPow = list(prolog.query('power_status('+id+',X)'))
    checkPhy = list(prolog.query('physical_status('+id+',X)'))
    if(len(checkPow) != 0):
        prolog.retract('power_status('+id+',_)')
        prolog.assertz('power_status('+id+','+statusBool+')')
    elif(len(checkPhy) != 0):
        prolog.retract('physical_status('+id+',_)')
        prolog.assertz('physical_status('+id+','+statusBool+')')
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
    if(bool(list(prolog.query('power_status_ability('+id+')')))):
        abilitiesList.append('power_status_ability')
    if(bool(list(prolog.query('physical_status_ability('+id+')')))):
        abilitiesList.append('physical_status_ability')
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

def getClassAbilitiesDAOImpl(entClass, ability):
    if(bool(list(prolog.query(ability+'_ability('+entClass+')')))):
        return True
    else:
        return False

# Restituisce la lista delle lexical references.
def getEntityLexRefDAOImpl(id):
    lexRef = list(prolog.query('is_lex_ref('+id+',List)'))
    return lexRef[0]['List']

def getEntityLexRefOnMapDAOImpl():
    lista = list(prolog.query('entity(Id,_,_,_,_,_)'))
    allLexRef = []
    for x in lista:
        lexRef = list(prolog.query('is_lex_ref('+x['Id']+',List)'))
        lexRef.insert(0,x['Id'])
        allLexRef.append(lexRef)
    return allLexRef

# Restituisce il peso dell'entità.
def getEntityWeightDAOImpl(id):
    return list(prolog.query('is_weight('+id+',Weight)'))[0]['Weight']

def getEntitySizeDAOImpl(id):
    if(bool(list(prolog.query('entity_size('+id+',Size,X,Y)')))):
        return list(prolog.query('entity_size('+id+',Size,X,Y)'))[0]['Size']
    return None

# Restituisce la lista delle url di tutte le entità
def getAllUrlDAOImpl():
    lista = list(prolog.query('img(Class,Url)'))
    return lista

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
    try:
        prolog.retract('on_top('+id1+','+id2+')')
    except:
        print("Errore nella cancellazione del fatto on_top.")

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
    try:
        prolog.retract('on_bottom('+id1+','+id2+')')
    except Exception as e: 
        print("deleteEntityDAOImpl: ", e)

# Inserisce il fatto insinde(idInside, idContainer) nel KB.
def insertInsideDAOImpl(idInside, idContainer):
    if(not bool(list(prolog.query('inside('+idInside+','+idContainer+')'))) and idInside != idContainer):
        prolog.assertz('inside('+idInside+','+idContainer+')')
        print('Fatto inserito nel KB.')
    elif(idInside == idContainer):
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
    try:
        prolog.retract('inside('+id1+','+id2+')')
    except:
        print("Errore nella cancellazione del fatto inside.")

# Restistuice lo spazio rimanente dentro un'entità facendo il calcolo con quelle già presenti
# print('InsideSpaceAvaiable: ',getInsideSpaceDAOImpl('id3'))
def getInsideSpaceAvailableDAOImpl(id):
    if(bool(list(prolog.query('contain_ability('+id+')')))):
        sizeList = getEntitySizeDAOImpl(id)[0]
        spaceAvailable = sizeList['SizeX']*sizeList['SizeY']
        listEnt = getInsideDAOImpl(id)
        print(spaceAvailable, listEnt)
        for x in listEnt:
            entSize = list(prolog.query('entity_size('+x['Id']+',Size,SizeX,SizeY)'))[0]
            spaceAvailable -= (entSize['SizeX'] * entSize['SizeY']) 
        return spaceAvailable
    else:
        print('L entità non può contenere oggetti.')
        return -1