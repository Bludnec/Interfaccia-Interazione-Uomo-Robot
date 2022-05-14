% entity(id,name,class,x,y).
entity(table1,table,table,1,1).
entity(rug1,rug,rug,3,4).
entity(cup1,cup,cup,1,1).

% Classes
class(table).
class(rug).
class(bed).
class(tv).
class(book).
class(cup).

% Images url - img(class,url).
img(table,'static/images/table.png'). 

% Lexical references lex_ref(Class,List).
lex_ref(table,[table,bench,desk]).
lex_ref(book,[book,volume,chalice]).
lex_ref(cup,[cup,bowl,tome]).

% Ability "name"_ability(id).
support_ability(Id):-
    isClass(Id,table);
    isClass(Id,rug).

contain_ability(Id):-
    isClass(Id,cup).

move_ability(Id):-
    isClass(Id,book);
    isClass(Id,cup).

isWalkable(Id):-
    isClass(Id,rug).

open_ability(Id):-
    isClass(Id,book).

% 
isClass(Id,Class):-
    entity(Id,_,Class,_,_),
    class(Class).

isImg(Class,Url):-
    img(Class,Url).

isPosition(Id,X,Y):-
    entity(Id,_,_,X,Y).

isLexRef(Id,LFList):-
    isClass(Id,Class),
    lex_ref(Class,LFList).