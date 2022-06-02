/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header');
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
  modalBtns = document.querySelectorAll('.services__button'),
  modalClose = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
  modalViews[modalClick].classList.add('active-modal');
};
modalBtns.forEach((mb, i) => {
  mb.addEventListener('click', () => {
    modal(i);
  });
});
modalClose.forEach((mc) => {
  mc.addEventListener('click', () => {
    modalViews.forEach((mv) => {
      mv.classList.remove('active-modal');
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
  selectors: {
    target: '.work__card',
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const linkWork = document.querySelectorAll('.work__item');

function activeWork() {
  linkWork.forEach((l) => l.classList.remove('active-work'));
  this.classList.add('active-work');
}
linkWork.forEach((l) => l.addEventListener('click', activeWork));

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.add('active-link');
    } else {
      document
        .querySelector('.nav__menu a[href*=' + sectionId + ']')
        .classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'bx-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? 'dark' : 'light';
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'bx bx-sun' : 'bx bx-moon';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    lightTheme
  );
  themeButton.classList[selectedIcon === 'bx bx-sun' ? 'add' : 'remove'](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the light/ icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  //reset:true,
});

sr.reveal('.home__data');
sr.reveal('.home__handle', { delay: 700 });
sr.reveal('.home__social,.home__scroll', { delay: 900, origin: 'bottom' });

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
