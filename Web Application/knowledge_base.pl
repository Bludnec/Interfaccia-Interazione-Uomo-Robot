% entity(id,name,class,x,y).
% status(id, status).   status = on/off - open/closed

:- dynamic power_status/2.      % power_status(id,status). status = true/false (on/off)
:- dynamic physical_status/2.   % physical_status(id,status). status = true/false (open/closed)
:- dynamic on_top/2.            % on_top(id1,id2). --> Id1 sta sopra l'Id2
:- dynamic on_bottom/2.         % on_bottom(id1,id2). --> Id1 sta sotto l'Id2
:- dynamic inside/2.            % inside(id1,id2). --> id1 sta dentro id2.
:- dynamic entity/6.            % entity(id,name,class,x,y,z).
:- dynamic entity_size/4.       % entity_size(id,size,x,y).   es. assert entity_size(rug4,medium,2,1).

% Classe - class(name).
class(table).
class(rug).
class(tv).
class(cup).
class(door).
class(wardrobe).

% Grandezza entità - size(class,size).
size(table,big).
size(rug,big).
size(rug,medium).
size(rug,small).
size(tv,medium).
size(cup,small).
size(door,medium).
size(wardrobe,big).

% Peso - weight(class,weight)
weight(table,heavy).
weight(rug,heavy).
weight(cup,light).
weight(rug,medium).
weight(wardrobe,heavy).

% Grandezza spazio
space(big,2,2).
space(big,1,4).
space(big,4,1).
space(medium,1,2).
space(medium,2,1).
space(small,1,1).

% Url delle immagini - img(class,url).
img(table,'static/images/table.png'). 
img(rug,'static/images/rug.png').
img(cup,'static/images/cup.png').

% Lexical references lex_ref(Class,List).
lex_ref(table,['table','bench','desk']).
lex_ref(book,['book','volume','chalice']).
lex_ref(cup,['cup','bowl','tome']).
lex_ref(tv,['tv','television']).

% acceso/spento
entity_with_power_status(Id):-
    is_class(Id,tv).
entity_with_power_status(Id):-
    is_class(Id,pc).

% aperto/chiuso
entity_with_physical_status(Id):-
    is_class(Id,wardrobe).

entity_with_physical_status(Id):-
    is_class(Id,door).

% Abilità: "name"_ability(id).
% Si possono poggiare oggetti su di esso.
support_ability(Id):-
    is_class(Id,table).
support_ability(Id):-
    is_class(Id,rug).

% Un oggetto può contenere altri oggetti

contain_ability(Id):-
    is_class(Id,wardrobe).
contain_ability(Id):-
    is_class(Id,cup).

% Un oggetto può essere mosso (es. door/wall non possono essere mossi)
move_ability(Id):-
    is_class(Id,table).
move_ability(Id):-
    is_class(Id,rug).
move_ability(Id):-
    is_class(Id,tv).
move_ability(Id):-
    is_class(Id,cup).
move_ability(Id):-
    is_class(Id,wardrobe).

% Si può camminare sopra l'oggetto
walkable_ability(Id):-
    is_class(Id,rug).

% Si può chiudere/aprire l'oggetto.
open_ability(Id):-
    is_class(Id,book).
open_ability(Id):-
    is_class(Id,door).

% contenere qualcosa sotto
down_ability(Id):-
    is_class(Id,table).

%%%%
is_size(Id,SizeX,SizeY):-
    is_class(Id,Class),
    size(Class,X),
    space(X,SizeX,SizeY).

is_class(Id,Class):-
    entity(Id,_,Class,_,_,_),
    class(Class).

is_img(Id,Url):-
    entity(Id,_,Class,_,_,_),
    img(Class,Url).

is_lex_ref(Id,LFList):-
    is_class(Id,Class),
    lex_ref(Class,LFList).

space_avaiable(Id,List):-
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

%% Idea (ma senza inferenza)
is_contain(Id,Contain):-
    is_class(Id,Class),
    size(Class,Size),
    contain_space(Size,Contain).

% Quanti oggetti può contenere un altro oggetto e di che dimensione.
contain_space(big,[medium,2]).
contain_space(big,[small,4]).
contain_space(big,[[small,2], [medium,1]]).

contain_space(medium,[medium,1]).
contain_space(medium,[small,2]).

contain_space(cup,[small,1]).