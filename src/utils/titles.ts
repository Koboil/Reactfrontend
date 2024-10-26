const messages = {
   // WORKS
   updated:
      '{count} {count,  plural, one{ fichier a été mise à jour.} other{ fichiers ont été mises à jour.}}',
   created:
      '{count} {count,  plural, one{ fichier a été téléchargé avec succès.} other{fichiers ont été téléchargés avec succès.}}',
   error: "Téléchargement {count,  plural, one{ d'un fichier échoué.} other{ de {count} fichiers échoués.}}",
   deleteElement: 'Êtes-vous sûr de vouloir supprimer {object} ? {otherMessage}',
   unassignEmployee: "Êtes-vous sûr de vouloir enlever {assign} à l'employé ?",
   fieldRestricted: 'Ce champ confidentiel a été masqué',
};
const titles = {
   messages,
};

export default titles;
