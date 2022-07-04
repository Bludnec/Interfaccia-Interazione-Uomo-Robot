from asyncio import constants
from cmath import e
from itertools import count
from pyswip import Prolog
import json

prolog = Prolog()
prolog.consult('knowledge_base.pl')

# Restituisce una lista contenente una lista di tutte le entità 
# salvate nel KB e un'altra lista con le dimensioni delle entità.
def getAllEntityDAOImpl():
    finalList = []
    try:
        entityList = list(prolog.query('entity(Id,Name,Class,X,Y,Z)'))
        sizeList = list(prolog.query('entity_size(Id,SizeX,SizeY)'))
        check = bool(list(prolog.query('agent(_,_)')))
        if(check):
            entityList.append(list(prolog.query('agent(X,Y)'))[0])
        finalList.append(entityList)
        finalList.append(sizeList)
    except:
        finalList = []
    return finalList

# Inserisce il fatto cell_occupied(id).
def insertCellOccupiedDAOImpl(x,y,id):
    if not bool(list(prolog.query('cell_occupied('+str(x)+','+str(y)+','+str(id)+')'))):
        prolog.assertz('cell_occupied('+str(x)+','+str(y)+','+str(id)+')')

# Cancella il fatto cell_occupied(id)
def deleteCellOccupiedDAOImpl(id):
    try:
        prolog.retractall("cell_occupied(_,_,"+id+")")
    except Exception as e: 
        print("deleteEntitySizeDAOImpl: ",e)

# Map
def getMapDAOImpl():
    finalList = []
    try:
        cellList = list(prolog.query('cell(Id,X,Y,Zone,Walls)'))
        statusList = list(prolog.query('cell_occupied(X,Y,Id)'))
        finalList.append(cellList)
        finalList.append(statusList)
    except Exception as e: 
        print("getMapDAOImpl: ", e)
    return finalList

def insertMapDAOImpl(i,j):
    prolog.retractall('cell(_,_,_,_,_)')
    len(list(prolog.query('cell(Id,X,Y,Zone,Walls)')))
    counter = 0
    for c in range(int(j)):
        for r in range(int(i)):
            x = {"id": counter,
            "x": r,
            "y": c,
            "zone": "null",
            "walls": ["true","true","true","true"]
            }
            insertCellDAOImpl(x)
            counter+=1

def deleteMapDAOImpl():
    try:
        prolog.retractall('cell(_,_,_,_,_)')
        prolog.retractall('cell_occupied(_,_,_)')
    except Exception as e: 
        print("deleteMapDAOImpl: ", e)

# Cell
def insertCellDAOImpl(cell):
    prolog.assertz("cell(" + str(cell['id']) + "," + str(cell['x'])  + "," + str(cell['y'])  + "," + 
    cell['zone']  + ",[" + str(cell['walls'][0]).lower()+"," + str(cell['walls'][1]).lower()+"," + 
    str(cell['walls'][2]).lower()+","+ str(cell["walls"][3]).lower()+"])")
        
def getCellDAOImpl(id):
    print(list(prolog.query("cell_occupied(X,Y," +id+")")))
    return list(prolog.query("cell(" +id+",X,Y,Zone,Walls)"))

def updateCellDAOImpl(id,x,y,zone,walls):
    prolog.retract('cell('+str(id)+',_,_,_,_)')
    prolog.assertz('cell('+str(id)+','+str(x)+','+str(y)+','+zone+",[" + str(walls[0]).lower()+"," + str(walls[1]).lower()+"," + 
    str(walls[2]).lower()+","+ str(walls[3]).lower()+"])")

def getLexicalMapDAOImpl():
    lista = list(prolog.query('entity(Id,_,Class,X,Y,Z)'))
    allLexRef = [[],[]]
    
    for x in lista:
        lexRef = list(prolog.query('is_lex_ref('+x['Id']+',List)'))
        lexRef.insert(0,x['Id'])
        lexRef.insert(1,x['Class'])
        lexRef.insert(2,x['X'])
        lexRef.insert(3,x['Y'])
        lexRef.insert(4,x['Z'])
        allLexRef[0].append(lexRef)

    zone = list(prolog.query("zone(Zone)"))

    for x in zone:
        zoneMap = list(prolog.query("cell(Id,X,Y,"+x['Zone']+",Walls)"))
        lexRefZoneMap = list(prolog.query("zone_lex_ref("+x['Zone']+",List)"))
        if zoneMap != []:
            zoneMap.insert(0,x['Zone'])
            zoneMap.insert(1,lexRefZoneMap[0]["List"])
        allLexRef[1].append(zoneMap)

    return allLexRef

def getEntityPositioningOnMapDAOImpl():
    lista = list(prolog.query('entity(Id,_,_,_,_,_)'))
    allPositioning = []

    # on_top
    ontopList=[]
    for x in lista:
        app = list(prolog.query('on_top('+x['Id']+',Id)'))
        if app != []:
            ontopList.append([x['Id'],app[0]['Id']])
    allPositioning.append(ontopList)

    # on_bottom
    onBottomList=[]
    for x in lista:
        app = list(prolog.query('on_bottom('+x['Id']+',Id)'))
        if app != []:
            onBottomList.append([x['Id'],app[0]['Id']])
    allPositioning.append(onBottomList)

    # inside
    insideList=[]
    for x in lista:
        app = list(prolog.query('inside('+x['Id']+',Id)'))
        if app != []:
            insideList.append([x['Id'],app[0]['Id']])
    allPositioning.append(insideList)      

    return allPositioning

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
        print("deleteAgentDAOImpl: ", e)

def updateAgentPositionDAOImpl(x,y):
    deleteAgentDAOImpl()
    insertAgentDAOImpl(x,y)

