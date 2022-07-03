from flask import Flask, render_template, jsonify, request
from prologInteface import *
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Get all entity from KB.
@app.route('/get-all-entity')
def getAllEntity():
    lista = getAllEntityDAOImpl()
    return jsonify(lista)

# Get all cells from KB.
@app.route('/map', methods=['POST','DELETE','GET'])
def map():
    if request.method == "GET":
        lista = getMapDAOImpl()
        return jsonify(lista)
    if request.method == "POST":
        req = request.get_json()
        insertMapDAOImpl(req['i'],req['j'])
        return jsonify(req)
    if request.method == "DELETE":
        deleteMapDAOImpl()
        return jsonify("DELETE")

# Cell Occupied.
@app.route('/cell-occupied', methods=['POST','DELETE'])
def cellOccupied():
    if request.method == "POST":
        req = request.get_json()
        insertCellOccupiedDAOImpl(req['x'],req['y'],req['id'])
        return jsonify(req)
    if request.method == "DELETE":
        req = request.get_json()
        deleteCellOccupiedDAOImpl(req['id'])
        return jsonify("Delete cell occupied")

# Cell.
@app.route('/cell', methods=['POST','PATCH'])
def cell():
    if request.method == "POST":
        req = request.get_json()
        insertCellDAOImpl(req)
        return jsonify(req)
    if request.method == "PATCH":
        req = request.get_json()
        updateCellDAOImpl(req['id'],req['x'],req['y'],req['zone'],req['walls'])
        return jsonify(req)

# Cell.
@app.route('/cell/<id>', methods=['GET'])
def cellP(id):
    if request.method == "GET":
        cell = getCellDAOImpl(id)
        return jsonify(cell) 

# Lexical Map.
@app.route('/lexical-map', methods=['GET'])
def lexicalMap():
    if request.method == "GET":
        lexMap = getLexicalMapDAOImpl()
        return jsonify(lexMap) 

# Entity positioning.
@app.route('/entity/positioning', methods=['GET'])
def entityPositioning():
    if request.method == "GET":
        lexMap = getEntityPositioningOnMapDAOImpl()
        return jsonify(lexMap) 


# Agent.
@app.route('/agent', methods=['POST','DELETE','GET','PATCH'])
def agent():
    if request.method == "POST":
        req = request.get_json()
        insertAgentDAOImpl(req['x'],req['y'])
        return jsonify(req)
    if request.method == "GET":
        agentPosition = getAgentDAOImpl()
        return jsonify(agentPosition)        
    if request.method == "DELETE":
        deleteAgentDAOImpl()
        return jsonify("")
    if request.method == "PATCH":
        req = request.get_json()
        updateAgentPositionDAOImpl(req['x'],req['y'])
        return jsonify(req)

# Entity.
@app.route('/entity', methods=['POST','DELETE','GET','PATCH'])
def entity():
    if request.method == "POST":
        req = request.get_json()
        insertEntityDAOImpl(req)
        return jsonify(req)
    if request.method == "DELETE":
        req = request.get_json()
        deleteEntityDAOImpl(req['id'])
        return jsonify(req)
    if request.method == "GET":
        entity = getEntityDAOImpl(request.args.get('id'))
        return jsonify(entity)
    if request.method == "PATCH":
        req = request.get_json()
        updateEntityPositionDAOImpl(req['id'], req['x'],req['y'],req['z'])
        return jsonify(req)

# Entity status.
@app.route('/entity/status', methods=['POST','DELETE','GET','PATCH'])
def entityStatus():
    if request.method == "GET":
        status = getEntityStatusDAOImpl(request.args.get('id'))
        return jsonify(status)
    if request.method == "POST":
        req = request.get_json()
        insertEntityStatusDAOImpl(req['id'],req['status'],req['statusBool'])
        return jsonify(req)
    if request.method == "DELETE":
        req = request.get_json()
        deleteEntityStatusDAOImpl(req['id'])
        return jsonify(req)
    if request.method == "PATCH":
        req = request.get_json()
        updateEntityStatusDAOImpl(req['id'], req['statusBool'])
        return jsonify(req)        

