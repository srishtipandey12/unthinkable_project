// import axios from 'axios';
// import { ApiError } from '../utils/ApiError.js';  // Import ApiError class  // Correct path if ApiError is in src/utils/
// // Assuming you have this utility
// import { asyncHandler } from '../utils/asyncHandler.js'; 

// import { OpenAI } from 'langchain';
// import { PromptTemplate } from 'langchain';
// import { LLMChain } from 'langchain';

//   // Make sure your API key is correct
  

//   import { ChatOpenAI } from "@langchain/openai";
//   import { ChatPromptTemplate } from "@langchain/core/prompts";
//   import { StringOutputParser } from "@langchain/core/output_parsers";
  
//   const prompt = ChatPromptTemplate.fromMessages([
//     ["human", "Tell me a short joke about {topic}"],
//   ]);
//   const model = new ChatOpenAI({});
//   const outputParser = new StringOutputParser();
  
//   const chain = prompt.pipe(model).pipe(outputParser);
  
//   const response = await chain.invoke({
//     topic: "ice cream",
//   });
//   console.log(response);
//   /**
//   Why did the ice cream go to the gym?
//   Because it wanted to get a little "cone"ditioning!
//    */


//   // Import your custom error handler

// // Handler for summarizing text
//  const summarizeTextHandler = asyncHandler(async (req, res) => {
//   const { text } = req.body;  // Expecting the text to be passed in the request body

//   // If no text is provided, throw an error
//   if (!text) {
//     return new ApiError(400, 'Text is required for summarization.');
//   }

//   try {
//     // Attempt to summarize the provided text
//     const summary = await summarizeText(text);

//     // If the summary is successfully generated, send it back in the response
//     return res.status(200).json({
//       status: 'success',
//       message: 'Text summarized successfully',
//       data: { summary },
//     });
//   } catch (error) {
//     console.error('Error summarizing text:', error);
//     // Pass the error to the next middleware for error handling
//     return new ApiError(500, 'Failed to summarize the text.');
//   }
//  });

// export {summarizeTextHandler};