function verif(valeur){
  // initialisation des variables
  var minuscules = new RegExp("[a-z]");
  var majuscules = valeur.toLowerCase();
  var chiffres = new RegExp("[0-9]");
  var caracSpeciaux = new RegExp("[^a-zA-Z0-9]");
  
  
  // s'il y a moins ou 5 caractères dans le mot de passe :
  if(valeur.length <= 5){
    // si on trouve des minuscules mais pas de majuscules
    if(minuscules.test(valeur) && valeur == majuscules){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ftres-faible.png?1558266001443' title='Protection tr&egrave;s faible.' alt='Protection tr&egrave;s faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    // si on trouve des minuscules et des majuscules
    else if(minuscules.test(valeur) && valeur != majuscules){
      // si on trouve aussi des chiffres
      if(chiffres.test(valeur)){
        document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ffaible.png?1558266001890' title='Protection faible.' alt='Protection faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
      }
      else{
        document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ftres-faible.png?1558266001443' title='Protection tr&egrave;s faible.' alt='Protection tr&egrave;s faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
      }
    }
    // si on trouve des minuscules et des chiffres
    else if(minuscules.test(valeur) && chiffres.test(valeur)){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ftres-faible.png?1558266001443' title='Protection tr&egrave;s faible.' alt='Protection tr&egrave;s faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    // si on trouve des minuscules et des caractères spéciaux
    else if(minuscules.test(valeur) && caracSpeciaux.test(valeur)){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ftres-faible.png?1558266001443' title='Protection tr&egrave;s faible.' alt='Protection tr&egrave;s faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    else{
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ftres-faible.png?1558266001443' title='Protection tr&egrave;s faible.' alt='Protection tr&egrave;s faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
  }
  // si le mot de passe fait 6 ou 7 caractères
  else if(valeur.length > 5 && valeur.length < 8){
    if(minuscules.test(valeur) && valeur == majuscules){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ffaible.png?1558266001890' title='Protection faible.' alt='Protection faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    else if(minuscules.test(valeur) && valeur != majuscules){
      if(chiffres.test(valeur)){
        document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Fmoyenne.png?1558266001583' title='Protection moyenne.' alt='Protection moyenne.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
        // si on trouve aussi  des caractères spéciaux
        if(caracSpeciaux.test(valeur)){
          document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Fbonne.png?1558266001355' title='Protection bonne.' alt='Protection bonne.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
        }
      }
      else{
        document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ffaible.png?1558266001890' title='Protection faible.' alt='Protection faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
      }
    }
    else if(minuscules.test(valeur) && chiffres.test(valeur)){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ffaible.png?1558266001890' title='Protection faible.' alt='Protection faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    else if(minuscules.test(valeur) && caracSpeciaux.test(valeur)){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ffaible.png?1558266001890' title='Protection faible.' alt='Protection faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    else{
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ffaible.png?1558266001890' title='Protection faible.' alt='Protection faible.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
  }
  // si le mot de passe fait 8 caractères ou plus
  else if(valeur.length >= 8){
    if(minuscules.test(valeur) && valeur == majuscules){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Fmoyenne.png?1558266001583' title='Protection moyenne.' alt='Protection moyenne.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    else if(minuscules.test(valeur) && valeur != majuscules){
      if(chiffres.test(valeur)){
        document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Ftres-bonne.png?1558266001619' title='Protection tr&egrave;s bonne.' alt='Protection tr&egrave;s bonne.' /><br />Pour une meilleure protection rajoutez des caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)";
        if(caracSpeciaux.test(valeur)){
          document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Fexcellente.png?1558266001557' title='Protection excellente.' alt='Protection excellente.' /><br />Si vous souhaitez avoir une protection encore meilleure :<ul><li>alternez les types de caract&egrave;res le plus souvent possible</li><li>n'h&eacute;sitez pas &agrave; en mettre beaucoup pour emp&ecirc;cher le brut force le plus possible.</li></ul>";
        }
      }
      else{
        document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Fbonne.png?1558266001355' title='Protection bonne.' alt='Protection bonne.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
      }
    }
    else if(minuscules.test(valeur) && chiffres.test(valeur)){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Fmoyenne.png?1558266001583' title='Protection moyenne.' alt='Protection moyenne.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    else if(minuscules.test(valeur) && caracSpeciaux.test(valeur)){
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Fmoyenne.png?1558266001583' title='Protection moyenne.' alt='Protection moyenne.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
    else{
      document.getElementById('verif').innerHTML = "<br /><img src='https://cdn.glitch.com/81209edd-533d-4abc-8a4c-ac8fcf84a69a%2Fmoyenne.png?1558266001583' title='Protection moyenne.' alt='Protection moyenne.' /><br />Pour une meilleure protection suivez au mieux ces conseils : <ul><li>au moins 8 caract&egrave;res.</li><li>Mettez des majuscules</li><li>des minuscules</li><li>des chiffres</li><li>caract&egrave;res sp&eacute;ciaux (par ex. : <>!:*)</li></ul>";
    }
  }
}