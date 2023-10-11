import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message');

const localStorageKey = 'feedback-form-state';

function updateLocalStorage() {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function populateFormFromLocalStorage() {
  const savedData = localStorage.getItem(localStorageKey);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  } else {
    emailInput.value = '';
    messageTextarea.value = '';
  }
}

const throttledUpdateLocalStorage = throttle(updateLocalStorage, 500);

form.addEventListener('input', () => {
  throttledUpdateLocalStorage();
});
populateFormFromLocalStorage();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.removeItem(localStorageKey);

  console.log('Дані форми:', formData);

  emailInput.value = '';
  messageTextarea.value = '';
});
