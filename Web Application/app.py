from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')




# in JS
# draw(){
#   fetch('/list-objects', GET) ritorna list-objects
# for each element in list-objects
#   var el = new El(list-objets.getInt(id), list-objects.getString(name), ....)
#   el.show()
# }

# FLASK (fa tipo da servlet)
# def listObjects('/list-objects):
#   list.json = chiamo dao-listObjects()
#   return list.json

# PYTHON + PYSWIP
# dao-listObject(){
#   chiede a prolog tramite PySwip
#   retun list-objets 
# }
