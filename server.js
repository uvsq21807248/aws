/**********************************
Ajout et initialisation des modules et des variables globals
**********************************/
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const ws = require("ws"); 
const sqlite3 = require("sqlite3").verbose();
const http = require("http");


//const https = require("https");
//const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

/*
const httpsOptions ={
  cert :fs.readFileSync(path.join(__dirname ,'ssl','server.cert')),
  key :fs.readFileSync(path.join(__dirname ,'ssl','server.key'))
}
https.createServer(httpsOptions,app);*/

/*******************
GESTION DES SESSIONS
*******************/
var connected_users = {};

class User {
  constructor(name) {
    this.name = name;
  }
}

function printConnectedUser() {
  console.log("Liste des utilisateurs connecté : ");
  for(let i in connected_users) {
    console.log("- " + connected_users[i].name);
  }
}

/*******************
gestion de socket.io
*******************/
// Ratachement de socket.io et express au même serveur http
var server = http.createServer(app);
var io = require('socket.io').listen(server);
const ttr = require("./tetrisUnJoueur.js")
var input = new Map(); 

io.sockets.on('connection', function (socket) 
{
    console.log('server : Un client est connecté !');
    // ajout de la clée corespondant à l'utilisateur dans la Map des input
    input.set(socket.id,0);
    socket.on('OnePlayer', function(message)
    {
      console.log("start")
       ttr.OnePlayer(socket,input);
    });
  
    socket.on('gestion',function (data)
    {
          data = JSON.parse(data);
        console.log("Websocket reçu de type : " + data.type);

        // Gestion de l'inscription
        if(data.type == 'inscription') {
          bddInscription(data, socket);
        }

        // Gestion de la connexion
        else if(data.type == 'connexion') {
          bddConnexion(data, socket);
        }

        // Gestion de la deconnexion
        else if(data.type == 'deconnexion') {
          delete connected_users[data.username];
        }

        //Gestion demande de statistiques
        else if(data.type == 'stats') {
          getStatsBD(data, socket);
        }

        // Si le type est inconnu
        else {
          console.log("Erreur : type de la connexion ws inconnu");
        }
      });
  
    socket.on('cmd', function(message) 
    {
      if(message == 'bas')
      {
        input.set(socket.id,'bas');
      }
      if(message == 'gauche')
      {
        input.set(socket.id,'gauche');
      }
      if(message == 'droite')
      {
        input.set(socket.id,'droite');
      }
      if(message == 'rotate')
      {
        input.set(socket.id,'rotate');
      }
    });
  
    socket.on('disconnect', function()
    {
      console.log(input.delete(socket.id));   
    }); 
    
});  



  
/****************************
GESTION DE LA BASE DE DONNEES
****************************/
// Initialisation des variables pour la base de données sqlite
const dbFile = "./.data/sqlite.db";
const sql_create_table = `create table if not exists Joueur
                          (username varchar(30),
                          password varchar(30),
                          score integer,
                          victories integer,
                          defeats integer,
                          primary key(username));
                          create tabe if not exists Ami 
                          (username1 varchar(30),
                          username2 varchar(30),
                          victories1 integer,
                          victories2 integer,
                          primary key(username1, username2),
                          constraint fk_username1 foreign key(username1) references Joueur(username),
                          constraint fk_username2 foreign key(username2) references Joueur(username));`;
const sql_insert_joueur = "insert into Joueur values(?, ?, 0, 0, 0)";
const sql_select_usr = "select username from Joueur where username = ?";
const sql_select_usr_psw = "select username, password from Joueur where username = ? and password = ?";

// Ouverture de la base de données
const db = new sqlite3.Database(dbFile, err => {
  if (err) console.error(err.message);
  else console.log("Connection à la base de données.");
});

// Création des tables
db.run(sql_create_table, (err) => {
  if(err) console.error(err.message);
  else console.log("Création des tables Joueur et Ami.");
});


// Ajout d'un utilisateur à la base de données
function addUserBdd(username, password) {
  db.run(sql_insert_joueur, [username, password] ,(err) => {
    if(err) console.error(err.message);
    else console.log(`Ajout du Joueur ${username} avec le mot de pass : ${password}`);
  });
}


