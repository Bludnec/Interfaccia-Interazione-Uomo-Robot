% entity(id,name,class,x,y).
% status(id, status).   status = on/off - open/closed
:- dynamic class/1.
:- dynamic power_status/2.      % power_status(id,status). status = true/false (on/off)
:- dynamic physical_status/2.   % physical_status(id,status). status = true/false (open/closed)
:- dynamic on_top/2.            % on_top(id1,id2). --> Id1 sta sopra l'Id2
:- dynamic on_bottom/2.         % on_bottom(id1,id2). --> Id1 sta sotto l'Id2
% on_top e on_bottom differenziati perché on_bottom può averlo solo l'oggetto
% che ha l'abilità putting_under = true.
:- dynamic inside/2.            % inside(id1,id2). --> id1 sta dentro id2.
:- dynamic entity/6.            % entity(id,name,class,x,y,z).
:- dynamic entity_size/4.       % entity_size(id,size,x,y).   es. assert entity_size(rug4,medium,2,1).

% Classe - class(name).
class(table).
class(wardrobe).
class(sofa).
class(chair).
class(fridge).
class(television).
class(keyboard). 
class(laptop).
class(smartphone).
class(cup).
class(plate).
class(microwave). 
class(book).
class(key).
class(bucket).
class(jar).
class(lamp).
class(window).
class(glass).
class(door).
class(rug).
class(bed).

% Grandezza entità - size(class,size).
size(table,big). 
size(table,medium).
size(wardrobe,big).
size(wardrobe,medium).
size(sofa,big).
size(sofa,medium).
size(chair,medium).
size(fridge,medium).
size(television,medium).
size(keyboard,small).
size(laptop,small).
size(smartphone,small).
size(cup,small).
size(plate,small).
size(microwave,medium).
size(book,small).
size(key,small).
size(bucket,small).
size(jar,small).
size(lamp,small).
size(window,small).
size(window,medium).
size(window,big).
size(glass,small).
size(door,medium).
size(rug,small).
size(rug,medium).
size(rug,big).
size(bed,big).
size(bed,medium).

% Peso - weight(class,weight)
weight(table,heavy).
weight(wardrobe,heavy).
weight(sofa,heavy).
weight(chair,medium).
weight(fridge,heavy).
weight(television,medium).
weight(keyboard,light).
weight(laptop,light).
weight(smartphone,light).
weight(cup,light).
weight(plate,light).
weight(microwave,medium).
weight(book,light).
weight(key,light).
weight(bucket,light).
weight(jar,light).
weight(lamp,light).
weight(window,heavy).
weight(glass,light).
weight(door,heavy).
weight(rug,medium).
weight(bed,heavy).

% Url delle immagini - img(class,url).
img(table,'static/images/table.png').
img(wardrobe,'static/images/wardrobe.png').
img(sofa,'static/images/sofa.png').
img(chair,'static/images/chair.png').
img(fridge,'static/images/fridge.png').
img(television,'static/images/television.png').
img(keyboard,'static/images/keyboard.png').
img(laptop,'static/images/laptop.png').
img(smartphone,'static/images/smartphone.png').
img(cup,'static/images/cup.png').
img(plate,'static/images/plate.png').
img(microwave,'static/images/microwave.png').
img(book,'static/images/book.png').
img(key,'static/images/key.png').
img(bucket,'static/images/bucket.png').
img(jar,'static/images/jar.png').
img(lamp,'static/images/lamp.png').
img(window,'static/images/window.png').
img(glass,'static/images/glass.png').
img(door,'static/images/door.png').
img(rug,'static/images/rug.png').
img(bed,'static/images/bed.png').


% Lexical references lex_ref(Class,List).
lex_ref(table,['table','bench','desk']).
lex_ref(wardrobe,['wardrobe','closet']).
lex_ref(sofa,['sofa','couch']).
lex_ref(chair,['chair','seat']).
lex_ref(fridge,['fridge','refrigerator']).
lex_ref(television,['television','tv']).
lex_ref(keyboard,['keyboard','fingerboard']).
lex_ref(laptop,['laptop','portable computer','pc']).
lex_ref(smartphone,['smartphone','cellular','cell phone','telephone','mobile phone']).
lex_ref(cup,['cup','bowl','tome']).
lex_ref(plate,['plate','dish']).
lex_ref(microwave,['microwave']).
lex_ref(book,['book','volume','chalice']).
lex_ref(key,['key']).
lex_ref(bucket,['bucket','pail']).
lex_ref(jar,['jar','vase','pot','pickle']).
lex_ref(lamp,['lamp','light','bulb']).
lex_ref(window,['window']).
lex_ref(glass,['glass','goblet']).
lex_ref(door,['door','gate','port']).
lex_ref(rug,['rug','carpet','mat']).
lex_ref(bed,['bed','kip']).

