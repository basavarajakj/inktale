/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


// select the reaction button element and reaction number
const $reactionBtn = document.querySelector('[data-reaction-btn]');
const $reactionNumber = document.querySelector('[data-reaction-number]');

/**
 * Adds a reaction to the current blog
 * This function sends PUT request to the reactions endpoints to add a reaction
 * If the response is successful (status code 200), it activates the reaction button
 * and increase the reaction count displayed on the page.
 * If the status is 401 (Unauthorized), it prompts the user to log in
 * 
 * @function addReaction
 * @throws {Error} - If there is an error during the process, it will logged
 */

const addReaction = async () => {
  try {
    
    // Send a put request to the reaction endpoint
    const response = await fetch(`${window.location}/reactions`, {
      method: 'PUT',
    });

    // Handle case where response is successful
    if (response.ok) {
      // Active reaction button and increase the reaction number
      $reactionBtn.classList.add('active', 'reaction-anim-add');
      $reactionBtn.classList.remove('reaction-anim-remove');
      $reactionNumber.textContent = Number($reactionNumber.textContent) + 1; 
    }

    // Handle case where response 401 (Unauthorized) 
    if (response.status === 401) {
      //TODO: show dialog for login
      console.log('Need to login');
    }

  } catch (error) {
    

    // Log any errors
    console.error('Error adding reaction: ', error.message);
    throw error;

  }
}


const removeReaction = async () => {
  try {

    // Send a DELETE request to the reactions endpoint
    const response = await fetch(`${window.location}/reactions`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Inactive reaction button and decrease the reaction number
      $reactionBtn.classList.add('reaction-anim-remove');
      $reactionBtn.classList.remove('active', 'reaction-anim-add');
      $reactionNumber.textContent = Number($reactionNumber.textContent) - 1; 
    }
    
  } catch (error) {
    

    // Log error
    console.error('Error removing reactions: ', error.message);
    throw error;

  }
}

// Add event listener for click event
$reactionBtn.addEventListener('click', async function () {
  $reactionBtn.setAttribute('disabled', '');

  if (!$reactionBtn.classList.contains('active')) {
    await addReaction();
  }else {
    await removeReaction();
  }

  $reactionBtn.removeAttribute('disabled', '')
});