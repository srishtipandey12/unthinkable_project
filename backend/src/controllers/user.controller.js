
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

  const mimeType = req.file.mimetype;
  let fileType = '';
 
  if (mimeType.startsWith('application/pdf')) {
    fileType = 'pdf';
  } else if (mimeType.startsWith('image/')) {
    fileType = 'image';
  } else {
    throw new ApiError(400, 'Unsupported file type. Only PDF and image files are allowed');
  }

  
  const newFile = await File.create({
    file: req.file.path, 
    fileType: fileType, 
    title: req.file.originalname.split('.')[0],  
    description: '',  
    isProcessed: false, 
  });
  
  await newFile.save();
  
  return res.status(201).json(new ApiResponse(200, newFile, 'File uploaded successfully'));
});


const getFile = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  if (!_id) {
    throw new ApiError(400, "File ID is required");
  }

  const newFile = await File.findOne({ _id });
  if (!newFile) {
    throw new ApiError(404, "File not found");
  }

  return res.status(200).json(new ApiResponse(200, newFile, "File retrieved successfully"));
});


export {getFile};


export { fileUpload};
