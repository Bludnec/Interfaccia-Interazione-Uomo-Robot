from pyswip import Prolog

prolog = Prolog()
prolog.consult('knowledge_base.pl')

# Return all entities on KB
def getAllElementDAOImpl():
    try:
        lista = list(prolog.query('entity(Id,Name,Class,X,Y)'))
    except:
        lista = []
    return lista

def insertElementDAOImpl(entity):
    prolog.assertz("entity("+ entity["id"]  +","+ entity["name"] +","+ entity["class"]+","+entity["x"] +","+ entity["y"] +")")
    print(entity, " inserito nel KB.")

    
#============= Vecchi DAO da cambiare ==========================================


def deleteElementDAOImpl(pers2):
    try:
        prolog.retract("father(pluto," + pers2 + ")")
    except:
        print("errore nella cancellazione")
    print("Lista dopo retract: ", list(prolog.query("father(pluto,X)")))





#x = getAllElementDAOImpl()
#print(x)