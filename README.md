# Introduction

# Install Required Lib
- Flask (per backend)
```
pip install flask
```
- PySwip (per fare le query SWI-Prolog tramite Python)
```
pip install git+https://github.com/yuce/pyswip@master#egg=pyswip
```
Download [Swi-Prolog](www.swi-prolog.org/download/stable).

# How to run

Per far partire l'applicazione, andare nel folder principale dove sono stati inseriti i file ed eseguire:
```
python -m flask run
```
Una volta avviato, verrà mostrata la mappa e tutte le sezioni per lavorarci sopra.

## Sezioni
Sono presenti varie sezioni con cui è possibile interfacciarsi con la mappa, con l'agente e con l'ambiente.

## Impostazioni mappa
In questa sezione è possibile ridimensionare la mappa in larghezza e altezza.
Ogni volta che la mappa verrà ridimensionata, tutte le entità e le celle verranno resettate.

## Modifica celle
In questa sezione è possibile personalizzare le singole celle:
- asseggnare la zona della mappa
- modificare i muri

## Comandi
In questa sezione è possibile fornire un comando all'agente nell'area 'Input'. Il comando, una volta avviato, verra trasdotto da ...

Inoltre è possibile, abilitando il checkbox, spostare manualmente l'agente nella mappa tramite semplici click su di essa.

Quando l'agente si muove nella mappa dopo un comando, verranno colorate le celle dove è passato così da mostrare graficamente, anche dopo aver eseguito il comando, il persorso da lui eseguito. E' possibile poi rimuovere il persorso tramite apposito pulsante 'Cancella Percorso'.

## Costruzione

## Q&A

## Feedback

## Entità
In questa sezione è possibile popolare la mappa con le varie entità messe a disposizione.

Una volta cliccata un'entità, essa verrà mostrata nella *card* affianco, dove poi si potranno personalizzare le varie proprietà:
- Position: posizione rispetto all'entità dove verrà posizionata quella selezionata.
- Size: grandezza dell'entità selezionata.
- Orientation: se l'entità è più grande di due celle, è possibile decidere l'orientamento (orizzontale o verticale) dell'entità selezionata.
- Power status: stato (spento o acceso dell'entità) selezionata.
- Physical status: stato fisico (aperto o chiuso) dell'entità selezionata.

***Non tutte le entità possono avere le stesse proprietà.***

## Tabella informazioni
Dopo aver cliccato un'entità istanziata o una cella sulla mappa, in questa sezione verranno mostrate tutte le informazioni:
- Cella
  - *Class*
  - *Id*: id univoco della cella
  - *Coordinate*: coordinate spaziali
  - *Zone*: zone della casa
- Entità (se presente)
  - *Image*
  - *Class*
  - *Id*: id univoco dell'entità
  - *Position*: posizione entità rispetto ad altre entità
  - *Coordinates*: coordinate spaziali
  - *Delete*: pulsante per cancellare l'entità

***Se ci sono più entità nella stessa cella, verranno mostrate le informazioni su varie tabelle***

## Entità afferrata
