/*=============== Contact message  PHP===============*/
const form = document.querySelector('form'),
  statusTxt = form.querySelector('.button-area span');

form.onsubmit = (e) => {
  e.preventDefault();
  statusTxt.style.display = 'block';

  statusTxt.style.color = '#0D6EFD';

  // statusTxt.innerText = 'Sending your message...';
  // form.classList.add('disabled');

  let xhr = new XMLHttpRequest(); //creating new xml object
  xhr.open('POST', 'message.php', true); //sending post request to message.php file
  xhr.onload = () => {
    //once ajax loaded
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = xhr.response; //storing ajax response in a response variable
      //console.log(response);
      if (
        response.indexOf('Merci de remplir tous les champs') != -1 ||
        response.indexOf('merci de renseigner un email valide') != -1 ||
        response.indexOf('Désolé, message non envoyer') != -1
      ) {
        statusTxt.style.color = 'red'; //change the color when we have a error like email not valide
      } else {
        form.reset();
        setTimeout(() => {
          statusTxt.style.display = 'none';
        }, 3000);
      }
      statusTxt.innerText = response;
      // form.classList.remove('disabled');
    }
  };
  let formData = new FormData(form);
  xhr.send(formData);
};
