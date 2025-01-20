// import Tesseract from 'tesseract.js';  // OCR library for image text extraction
// import fs from 'fs';

// // Function to extract text from an image using Tesseract.js OCR
// export const extractTextFromImage = async (imagePath) => {
//   return new Promise((resolve, reject) => {
//     Tesseract.recognize(
//       imagePath, // Image path (could be a URL or local path)
//       'eng', // Language (English)
//       {
//         logger: (m) => console.log(m), // Optional: logs OCR progress
//       }
//     ).then(({ data: { text } }) => {
//       resolve(text); // Return the extracted text from the image
//     }).catch((error) => {
//       console.error('Error extracting text from image:', error);
//       reject('Failed to extract text from image');
//     });
//   });
// };