# Get entity's ability.
@app.route('/entity/ability', methods=['GET'])
def entityAbility():
    if request.method == "GET":
        ability = getEntityAbilitiesDAOImpl(request.args.get('id'))
        return jsonify(ability)

# Get class's ability.
@app.route('/class/ability', methods=['GET'])
def classAbility():
    if request.method == "GET":
        ability = getClassAbilitiesDAOImpl(request.args.get('entClass'), request.args.get('ability'))
        return jsonify(ability)

# Get lexical references' entity.
@app.route('/entity/lexical_references', methods=['GET'])
def entityLefRef():
    if request.method == "GET":
        lexRef = getEntityLexRefDAOImpl(request.args.get('id'))
        return jsonify(lexRef)

# Get entity's weight.
@app.route('/entity/weight', methods=['GET'])
def entityWeight():
    if request.method == "GET":
        weight = getEntityWeightDAOImpl(request.args.get('id'))
        return jsonify(weight)

# Get all urls of the entity in KB.
@app.route('/get-all-url')
def getAllUrl():
    urlsList = getAllUrlDAOImpl()
    return jsonify(urlsList)

# On top.
@app.route('/entity/on-top', methods=['POST','DELETE','GET','PATCH'])
def entityOnTop():
    if request.method == "POST":
        req = request.get_json()
        insertOnTopDAOImpl(req['idOnTop'],req['idSupport'])
        return jsonify(req)
    if request.method == "GET" and request.args.get('pos') == "on-top":
        id = getOnTopDAOImpl(request.args.get('id'))
        return jsonify(id)
    if request.method == "GET" and request.args.get('pos') == "support":
        id = getSupportEntityDAOImpl(request.args.get('id'))
        return jsonify(id)
    if request.method == "DELETE":
        req = request.get_json()
        deleteOnTopDAOImpl(req['id1'],req['id2'])
        return jsonify(req)

# On bottom.
@app.route('/entity/on-bottom', methods=['POST','DELETE','GET'])
def entityOnBottom():
    if request.method == "POST":
        req = request.get_json()
        insertOnBottomDAOImpl(req['idOnBottom'],req['idTop'])
        return jsonify(req)
    if request.method == "GET" and request.args.get('pos') == "on-bottom":
        id = getOnBottomDAOImpl(request.args.get('id'))
        return jsonify(id)
    if request.method == "GET" and request.args.get('pos') == "cover":
        id = getCoverEntityDAOImpl(request.args.get('id'))
        return jsonify(id)
    if request.method == "DELETE":
        req = request.get_json()
        deleteOnBottomDAOImpl(req['id1'],req['id2'])
        return jsonify(req)

# Inside.
@app.route('/entity/inside', methods=['POST','DELETE','GET'])
def entityInside():
    if request.method == "POST":
        req = request.get_json()
        insertInsideDAOImpl(req['idInside'],req['idContainer'])
        return jsonify(req)   
    if request.method == "GET" and request.args.get('pos') == "inside":
        id = getInsideDAOImpl(request.args.get('id'))
        return jsonify(id)
    if request.method == "GET" and request.args.get('pos') == "container":
        id = getContainerEntityDAOImpl(request.args.get('id'))
        return jsonify(id)
    if request.method == "DELETE":
        req = request.get_json()
        deleteInsideDAOImpl(req['id1'],req['id2'])
        return jsonify(req)

# Get the space available of an entity.
@app.route('/entity/inside-space-available', methods=['POST','DELETE','GET'])
def entityInsideSpaceAvailable():
    if request.method == "GET":
        spaceAvailable = getInsideSpaceAvailableDAOImpl(request.args.get('id'))
        return jsonify(spaceAvailable)


# Get lexical references' entity.
@app.route('/entity/ability/all', methods=['GET'])
def allEntityAbilityOnMap():
    if request.method == "GET":
        lexRef = getEntityAbilityMapDAOImpl()
        return jsonify(lexRef)

# Get status' enitity.
@app.route('/entity/power-status/all', methods=['GET'])
def allEntityPowerStatusOnMap():
    if request.method == "GET":
        lexRef = getEntityPowerStatusOnMapDAOImpl()
        return jsonify(lexRef)