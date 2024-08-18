/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

/**
 * node modules
 */
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');

const markdown = new MarkdownIt({

  //convert '\n' in paragraphs int <br>
  breaks: true,

  // Auto convert URL-link text to link (e.g. google.com)
  linkify: true,

  highlight: (str, lang) => {

    if(!lang && !hljs.getLanguage(lang)) return '';

    try {
      return hljs.highlight(str, {
        language: lang,
        ignoreIllegals: true
      }).values
    } catch (error) {

      console.error('Error highlighting language: ', error.message);
      throw error;
    }
  }
});


module.exports = markdown;