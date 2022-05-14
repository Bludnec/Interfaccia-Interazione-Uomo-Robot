from flask import Flask, render_template
from prologInteface import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getAllElement')
def getAllElement():
    messaggio = getAllElementDAOImpl()
    return jsonify(messaggio)

@app.route('/insertElement', methods=['POST'])
def insertElement():
    if request.method == "POST":
      req = request.get_json()
      insertElementDAOImpl(req) #stampa su terminale cmd
      return jsonify(req)


@app.route('/deleteElement', methods=['DELETE'])
def deleteElement():
    if request.method == "DELETE":
      req = request.get_json()
      deleteElementDAOImpl(req) #stampa su terminale cmd
      return jsonify(req)