# Entity
def insertEntityDAOImpl(entity):
    check = insertEntitySizeDAOImpl(entity['class'], entity['sizeX'],entity['sizeY'])
    if(check != 0):
        print('Valori delle dimensioni non valide.')
    else:
        prolog.assertz("entity(" + entity["id"] + "," + entity["name"] + "," +
                    entity["class"]+","+entity["x"] + "," + entity["y"] + "," + entity["z"] + ")")
        prolog.assertz('entity_size('+entity['id']+','+entity['sizeX']+','+entity['sizeY']+')')

# Return i valori Name,Class,X,Y,Z di un entity.
def getEntityDAOImpl(id):
    entityValues = list(prolog.query('entity('+id+',Name,Class,X,Y,Z)'))[0]
    return entityValues

# Retract di un elemento nella base di conoscenza
def deleteEntityDAOImpl(id):
    try:
        prolog.retract('entity('+id+',_,_,_,_,_ )')
        deleteEntitySizeDAOImpl(id)
        deleteEntityStatusDAOImpl(id)
    except Exception as e: 
        print("deleteEntityDAOImpl: ", e)
        
# Inserisce le dimensioni dell'entità appena istanziata. Se le dimensioni
# non corrispondono con quelle del KB, non inserisce l'oggetto.
def insertEntitySizeDAOImpl(entClass,sizeX,sizeY):
    check = -1
    if not bool(list(prolog.query('space(TheSize,'+ sizeX + ',' +sizeY+')'))):
        return -1
    theSize = list(prolog.query('space(TheSize,'+ sizeX + ',' +sizeY+')'))[0]['TheSize']
    sizeBool = bool(list(prolog.query('size('+entClass+','+theSize+')')))
    if(sizeBool):
        check = 0
    return check

# Cancella le dimensioni dell'entità con id in input
def deleteEntitySizeDAOImpl(id):
    try:
        prolog.retract("entity_size("+id+",_,_)")
    except Exception as e: 
        print(e)

# Restituisce le dimensioni dell'entità istanziata.
def getEntitySizeDAOImpl(id):
    return list(prolog.query('entity_size('+id+',SizeX,SizeY)'))[0]

# Aggiorna la posizione dell'entità
def updateEntityPositionDAOImpl(id, x, y, z):
    entityValues = getEntityDAOImpl(id)
    entitySize = getEntitySizeDAOImpl(id)
    deleteEntityDAOImpl(id)
    prolog.assertz("entity(" + id + "," + entityValues["Name"] + "," +
                   entityValues["Class"]+","+str(x) + "," + str(y) + "," + str(z) + ")")
    prolog.assertz("entity_size(" + id + "," + str(entitySize['SizeX']) + "," + str(entitySize['SizeY']) + ")")

# Inserisce lo status di un'entità
def insertEntityStatusDAOImpl(id,status,statusBool):
    checkAbility = bool(list(prolog.query(status+'_status_ability('+id+')')))
    checkPow = bool(list(prolog.query(status+'_status('+id+',_)')))
    if checkAbility and not checkPow:
        prolog.assertz(status+'_status('+id+','+statusBool+')')
    else:
        print("Non è stato possibile inserire lo status.")

def deleteEntityStatusDAOImpl(id):
    try:
        prolog.retract('power_status('+id+',_)')
        prolog.retract('physical_status('+id+',_)')
        print("Cancellazione andata a buon fine")
    except Exception as e: 
        print("deleteEntityStatusDAOImpl",e)

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

# Restituisce il peso dell'entità.
def getEntityWeightDAOImpl(id):
    return list(prolog.query('is_weight('+id+',Weight)'))[0]['Weight']

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
    if(not bool(list(prolog.query('inside('+str(idInside)+','+str(idContainer)+')'))) and idInside != idContainer):
        prolog.assertz('inside('+str(idInside)+','+str(idContainer)+')')
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
        for x in listEnt:
            entSize = list(prolog.query('entity_size('+str(x['Id'])+',SizeX,SizeY)'))[0]
            spaceAvailable -= (entSize['SizeX'] * entSize['SizeY']) 
        return spaceAvailable
    else:
        print('L entità non può contenere oggetti.')
        return -1


def getEntityAbilityMapDAOImpl():
    lista = list(prolog.query('entity(Id,_,_,_,_,_)'))
    allAbility = []
    for x in lista:
        abilityList = []
        if(bool(list(prolog.query('power_status_ability('+x['Id']+')')))):
            abilityList.append("power_status_ability")
        if(bool(list(prolog.query('physical_status_ability('+x['Id']+')')))):
            abilityList.append("physical_status_ability")            
        if(bool(list(prolog.query('support_ability('+x['Id']+')')))):
            abilityList.append("support_ability")  
        if(bool(list(prolog.query('contain_ability('+x['Id']+')')))):
            abilityList.append("contain_ability")   
        if(bool(list(prolog.query('move_ability('+x['Id']+')')))):
            abilityList.append("move_ability")                     
        if(bool(list(prolog.query('walkable_ability('+x['Id']+')')))):
            abilityList.append("walkable_ability")
        if(bool(list(prolog.query('open_ability('+x['Id']+')')))):
            abilityList.append("open_ability")                     
        if(bool(list(prolog.query('putting_under_ability('+x['Id']+')')))):
            abilityList.append("putting_under_ability")  
        abilityList.insert(0,x['Id'])
        allAbility.append(abilityList)
    return allAbility

def getEntityStatusOnMapDAOImpl():
    allStatus = []
    powerStatusList = list(prolog.query('power_status(Id,Status)'))
    physicalStatusList = list(prolog.query('physical_status(Id,Status)'))
    allStatus.append(powerStatusList)
    allStatus.append(physicalStatusList)
    return allStatus