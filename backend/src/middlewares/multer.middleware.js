import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the temp directory exists
const tempDir = path.resolve("./public/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Multer configuration for storing uploaded files in the local temp directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving to:", tempDir);
    cb(null, tempDir); // Set the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Preserve the original file name
  }
});

// Multer instance for file uploads
export const upload = multer({ storage ,});
