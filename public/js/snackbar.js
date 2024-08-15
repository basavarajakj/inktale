/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

const $snackbarWrapper = document.querySelector('[data-snackbar-wrapper]');
let lastTimeout = null;


const Snackbar = props => {

  // Create snackbar element
  const $snackbar = document.createElement('div');
  $snackbar.classList.add('snackbar');
  props.type && $snackbar.classList.add(props.type);
  $snackbar.innerHTML = `
    <p class="body-medium snackbar-text">
       ${props.message}
    </p>
  `;

  // Clear previous snackbar and append new one
  $snackbarWrapper.innerHTML = '';
  $snackbarWrapper.append($snackbar);

  // Remove snackbar after 10 seconds
  clearTimeout(lastTimeout)
  lastTimeout = setTimeout(() => {
    $snackbarWrapper.removeChild($snackbar)
  }, 10000)
}

export default Snackbar;