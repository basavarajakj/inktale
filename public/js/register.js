/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

const $form = document.querySelector('[data-form]');
const $submitBtn = document.querySelector('[data-submit-btn]');

// Handling sign-up form submission
$form.addEventListener('submit', async (event) => {

  // Preventing  default form submission behavior
  event.preventDefault();

  // Disabling submit button to prevent multiple submissions.
  $submitBtn.setAttribute('disabled', '');

  // Creating FormData object to capture form data.
  const formData = new FormData($form);

  // Handling case where password and confirm password fields doesn't match.
  if (formData.get('password') !== formData.get('confirm_password')) {
    console.log(formData.get('password'));
    console.log(formData.get('confirm_password'));
    
    // Enable submit button and show error message
    $submitBtn.removeAttribute('disabled');
    //TODO: Should be a snackbar
    console.error('Please ensure your password and confirm password fields contain same value.');
    return;

  }

  
  // Send account create request to server
  const response = await fetch(`${window.location.origin}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(Object.fromEntries(formData.entries())).toString(),
  });

  // Handle case where response status success
  if (response.ok) {
    // Redirect user to login page
    return window.location = response.url;
  }


});

