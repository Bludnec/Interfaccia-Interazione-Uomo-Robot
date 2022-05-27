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

@app.route('/entity', methods=['POST','DELETE'])
def insertEntity():
    if request.method == "POST":
        req = request.get_json()
        insertEntityDAOImpl(req)
        return jsonify(req)
    if request.method == "DELETE":
        req = request.get_json()
        print(req)
        deleteEntityDAOImpl(req)
        return jsonify(req)



# @app.route('/getAllElement')
# def getAllElement():
#     messaggio = getAllElementDAOImpl()
#     return jsonify(messaggio)


# @app.route('/deleteElement', methods=['DELETE'])
# def deleteElement():
#     if request.method == "DELETE":
#       req = request.get_json()
#       deleteElementDAOImpl(req) #stampa su terminale cmd
#       return jsonify(req)