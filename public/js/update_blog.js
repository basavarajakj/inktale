/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * import modules
 */
import Snackbar  from './snackbar.js';
import imagePreview from './utils/image_preview.js';
import imageAsDataURL from './utils/imageAsDataUrl.js';
import config from './config.js'


// Selectors for image field, image-preview and clear preview button
const $imageField = document.querySelector('[data-image-field]');
const $imagePreview = document.querySelector('[data-image-preview]');
const $imagePreviewClear = document.querySelector('[data-image-preview-clear]');


// Event listener for image filed change to trigger image preview
$imageField.addEventListener('change', () => {
  
  imagePreview($imageField, $imagePreview);
});


/**
 * Clears the image preview by removing the 'show' class form the preview container
 * @function clearImagePreview
 */
const clearImagePreview = function () {
  $imagePreview.classList.remove('show');
  $imagePreview.innerHTML = '';
};

$imagePreviewClear.addEventListener('click', clearImagePreview);

/**
 *  Handle blog update 
 */ 
const $form = document.querySelector('[data-form]');
const $submitButton = document.querySelector('[data-submit-btn]');
const $progressBar = document.querySelector('[data-progress-bar]');

const handleBlogUpdate = async (event) => {
  event.preventDefault();

  // Disable submit button to prevent multiple submission
  $submitButton.setAttribute('disabled', '');

  // Crate Form data object to capture form data
  const formData = new FormData($form);

  // handle case where user not selected any image for banner when creating blog. 
  if (!formData.get('banner').size && !$imagePreview.hasChildNodes()) {
    // Enable publish button and show error message
    $submitButton.removeAttribute('disabled', '');
    Snackbar({ type: 'error', message: 'You didn\'t select any image for blog banner. '} );

    return;
  }

  // Handle case where selected image size larger than 5MB.
  if (formData.get('banner').size > config.blogBanner.maxByteSize) {
    // Enable publish button and show error message
    $submitButton.removeAttribute('disabled', '');
    Snackbar({ type: 'error', message: 'Image size should be less than 5MB'} );
    return;
  }

  // Handle case when user didn't update the blog banner. 
  if (!formData.get('banner').size && $imagePreview.hasChildNodes()) {
    formData.delete('banner');
  } 

   // Handle case when user update the blog banner. 
  if (formData.get('banner')) {
    formData.set('banner', await imageAsDataURL(formData.get('banner')));
  }

  // Create request body from formData
  const body = Object.fromEntries(formData.entries());
  

  // Show progress bar
  $progressBar.classList.add('loading');  

  // Send form data to the server for update blog
  const response = await fetch(window.location.href, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(body)
  });

  // Handle case where response is success
  if (response.ok) {
    $submitButton.removeAttribute('disabled');
    Snackbar({ message: 'Your blog has been updated.'});
    $progressBar.classList.add('loading-end');
    window.location = window.location.href.replace('/edit', '');
    return;
  }

    // Handle case where response is 400 (Bad request)
    if (response.status === 400) {
      $progressBar.classList.add('loading-end');
      $submitButton.removeAttribute('disabled');
      const { message } = await response.json();
      Snackbar({
        type: 'error',
        message
      });
    }

}

$form.addEventListener("submit", handleBlogUpdate);
