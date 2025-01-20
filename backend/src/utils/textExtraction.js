// import pdfParse from 'pdf-parse';
// import Tesseract from 'tesseract.js';
// // Function to extract text from PDF
// export const extractTextFromPDF = async (buffer) => {
//   try {
//     const data = await pdfParse(buffer);
//     return data.text; // Return the extracted text
//   } catch (error) {
//     throw new Error('Failed to extract text from PDF');
//   }
// };
// //  imagePath = './backend/public/temp';

// // Function to extract text from image using OCR (Tesseract.js)
// export const extractTextFromImage = async (imagePath) => {
//   return new Promise((resolve, reject) => {
//     Tesseract.recognize(
//       imagePath,
//       'eng', // language for OCR
//       {
//         logger: (m) => console.log(m), // Log progress
//       }
//     ).then(({ data: { text } }) => {
//       resolve(text); // Return the OCR extracted text
//     }).catch((error) => {
//       reject('Failed to extract text from image');
//     });
//   });
// };
