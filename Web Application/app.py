from urllib import response
from flask import Flask, render_template, jsonify, request
from prologInteface import *
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/insertEntity', methods=['POST'])
def insertElement():
    if request.method == "POST":
      req = request.get_json()
      insertElementDAOImpl(req) #stampa su terminale cmd
      return response
      
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