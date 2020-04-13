const ttr = require("./tetris.js")

//fonction qui permet de gérer le rythme du jeu
function clock(socket,tab,tetromino,cont,input)
{
  setTimeout(function(){jeu1Joueur(socket,tab,tetromino,cont,input);}, 100)
}

// fonction qui lance le tetris en mode 1 joueur
function jeu1Joueur(socket,tab,tetromino,cont,input)
{
  if(cont <10)
  {
  
    if(input.get(socket.id) == undefined)//si le socket n'existe plus, le joueur n'est plus connecté et le jeu s'arrète 
    {
      console.log("exit")
       return 0; 
    }
    //aplication d'un input
    tetromino = ttr.action(socket,tab,tetromino,input);
  }
  else
  {  
    tetromino = ttr.down(socket,tab,tetromino,input)
    cont = 0;
  }

  clock(socket,tab,tetromino,cont+1,input)//la clock de jeu est relancé
}

//fonction qui initialise le tetris 1  joueur
function OnePlayer(socket,input)
{
  console.log(socket.id);
  //création du tableau
  var tab = new Array()
  for(var i=0; i<10; i++)
  {
    tab[i] = new Array();
  }
  // remplissage du tableau avec des 0
  for(var i=0; i<10; i++)
  {
   for(var j=0; j<20; j++)
     {
        tab[i][j] = 0;
     } 
  } 
  console.log(tab[0][0])
  
  // initialisation du tetromino
  var tetromino = 
  {
    x1: 0,
    x2: 0,
    x3: 0,
    x4: 0,
    y1: 0,
    y2: 0,
    y3: 0,
    y4: 0,
    type: null,
    dir: 0
  }
  ttr.initTetromino(tetromino,"O");
 
  clock(socket,tab,tetromino,0,input);
}

//permet la décomposition en plusieurs fichiers  (module)
exports.OnePlayer = OnePlayer;