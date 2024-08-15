/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * Creates a username based on the provided name.
 * @param {string} name - The name to generate the username from .
 * @return {string} A unique username composed of the lowercase name withour spaces followed by a timestamp
 */
module.exports = (name) => {
  const username = name.toLowerCase().replace(' ', '');
  return `${username}-${Date.now()}`;
} 