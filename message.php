<?php

//get all form values
  $nom = htmlspecialchars($_POST['nom']);
  $email = htmlspecialchars($_POST['email']);
  $projet = htmlspecialchars($_POST['projet']);
 
  if(!empty($email) && !empty($projet)){
    if(filter_var($email, FILTER_VALIDATE_EMAIL)){
      $receiver = "kaltoum.adnane@gmail.com"; 
      $subject = "From: $nom <$email>";
      $body = "nom: $nom\nEmail: $email\n\nProjet:\n$projet\n\nRegards,\n$nom";
      $sender = "From: $email";
      if(mail($receiver, $subject, $body, $sender)){
         echo "Votre projet est bien envoyer";
      }else{
         echo "Désolé, message non envoyer";
      }
    }
    else{
      echo" merci de renseigner un email valide ";
    }
  }else{
    echo"Merci de remplir tous les champs";
  }
  
?>