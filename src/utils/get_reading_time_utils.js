/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';

const AVG_READ_WPM = 200;
const getReadingTime = (text) => Math.ceil(text.split('').length / AVG_READ_WPM);

module.exports = getReadingTime;