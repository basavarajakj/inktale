/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * import modules
 */
import Snackbar from './snackbar.js';


const $blogDeleteBtnAll = document.querySelectorAll('[data-blog-delete-btn]');

const handleBlogDelete = async (blogId) => {
  
  const conformDelete = confirm('Are you sure you want to delete blog?');

  if (!conformDelete) return;

  const response = await fetch(`${window.location.origin}/blogs/${blogId}/delete`, {
    method: 'DELETE'
  });
  
  if (response.ok) {
    Snackbar({message: 'Blog has been deleted.'});

    window.location.reload();
  }

  
}

$blogDeleteBtnAll.forEach($deleteBtn => {
  const blogId = $deleteBtn.dataset.blogDeleteBtn;
  $deleteBtn.addEventListener('click', handleBlogDelete.bind(null, blogId));
})