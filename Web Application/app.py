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

@app.route('/entity', methods=['POST','DELETE','GET'])
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