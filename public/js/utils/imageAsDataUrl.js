/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


const imageDataURL = (imageBlob) => {
  const fileReader = new FileReader();

  fileReader.readAsDataURL(imageBlob);

  return new Promise((resolve, reject) => {   
    
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result);
    });

    fileReader.addEventListener('error', () => {
      reject(fileReader.error);
    })
  });
}

export default imageDataURL;