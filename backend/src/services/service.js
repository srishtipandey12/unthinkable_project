// import axios from 'axios';
// import fs from 'fs';
// // OpenAI API key should be stored in an environment variable for security
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// // Function to generate a summary using OpenAI
// export const generateSummary = async (text) => {
//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/completions',
//       {
//         model: 'text-davinci-003', // or another model
//         prompt: `Summarize the following text:\n\n${text}`,
//         max_tokens: 200, // Adjust based on summary length requirement
//         temperature: 0.7
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${OPENAI_API_KEY}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     return response.data.choices[0].text.trim();  // Get the summary from OpenAI response
//   } catch (error) {
//     console.error('Error generating summary with OpenAI:', error);
//     throw new Error('Failed to generate summary from OpenAI');
//   }
// };
