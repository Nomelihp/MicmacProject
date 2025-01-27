
// Fonction pour traduire les champs de jobs en JSON
exports.toJSON=function(id_chantier, commande, etat, erreur, login, ordre_execution){
  var jsonString = "{\"id_chantier\":\""+id_chantier+"\",\"commande\":\""+commande+"\",\"etat\":\""+etat+"\",\"erreur\":\""+erreur+"\",\"login\":\""+login+"\",\"ordre_execution\":\""+ordre_execution+"\"}";
  return JSON.parse(jsonString);
}

// Fonction pour extraire la liste des images
exports.toListeImages = function(jsonBesoin){
  var liste_images=[];
  for(var i=0;i<jsonBesoin.liste_images.length;i++){
    liste_images.push(jsonBesoin.liste_images[i].nom);
  }
  return liste_images;
}

// Fonction pour extraire la liste des images
exports.toListeImagesEtalonnage = function(jsonBesoin){
  var liste_images2=[];
  for(var i=0;i<jsonBesoin.etalonnage[0].liste_images.length;i++){
    liste_images2.push(jsonBesoin.etalonnage[0].liste_images[i]);
  }
  return liste_images2;
}

// Verifier si un élément existe dans un tableau
exports.inArray=function(element, array){
  for (var i=0 ; i<array.length; i++){
    if (element == array[i]){
      break;
      return true;
    }
  }
  return false;
}

// Fonction pour enregistrer le job dans la BD et changer le flag du besoin à 1
function setJobDocument(jsonJob){
  var job = new model.jobs(jsonJob);
  job.save(function(err,job){
    if(err) throw err;
    // Trouver et mettre à jour le flag de besoins (besoin prise en compte)
    model.besoins.findOneAndUpdate({id: job.id_chantier},{flag_PrisenCompte: 1},function(err,besoin){
      if(err) throw err;
    });
  });
}
