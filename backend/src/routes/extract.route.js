import express from "express";
import Tesseract from "tesseract.js";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Utility to check file type
const getFileType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".bmp", ".tiff"].includes(ext)) return "image";
  if (ext === ".pdf") return "pdf";
  return null;
};

// Function to extract text from an image
const extractTextFromImage = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(imagePath, "eng", {
      logger: (info) => console.log(info),
    });
    return result.data.text;
  } catch (error) {
    throw new Error(`Error extracting text from image: ${error.message}`);
  }
};

// Function to extract text from a PDF
const extractTextFromPDF = async (filePath) => {
  try {
    const resolvedPath = path.resolve(filePath);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`File not found at: ${resolvedPath}`);
    }
    const dataBuffer = fs.readFileSync(resolvedPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error(`Error extracting text from PDF: ${error.message}`);
  }
};

// Unified handler for text extraction
const extractTextHandler = asyncHandler(async (req, res) => {
  const { filePath } = req.body;

  if (!filePath) {
    throw new ApiError(400, "File path is required");
  }

  try {
    const fileType = getFileType(filePath);

    if (!fileType) {
      throw new ApiError(400, "Unsupported file type. Supported types are images and PDFs.");
    }

    let extractedText;
    if (fileType === "image") {
      extractedText = await extractTextFromImage(filePath);
    } else if (fileType === "pdf") {
      extractedText = await extractTextFromPDF(filePath);
    }

    res.status(200).json({
      status: "success",
      message: "Text extracted successfully",
      data: { text: extractedText },
    });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, error.message);
  }
});


export { extractTextHandler };

// import fs from 'fs';
// import path from 'path';

// import { ApiError } from '../utils/ApiError.js';  // Import ApiError class  // Correct path if ApiError is in src/utils/
// // Assuming you have this utility
// import { asyncHandler } from '../utils/asyncHandler.js';  // Assuming asyncHandler is implemented
// import pdfParse from 'pdf-parse';

// const extractTextFromPDF = async (filePath) => {
//     try {
//       // Resolve the file path
//       const resolvedPath = path.resolve(filePath);
  
//       // Check if the file exists
//       if (!fs.existsSync(resolvedPath)) {
//         throw new Error(`File not found at: ${resolvedPath}`);
//       }
//       // Read the PDF file as a buffer
//       const dataBuffer = fs.readFileSync(resolvedPath);
  
//       // Parse the PDF
//       const data = await pdfParse(dataBuffer);
  
//       // Return the extracted text
//       return data.text;
//     } catch (error) {
//       console.error('Failed to extract text from the PDF:', error.message);
//       throw new Error('Failed to extract text from the PDF');
//     }
//   };// Async handler to extract text from a PDF
//   const extractTextHandler = asyncHandler(async (req, res) => {
//     const { filePath } = req.body;  // Assuming you send filePath in the request body
  
//     if (!filePath) {
//       throw new ApiError(400, 'File path is required');
//     }
  
//     try {
//       const text = await extractTextFromPDF(filePath);  // Extract text from the PDF
//        // Get the summary of the text
  
//       // Log summary for debugging

  
//       // Return the extracted text and its summary in the response
//       return res.status(200).json({
//         status: 'success',
//         message: 'Text extracted successfully',
//         data: { text }  // Include both text and summary
//       });
//     } catch (error) {
//       // Handle errors appropriately
//       console.error(error);
//       throw new ApiError(500, 'Failed to extract text from the PDF');
//     }
//   });
  


