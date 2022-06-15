from flask import Flask, render_template, jsonify, request
from prologInteface import *
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-all-entity')
def getAllEntity():
    lista = getAllEntityDAOImpl()
    return jsonify(lista)

# Agent
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

# Entity
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

@app.route('/entity/status', methods=['POST','DELETE','GET','PATCH'])
def entityStatus():
    if request.method == "GET":
        status = getEntityStatusDAOImpl(request.args.get('id'))
        return jsonify(status)
    if request.method == "POST":
        req = request.get_json()
        print(req)
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

@app.route('/entity/ability', methods=['GET'])
def entityAbility():
    if request.method == "GET":
        ability = getEntityAbilitiesDAOImpl(request.args.get('id'))
        return jsonify(ability)

@app.route('/class/ability', methods=['GET'])
def classAbility():
    if request.method == "GET":
        ability = getClassAbilitiesDAOImpl(request.args.get('entClass'), request.args.get('ability'))
        return jsonify(ability)

@app.route('/entity/lexical_references', methods=['GET'])
def entityLefRef():
    if request.method == "GET":
        lexRef = getEntityLexRefDAOImpl(request.args.get('id'))
        return jsonify(lexRef)

@app.route('/entity/weight', methods=['GET'])
def entityWeight():
    if request.method == "GET":
        weight = getEntityWeightDAOImpl(request.args.get('id'))
        return jsonify(weight)

@app.route('/entity/size', methods=['GET'])
def entitySize():
    if request.method == "GET":
        print(request.args.get('id'))
        size = getEntitySizeDAOImpl(request.args.get('id'))
        return jsonify(size)

@app.route('/get-all-url')
def getAllUrl():
    urlsList = getAllUrlDAOImpl()
    print(urlsList)
    return jsonify(urlsList)

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

@app.route('/entity/inside-space-available', methods=['POST','DELETE','GET'])
def entityInsideSpaceAvailable():
    if request.method == "GET":
        spaceAvailable = getInsideSpaceAvailableDAOImpl(request.args.get('id'))
        return jsonify(spaceAvailable)