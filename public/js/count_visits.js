/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

const countVisit = async () => {
  try{

    const response = await fetch(`${window.location}/visit`, {
      method: 'PUT'
    });

    if (response.ok) {
      visitedBlogs.push(window.location.pathname);
      localStorage.setItem('visitedBlogs', JSON.stringify(visitedBlogs));
    }
    
  } catch(error){

    console.error('Error counting visit: ', error.message);
    throw error;

  }
}

// Get visitedVlog from localStorage
let visitedBlogs = localStorage.getItem('visitedBlogs');

// Initial visitedBlogs if not found
if (!visitedBlogs) localStorage.setItem('visitedBlogs', JSON.stringify([]));

// Parse visited blog from json to array
visitedBlogs = JSON.parse(localStorage.getItem('visitedBlogs'));

// If user visited first time then calls he countVisit function
if (!visitedBlogs.includes(window.localStorage.pathname)) {
  countVisit();
}