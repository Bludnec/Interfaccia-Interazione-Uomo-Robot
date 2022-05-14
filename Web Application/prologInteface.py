from pyswip import Prolog

prolog = Prolog()
#prolog.consult("static\knowledge_base.pl")

def insertElementDAOImpl(mess):
    print("Salva messaggio: ",mess)
    prolog.assertz("father("+ mess["pers1"]  +","+ mess["pers2"]  +")")

def getAllElementDAOImpl():
    try:
        lista = list(prolog.query("father(pluto,X)"))
    except:
        lista = []
    return lista

def deleteElementDAOImpl(pers2):
    try:
        prolog.retract("father(pluto," + pers2 + ")")
    except:
        print("errore nella cancellazione")
    print("Lista dopo retract: ", list(prolog.query("father(pluto,X)")))

