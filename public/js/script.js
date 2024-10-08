/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


const $topAppBar = document.querySelector('[data-top-app-bar]');
let lastScrollPos = 0;

/**
 * Attaches event listener  to the window scroll event, toggling classes to app bar based on scroll position.
 */
window.addEventListener('scroll', (event) => {
  
  // Toggling the 'active' class on the $topAppBar element based on whether the vertical scroll position greater than 50pixels.
  $topAppBar.classList[window.scrollY > 50 ? 'add' : 'remove']('active');

  //Toggling the 'hide' class based on whether the current scroll position is greater than the last scroll position and scroll position is greater than 50 pixels.
  $topAppBar.classList[window.scrollY > lastScrollPos && window.scrollY > 50 ? 'add': 'remove']('hide');

  // Updating the last recorded scroll position.
  lastScrollPos = window.scrollY;


});


/**
 * Toggle menu
 */
const $menuWrappers = document.querySelectorAll('[data-menu-wrapper]');

$menuWrappers?.forEach(function ($menuWrapper) {
  const $menuToggler = $menuWrapper.querySelector('[data-menu-toggler');
  const $menu = $menuWrapper.querySelector('[data-menu]');

  $menuToggler.addEventListener('click', (event) => {
    $menu.classList.toggle('active');
    event.stopPropagation();
  });

  document.addEventListener('click', (event) => {
    if(!$menuWrapper.contains(event.target)) {
      $menu.classList.remove('active');
    }
  });
});


/**
 * Backward btn functionality in blog create page
 */
const $backBtn = document.querySelector('[data-back-btn]');

const handleBackward = function () {
  window.history.back();
};

$backBtn?.addEventListener('click', handleBackward);


/**
 * Auto height textarea in blog create form
 */

const $autHeightTextarea = document.querySelector('[data-textarea-auto-height]');

const textareaAutoHeight = function ()  {
  this.style.height = this.scrollHeight + 'px';
  this.style.maxheight = this.scrollHeight + 'px';
};

$autHeightTextarea?.addEventListener('input', textareaAutoHeight);

// Set initial textarea height
$autHeightTextarea && textareaAutoHeight.call($autHeightTextarea);
