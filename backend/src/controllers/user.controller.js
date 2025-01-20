// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { File } from "../models/upload.model.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { extractText } from "../utils/textExtraction.js";
// import { generateSummary } from "../services/openaiService.js"; // Summary generation logic
// import fs from 'fs';

// // Controller for file upload
// const fileUpload = asyncHandler(async (req, res) => {
//   if (!req.file) {
//     throw new ApiError(400, "File is required");
//   }

//   // Step 1: Extract file type from MIME type
//   const mimeType = req.file.mimetype;
//   let fileType = '';

//   if (mimeType.startsWith('application/pdf')) {
//     fileType = 'pdf'; // For PDF files
//   } else if (mimeType.startsWith('image/')) {
//     fileType = 'image'; // For image files
//   } else {
//     throw new ApiError(400, "Unsupported file type. Only PDF and image files are allowed");
//   }

//   // Step 2: Upload the file to Cloudinary
//   const file = await uploadOnCloudinary(req.file.path);
//   if (!file) {
//     throw new ApiError(400, "File upload failed");
//   }

//   // Step 3: Create a new file document in the database
//   const newFile = await File.create({
//     file: file.url,  // URL of the uploaded file (from Cloudinary)
//     fileType: fileType,  // The extracted file type
//     title: req.file.originalname.split('.')[0],  // File name without extension
//     description: '',  // No description provided
//     isProcessed: false,  // Initially not processed
//   });

//   return res.status(201).json(
//     new ApiResponse(200, newFile, "File uploaded successfully")
//   );
// });

// // Controller for file summarization
// const summarizeFile = asyncHandler(async (req, res) => {
//   const { fileId, summaryLength = 'medium' } = req.body;

//   // Step 1: Find the file in the database
//   const file = await File.findById(fileId);
//   if (!file) {
//     throw new ApiError(404, "File not found");
//   }

//   // Step 2: Extract text from the file
//   const mimeType = file.fileType;
//   const fileBuffer = await fs.promises.readFile(file.file);
//   const extractedText = await extractText(mimeType, fileBuffer);

//   // Step 3: Generate a summary
//   const summary = await generateSummary(extractedText, summaryLength);

//   // Step 4: Update file metadata with the summary
//   file.summary = summary;
//   file.isProcessed = true;
//   await file.save();

//   return res.status(200).json(
//     new ApiResponse(200, {
//       url: file.file,
//       title: file.title,
//       summary: summary
//     }, "Summary generated successfully")
//   );
// });

// export { fileUpload, summarizeFile };


import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { File } from '../models/upload.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs';

const fileUpload = asyncHandler(async (req, res) => {
  console.log(req.file)
  if (!req.file) {
    throw new ApiError(400, 'File is required');
  }

  // Step 1: Extract file type from MIME type
  const mimeType = req.file.mimetype;
  let fileType = '';
 
  if (mimeType.startsWith('application/pdf')) {
    fileType = 'pdf';
  } else if (mimeType.startsWith('image/')) {
    fileType = 'image';
  } else {
    throw new ApiError(400, 'Unsupported file type. Only PDF and image files are allowed');
  }

  // Step 2: Upload the file to Cloudinary
  // Assume your upload logic (not shown) for Cloudinary here
  // const file = await uploadOnCloudinary(req.file.path); // Implement this
  // if (!file) {
  //   throw new ApiError(400, 'File upload failed');
  // }

  // Step 3: Create a new file document in the database
  const newFile = await File.create({
    file: req.file.path,  // URL of the uploaded file (from Cloudinary)
    fileType: fileType,  // The extracted file type
    title: req.file.originalname.split('.')[0],  // File name without extension
    description: '',  // No description provided
    isProcessed: false,  // Initially not processed
  });
  
  await newFile.save();
  
  return res.status(201).json(new ApiResponse(200, newFile, 'File uploaded successfully'));
});


const getFile = asyncHandler(async (req, res) => {
  const { _id } = req.query; // Use query parameters for GET requests

  if (!_id) {
    throw new ApiError(400, "File ID is required");
  }

  const newFile = await File.findOne({ _id }); // Query database
  if (!newFile) {
    throw new ApiError(404, "File not found");
  }

  return res.status(200).json(new ApiResponse(200, newFile, "File retrieved successfully"));
});


// // Controller for PDF summarization

// import { extractTextFromPDF } from "../utils/textExtraction.js"; // Utility function to extract text from PDF
// import { extractTextFromImage } from "../utils/image.js"; // Utility function to extract text from image
// import { generateSummary } from "../services/service.js"; // OpenAI summary service
// import axios from 'axios';

// // Controller for file summarization using URL parameters (params)
// const summarizeFile = asyncHandler(async (req, res) => {
//   const { fileId } = req.params; // Get fileId from URL params

//   // Step 1: Find the file in the database by fileId
//   const file = await File.findById(fileId);
//   if (!file) {
//     throw new ApiError(404, 'File not found');
//   }

//   // Step 2: Retrieve the file URL (path) from the database
//   const filePath = file.file; // Cloudinary URL or the file path from the database

//   if (!filePath) {
//     throw new ApiError(400, 'No file path found in the database');
//   }

//   // Step 3: Determine file type (PDF or image)
//   const mimeType = file.fileType;  // fileType stored in the database (pdf or image)
//   let extractedText = '';

//   if (mimeType === 'pdf') {
//     // For PDFs, we fetch the file from Cloudinary and extract text
//     const fileBuffer = await fetchFileFromCloudinary(filePath);  // Fetch file from Cloudinary
//     extractedText = await extractTextFromPDF(fileBuffer);  // Extract text from PDF
//   } else if (mimeType === 'image') {
//     // For images, we use OCR to extract text
//     extractedText = await extractTextFromImage(filePath);  // Extract text from image
//   }

//   if (!extractedText) {
//     throw new ApiError(400, 'Failed to extract text from the file');
//   }

//   // Step 4: Generate a summary using OpenAI API
//   const summary = await generateSummary(extractedText);

//   // Step 5: Update the file metadata with the summary
//   file.summary = summary;
//   file.isProcessed = true;
//   await file.save();

//   // Step 6: Return the file data along with the summary
//   return res.status(200).json(
//     new ApiResponse(200, {
//       fileUrl: file.file,
//       title: file.title,
//       summary: summary
//     }, 'Summary generated successfully')
//   );
// });

// Function to fetch file content from Cloudinary (or any other remote URL)
// const fetchFileFromCloudinary = async (url) => {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     return response.data; // Return file content as buffer
//   } catch (error) {
//     throw new ApiError(500, 'Failed to fetch file from Cloudinary');
//   }
// };

// export { summarizeFile };

export {getFile};


export { fileUpload};
