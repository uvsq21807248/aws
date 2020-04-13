// Déclaration et initialisation des variables pour ws
//const ws = new WebSocket('wss://' + window.location.host);
const socket = io('wss://' + window.location.host)

/********************************
GESTIONS DES BOUTONS DU MENU
********************************/
// Si l'utilisateur n'est pas connecté :
if(typeof sessionStorage.username == "undefined") {
  // Gestion des du bouton central "JOUER" de index.html
  if(document.location == "https://projet-tetris-master.glitch.me/") {
    document.getElementById("JOUER").setAttribute("href", "/login");
  }
  //Redirection vers page d'accueil
  if(document.location == "https://projet-tetris-master.glitch.me/jeu") {
    document.location.href="https://projet-tetris-master.glitch.me/"; 
  }
  // Gestion du bouton "Jouer"
  document.getElementById("Jouer").setAttribute("href", "/login");
 
  // Gestion du bouton "Se connecter"
  let connexion = document.getElementById("connexion/deconnexion");
  connexion.setAttribute("href", "/login");
  connexion.innerText = "Se connecter";
  // Gestion du bouton "S'inscrire"
  let inscrire = document.createElement("a");
  inscrire.setAttribute("href", "/inscription");
  inscrire.innerText = "S'inscrire";
  document.getElementById("inscrire").appendChild(inscrire);
}
// Sinon (si l'utilisateur est connecté) :
else {
  // Gestion du bouton central "JOUER" de index.html
  if(document.location == "https://projet-tetris-master.glitch.me/") {
    document.getElementById("JOUER").setAttribute("href", "/jeu");
  }
  if(document.location == "https://projet-tetris-master.glitch.me/jeu") {
    document.getElementById("solo").setAttribute("href", "/tetrisUnJoueur");
  }
  //Gestion du bouton "Jouer"
  document.getElementById("Jouer").setAttribute("href", "/jeu");
  // Gestion du bouton "Se déconnecter"
  let deconnexion = document.getElementById("connexion/deconnexion");
  deconnexion.setAttribute("href", "/");
  deconnexion.setAttribute("onclick", "deconnexion()");
  deconnexion.innerText = "Se déconnecter";
}


/*********************************************************
PARTIE INSCRIPTION ET ENVOI DES INFORMATIONS PAR WEBSOCKET
*********************************************************/
// //Fonction qui enregistre un membre dans la BD via pseudo et mdp stockés dans data
function registerUser() {
  var pseudo = AnnulerCaract(document.getElementById("pseudo").value);
  var mdp = AnnulerCaract(document.getElementById("mdp").value);
  var mdp2 = AnnulerCaract(document.getElementById("mdp2").value);
  
  if(mdp == mdp2){
    const data = {"type": "inscription",
                  "username": pseudo,
                  "password": mdp}
    socket.emit('gestion',JSON.stringify(data));
  }
  else alert("Les mots de passe ne correspondent pas !");  
};


/*******************************************************
PARTIE CONNEXION ET ENVOI DES INFORMATIONS PAR WEBSOCKET
*******************************************************/
//Fonction qui récupère les infos du formulaire de connection
//et envoie une websocket de connexion au serveur.
function connectUser(form) {
  var pseudo = AnnulerCaract(document.getElementById("pseudo").value);
  var mdp = AnnulerCaract(document.getElementById("mdp").value);
  const data = {"type" : "connexion",
                "username": pseudo,
                "password": mdp}
  socket.emit('gestion',JSON.stringify(data)); 
}

/*********************************************************
PARTIE DECONNEXION ET ENVOI DES INFORMATIONS PAR WEBSOCKET
*********************************************************/
// Fonction qui supprime l'utilisateur de la variable sessionStorage
// et envoie une websocket de deconnexion au serveur.
function deconnexion() {
  let data = {"type": "deconnexion",
              "username": sessionStorage.username};
  socket.emit('gestion',JSON.stringify(data));
  sessionStorage.removeItem("username");
}

/*******************************************
GESTION DE L'ECOUTE DES EVENEMENTS WEBSOCKET
*******************************************/

//Récupération de la reponse du serveur pour l'inscription et la connexion
 socket.on('log', (e) => {
   let data = JSON.parse(e);
   console.log(data);
 
  //Partie inscription
   if(data.type == "reponse_inscription") {
     if(data.answer == "succes") {
       alert("Inscription réussi " + data.username);
       document.location.href="/login";
     }
     else {
       alert("Inscription échouée. Veuillez rééssayer.");
     }
   }
  
   // Partie connexion
   else if(data.type == "reponse_connexion") {
     if(data.answer == "succes") {
       sessionStorage.setItem("username", data.username);
       alert("Connexion réussi " + sessionStorage.username);
       document.location.href="/jeu";
     }
     else {
       alert("Connexion échoué. Veuillez rééssayer.");
     }
   }
   else if(data.type == "reponse_stats") {
     if(data.answer == "succes") {
       sessionStorage.setItem("score", data.score);
       sessionStorage.setItem("victoires", data.victoires);
       sessionStorage.setItem("defaites", data.defaites);
    }
     else alert ("Erreur lecture stats.");
   }
 });

/** Requête des stats pour la page de profil. */
function getStats() {
  var pseudo = sessionStorage.username;
  const data = {"type": "stats", "username": pseudo};
  socket.emit('gestion',JSON.stringify(data));
}


   //XSS protection
function AnnulerCaract(text) {
  return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}