// Fonction verifiant si le username donné existe déjà ou non (ajout si il n'existe pas)
function bddInscription(data, socket) {
  db.get(sql_select_usr, [data.username], (err, row) => {
    // Si il y a une erreur
    if(err) {
      console.error(err.message);
    }
    // Si l'username existe deja
    else if(row) {
      console.log("Inscription échoué");
      let answer = {"type": "reponse_inscription",
                    "answer": "echec",
                    "username": data.username};
      socket.emit('log',JSON.stringify(answer));
    }
    // Si le username n'existe pas
    else { 
      addUserBdd(data.username, data.password); 
      console.log("Inscription reussie");
      let answer = {"type": "reponse_inscription",
                    "answer": "succes",
                    "username": data.username};
      socket.emit('log',JSON.stringify(answer));
      printAllJoueur();
    }
  });
};

// Fonction veriant que l'utilisateur existe et que son mot de passe correspond. Si c'est
// le cas, la fonction renvoit une reponse de succes et ajoute l'utilisateur au utilisateur connecté
function bddConnexion(data, socket) {
  db.get(sql_select_usr_psw, [data.username, data.password], (err, row) => {
    // Si il y a une erreur
    if(err) console.error(err.message);
    // Si le tuple existe
    else if(row) {
      console.log("Connexion reussi");
      let answer = {"type": "reponse_connexion",
                    "answer": "succes",
                    "username": data.username};
      socket.emit('log',JSON.stringify(answer));
      test = data.username;
      connected_users[data.username] = new User(data.username);
      printConnectedUser();
    }
    // Si le tuple n'existe pas
    else {
      console.log("connexion échoué");
      let answer = {"type": "reponse_connexion",
                    "answer": "echec",
                    "username": data.username};
      socket.emit('log',JSON.stringify(answer));
    }
  });
};

// Fonction affichant dans la console tous les joueurs composants la base de données
function printAllJoueur() {
  db.all("select * from Joueur", (err, row) => {
    if(err) console.error(err.message);
    console.log("Liste des joueurs dans la bdd : ")
    row.forEach((row) => {
      console.log(row);
    });   
  });
}

/** Obtenir les statistiques d'un joueur. */
function getStatsBD(data, socket) {
  db.get('SELECT * FROM Joueur WHERE username = ?', [data.username], (err, row) => {
    // Si il y a une erreur
    if(err) {
      console.error(err.message);
    }
    else if(row) {
      let answer = {"type": "reponse_stats",
                    "answer": "succes",
                    "username": data.username,
                    "victoires": row.victories,
                    "defaites": row.defeats,
                    "score": row.score};
      socket.emit('log',JSON.stringify(answer));
    }
    // Si le username n'existe pas
    else { 
      console.log("Utilisateur inexistant");
      let answer = {"type": "reponse_stats",
                    "answer": "echec",
                    "username": data.username};
      socket.emit('log',JSON.stringify(answer));
      printAllJoueur();
    }
  });
}



// Suppression des données de la table Joueur.
/*db.run("delete from Joueur", (err) => {
  if(err) console.error(err.message);
  else console.log("Table Joueur supprimé.")
});*/

// Fermeture de la base de données
/*db.close(err => {
  if (err) console.error(err.message);
  else console.log("Fermeture de la base de données.");
});*/



/**************
GESTION DES GET
**************/
// Get /
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// Get /login
app.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/views/login.html`);
});

// Get /inscription
app.get("/inscription", (req, res) => {
  res.sendFile(`${__dirname}/views/inscription.html`);
});

// Get /jeu
app.get("/jeu", (req, res) => {
  res.sendFile(`${__dirname}/views/jeu.html`);
});

app.get("/tetrisUnJoueur", (req, res) => {
  res.sendFile(`${__dirname}/views/tetrisUnJoueur.html`);
});


/****************************************
Configuration de l'écoute sur le bon port
****************************************/

// listen for requests
var listener = server.listen(3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});



