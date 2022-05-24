from pyswip import Prolog

prolog = Prolog()
prolog.consult('knowledge_base.pl')
prolog.assertz("entity(id1,table,table,1,1,0)")

# Return all entities on KB.
def getAllElementDAOImpl():
    try:
        lista = list(prolog.query('entity(Id,Name,Class,X,Y,Z)'))
    except:
        lista = []
    return lista

# Inserimento di un elemento nella base di conoscenza.
def insertElementDAOImpl(entity):
    prolog.assertz("entity("+ entity["id"]  +","+ entity["name"] +","+ entity["class"]+","+entity["x"] +","+ entity["y"] + ","+ entity["y"] + ")")
    print(entity, " inserito nel KB.")


# Retract di un elemento nella base di conoscenza    
def deleteElementDAOImpl(entity):
    try:
        prolog.assertz("entity("+ entity["id"]  +","+ entity["name"] +","+ entity["class"]+","+entity["x"] +","+ entity["y"] + ","+ entity["y"] + ")")
    except:
        print("Errore nella cancellazione")





#x = getAllElementDAOImpl()
#print(x)