% Grandezza spazio
space(big,2,2).
space(big,1,4).
space(big,4,1).
space(medium,1,2).
space(medium,2,1).
space(small,1,1).

% acceso/spento
entity_with_power_status(Id):-
    is_class(Id,television).
entity_with_power_status(Id):-
    is_class(Id,laptop).
entity_with_power_status(Id):-
    is_class(Id,smartphone).
entity_with_power_status(Id):-
    is_class(Id,microwave).
entity_with_power_status(Id):-
    is_class(Id,lamp).

% Abilità: "name"_ability(id).
% Si possono poggiare oggetti su di esso.
support_ability(Id):-
    is_class(Id,table).
support_ability(Id):-
    is_class(Id,sofa).
support_ability(Id):-
    is_class(Id,chair).
support_ability(Id):-
    is_class(Id,rug).

% Un oggetto può contenere altri oggetti
contain_ability(Id):-
    is_class(Id,wardrobe).
contain_ability(Id):-
    is_class(Id,fridge).
contain_ability(Id):-
    is_class(Id,cup).
contain_ability(Id):-
    is_class(Id,microwave).
contain_ability(Id):-
    is_class(Id,bucket).
contain_ability(Id):-
    is_class(Id,jar).
contain_ability(Id):-
    is_class(Id,glass).

% Un oggetto può essere mosso (es. door/wall non possono essere mossi)
move_ability(Id):-
    is_class(Id,table).
move_ability(Id):-
    is_class(Id,wardrobe).
move_ability(Id):-
    is_class(Id,sofa).
move_ability(Id):-
    is_class(Id,chair).
move_ability(Id):-
    is_class(Id,fridge).
move_ability(Id):-
    is_class(Id,television).
move_ability(Id):-
    is_class(Id,keyboard).
move_ability(Id):-
    is_class(Id,laptop).
move_ability(Id):-
    is_class(Id,smartphone).
move_ability(Id):-
    is_class(Id,cup).
move_ability(Id):-
    is_class(Id,plate).
move_ability(Id):-
    is_class(Id,microwave).
move_ability(Id):-
    is_class(Id,book).
move_ability(Id):-
    is_class(Id,key).
move_ability(Id):-
    is_class(Id,bucket).
move_ability(Id):-
    is_class(Id,jar).
move_ability(Id):-
    is_class(Id,lamp).
move_ability(Id):-
    is_class(Id,glass).
move_ability(Id):-
    is_class(Id,rug).
move_ability(Id):-
    is_class(Id,bed).

% Si può camminare sopra l'oggetto
walkable_ability(Id):-
    is_class(Id,rug).
walkable_ability(Id):-
    is_class(Id,door),
    physical_status(Id,true). % walkable solo se è aperta.

% Si può chiudere/aprire l'oggetto.
open_ability(Id):-
    is_class(Id,wardrobe).
open_ability(Id):-
    is_class(Id,fridge).
open_ability(Id):-
    is_class(Id,window).
open_ability(Id):-
    is_class(Id,door).

% contenere qualcosa sotto
putting_under_ability(Id):-
    is_class(Id,table).
putting_under_ability(Id):-
    is_class(Id,chair).

%%%%
is_size(Id,SizeX,SizeY):-
    is_class(Id,Class),
    size(Class,X),
    space(X,SizeX,SizeY).

is_weight(Id,Weight):-
    is_class(Id,Class),
    weight(Class,Weight).

is_class(Id,Class):-
    entity(Id,_,Class,_,_,_),
    class(Class).

is_img(Id,Url):-
    entity(Id,_,Class,_,_,_),
    img(Class,Url).

is_lex_ref(Id,LFList):-
    is_class(Id,Class),
    lex_ref(Class,LFList).

space_available(Id,List):-
    is_size(Id,X,Y),
    Sum is X*Y,!,
    calcolo(Sum,List).

calcolo(Sum,[]):-
    Sum = 0.

calcolo(Sum,[[Size,X,Y]|R]):-
    space(Size,X,Y),
    NewSum is X*Y,
    Sum2 is Sum - NewSum,
    Sum2 >= 0,
    calcolo(Sum2,R).