const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');

const validateInput = ({ target }) => {

  if (target.value.length < 5) {

    button.setAttribute('disabled', '');
    
  } else

  button.removeAttribute('disabled');
  return;
}

const handleSubmit = (event) => {

  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = '/pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);