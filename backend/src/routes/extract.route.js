import express from "express";
import Tesseract from "tesseract.js";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const getFileType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".bmp", ".tiff"].includes(ext)) return "image";
  if (ext === ".pdf") return "pdf";
  return null;
};

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


  


