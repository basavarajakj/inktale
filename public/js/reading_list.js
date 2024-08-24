/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


// Select the reading list button element add reading list number
const $readingListBtn = document.querySelector('[data-reading-list-btn]');
const $readingListNumber = document.querySelector('[data-reading-list-number]');

/**
 * Adds a reading list to the current blog
 * This function sends PUT request to the reading list endpoints to add a reaction
 * If the response is successful (status code 200), it activates the reading list button
 * and increase the reading list count displayed on the page.
 * If the status is 401 (Unauthorized), it prompts the user to log in
 * 
 * @function addReadingList
 * @throws {Error} - If there is an error during the process, it will logged
 */

const addToReadingList =  async () => {
  try {
    
    // send a PUT action to reading list endpoint
    const response = await fetch(`${window.location}/readingList`, {
      method: 'PUT'
    });

    // Handle case where response is successful
    if (response.ok) {
      // Active reaction button and increase the reaction number
      $readingListBtn.classList.add('active');
      $readingListNumber.textContent = Number($readingListNumber.textContent) + 1; 
    }

    // Handle case where response 401 (Unauthorized) 
    if (response.status === 401) {
      //TODO: show dialog for login
      console.log('Need to login');
    }

  } catch (error) {
    
    // Log the error
    console.log("Error in adding to reading list: ", error.message);
    throw error;

  }
}


const removeFromReadingList = async () => {
  try {

    // Send a DELETE request to the reactions endpoint
    const response = await fetch(`${window.location}/readingList`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Inactive reading list button and decrease the reaction number
      $readingListBtn.classList.remove('active');
      $readingListNumber.textContent = Number($readingListNumber.textContent) - 1; 
    }
    
  } catch (error) {
    

    // Log error
    console.error('Error removing reading list: ', error.message);
    throw error;

  }
}

$readingListBtn.addEventListener('click', async function ()  {
  $readingListBtn.setAttribute('disabled', '');

  if (!$readingListBtn.classList.contains('active')) {
    await addToReadingList();
  }else {
    await removeFromReadingList();
  }

  $readingListBtn.removeAttribute('disabled', '');
})