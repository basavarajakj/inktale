/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * import modules
 */
import imagePreview from './utils/image_preview.js';
import Snackbar from '../js/snackbar.js';
import config from '../js/config.js';
import imageDataURL from './utils/imageAsDataUrl.js';


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
 */
const clearImagePreview = function () {
  $imagePreview.classList.remove('show');
  $imagePreview.innerHTML = '';
};

$imagePreviewClear.addEventListener('click', clearImagePreview);

/**
 *  Handle blog publish 
 */ 
const $form = document.querySelector('[data-form]');
const $publishButton = document.querySelector('[data-publish-btn]');

const handlePublishBlog = async function (event) {

  // Preventing default form submission behavior
  event.preventDefault();

  // Disabling publish button to prevent multiple submissions
  $publishButton.setAttribute('disabled', '');

  // Creating FormData object to capture for data
  const formData = new FormData($form);
  
  if (!formData.get('banner').size) {
    // Enable publish button and show error message
    $publishButton.removeAttribute('disabled', '');
    Snackbar({ type: 'error', message: 'You didn\'t select any image for blog banner. '} );

    return;
  }

  // Handle case where selected image size larger than 5MB.
  if (formData.get('banner').size > config.blogBanner.maxByteSize) {
    // Enable publish button and show error message
    $publishButton.removeAttribute('disabled', '');
    Snackbar({ type: 'error', message: 'Image size should be less than 5MB'} );
    return;
  }

  // Overwrite banner value (which is type 'File') to base64
  formData.set('banner', await imageDataURL(formData.get('banner')));

  // Create request body from formData
  const body = Object.fromEntries(formData.entries())

  // Sending from body
  const response = await fetch(`${window.location.origin}/createblog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });


}

$form.addEventListener('submit', handlePublishBlog);
