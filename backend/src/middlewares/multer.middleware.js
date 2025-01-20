import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.resolve("./public/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving to:", tempDir);
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

export const upload = multer({ storage ,});
